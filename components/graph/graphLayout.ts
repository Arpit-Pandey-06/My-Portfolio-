// Pure layout math. No React, no state.
//
// The approach: every layout function below computes RAW node/edge
// positions relative to an arbitrary origin (the core sits at 0,0) —
// radii and angles are derived purely from category/tech counts, never
// hardcoded. Nothing here decides canvas size.
//
// finalizeLayout() then measures the actual bounding box of that content
// (including label space) and sizes the canvas to exactly fit it plus
// GRAPH_CONFIG.safePadding on every side, translating all positions to
// match. That's what makes "no clipping, consistent padding" a guarantee
// for any number of categories or technologies, rather than a hope tied
// to a fixed canvas size.

import type { TechCategory } from "@/lib/data";
import type { GraphLayout, PositionedEdge, PositionedNode } from "./graphTypes";
import { GRAPH_CONFIG as C } from "./graphConfig";

const NODE_SIZE = {
  core: C.core.size,
  category: C.category.size,
  tech: C.tech.size,
} as const;

export function nodeSize(kind: keyof typeof NODE_SIZE): number {
  return NODE_SIZE[kind];
}

// Solves for the minimum ring radius such that evenly-spaced items at
// `angleStepDeg` apart clear `requiredGap` px from each other — derived
// from the chord length formula, not a hand-tuned guess. Shared by both
// the category ring and each category's tech ring.
function minRadiusForSpacing(
  angleStepDeg: number,
  requiredGap: number,
): number {
  if (angleStepDeg <= 0) return 0;
  const angleStepRad = (angleStepDeg * Math.PI) / 180;
  return requiredGap / (2 * Math.sin(angleStepRad / 2));
}

function finalizeLayout(
  rawNodes: PositionedNode[],
  rawEdges: PositionedEdge[],
): GraphLayout {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  rawNodes.forEach((n) => {
    const half = nodeSize(n.kind) / 2;
    const labelH = n.kind === "core" ? 0 : C.labelHeightAllowance;
    minX = Math.min(minX, n.x - half);
    maxX = Math.max(maxX, n.x + half);
    minY = Math.min(minY, n.y - half);
    maxY = Math.max(maxY, n.y + half + labelH);
  });

  const pad = C.safePadding;
  const width = maxX - minX + pad * 2;
  const height = maxY - minY + pad * 2;
  const dx = pad - minX;
  const dy = pad - minY;

  const nodes = rawNodes.map((n) => ({ ...n, x: n.x + dx, y: n.y + dy }));
  const edges = rawEdges.map((e) => ({
    ...e,
    x1: e.x1 + dx,
    y1: e.y1 + dy,
    x2: e.x2 + dx,
    y2: e.y2 + dy,
  }));

  return {
    width,
    height,
    nodes,
    edges,
    nodesById: new Map(nodes.map((n) => [n.id, n])),
    edgesById: new Map(edges.map((e) => [e.id, e])),
  };
}

// --- Desktop / tablet: radial burst ------------------------------------

export function computeLayout(categories: TechCategory[]): GraphLayout {
  const rawNodes: PositionedNode[] = [
    {
      id: "core",
      kind: "core",
      label: "Tech",
      parentId: null,
      categoryId: null,
      x: 0,
      y: 0,
    },
  ];
  const rawEdges: PositionedEdge[] = [];

  const angleStep = 360 / categories.length;

  // Category ring radius: solved, not guessed. Grows automatically as
  // more categories are added and the angle between them shrinks — this
  // is the fix for the bug where category nodes could overlap once
  // enough categories existed, since the old radius was a fixed constant.
  const categoryRadius = Math.max(
    C.category.baseRadius,
    minRadiusForSpacing(
      angleStep,
      C.category.size + C.category.minGap + C.category.labelWidthAllowance,
    ),
  );

  categories.forEach((category, categoryIndex) => {
    const angleDeg = C.startAngleDeg + categoryIndex * angleStep;
    const rad = (angleDeg * Math.PI) / 180;
    const catX = categoryRadius * Math.cos(rad);
    const catY = categoryRadius * Math.sin(rad) * C.verticalSquash;
    const catId = `cat-${category.id}`;

    rawNodes.push({
      id: catId,
      kind: "category",
      label: category.name,
      parentId: "core",
      categoryId: category.id,
      x: catX,
      y: catY,
    });
    rawEdges.push({
      id: `edge-core-${catId}`,
      kind: "core-category",
      source: "core",
      target: catId,
      x1: 0,
      y1: 0,
      x2: catX,
      y2: catY,
    });

    // This category's tech ring radius grows with item count past the
    // threshold, then the spread angle (bounded by maxSpreadDeg) is
    // solved the same way as the category ring above.
    const techRingRadius =
      C.tech.baseRadius +
      Math.max(0, category.items.length - C.tech.radiusGrowthThreshold) *
        C.tech.radiusGrowthPerItem;
    const requiredTechGap =
      C.tech.size + C.tech.minGap + C.tech.labelWidthAllowance;
    const idealStepRad =
      category.items.length > 1
        ? 2 * Math.asin(Math.min(1, requiredTechGap / (2 * techRingRadius)))
        : 0;
    const idealSpreadDeg =
      (idealStepRad * (category.items.length - 1) * 180) / Math.PI;
    const spreadDeg = Math.min(idealSpreadDeg, C.tech.maxSpreadDeg);
    const stepDeg =
      category.items.length > 1 ? spreadDeg / (category.items.length - 1) : 0;

    category.items.forEach((item, i) => {
      const offsetDeg = (i - (category.items.length - 1) / 2) * stepDeg;
      const itemAngle = rad + (offsetDeg * Math.PI) / 180;
      const itemX = catX + techRingRadius * Math.cos(itemAngle);
      const itemY =
        catY + techRingRadius * Math.sin(itemAngle) * C.verticalSquash;
      const itemId = `${catId}-${i}`;

      rawNodes.push({
        id: itemId,
        kind: "tech",
        label: item.n,
        icon: item.icon,
        parentId: catId,
        categoryId: category.id,
        x: itemX,
        y: itemY,
      });
      rawEdges.push({
        id: `edge-${catId}-${itemId}`,
        kind: "category-tech",
        source: catId,
        target: itemId,
        x1: catX,
        y1: catY,
        x2: itemX,
        y2: itemY,
      });
    });
  });

  return finalizeLayout(rawNodes, rawEdges);
}

// --- Mobile: vertical stack ----------------------------------------------
// A genuinely different shape, not the radial burst scaled down — that
// reads as unreadable on a narrow, short strip. Core at top, each
// category as its own row, that category's tech items in a small
// centered grid beneath it. Also routed through finalizeLayout, so it
// gets the exact same padding guarantee as the desktop layout.

export function computeStackedLayout(categories: TechCategory[]): GraphLayout {
  const rawNodes: PositionedNode[] = [
    {
      id: "core",
      kind: "core",
      label: "Tech",
      parentId: null,
      categoryId: null,
      x: 0,
      y: 0,
    },
  ];
  const rawEdges: PositionedEdge[] = [];

  let categoryY = C.mobile.coreToFirstCategoryGap;

  categories.forEach((category) => {
    const catId = `cat-${category.id}`;
    const catX = 0;

    rawNodes.push({
      id: catId,
      kind: "category",
      label: category.name,
      parentId: "core",
      categoryId: category.id,
      x: catX,
      y: categoryY,
    });
    rawEdges.push({
      id: `edge-core-${catId}`,
      kind: "core-category",
      source: "core",
      target: catId,
      x1: 0,
      y1: 0,
      x2: catX,
      y2: categoryY,
    });

    const itemsFirstRowY = categoryY + 58;
    const rowCount = Math.ceil(category.items.length / C.mobile.itemsPerRow);

    category.items.forEach((item, i) => {
      const row = Math.floor(i / C.mobile.itemsPerRow);
      const rowStart = row * C.mobile.itemsPerRow;
      const rowLength = Math.min(
        C.mobile.itemsPerRow,
        category.items.length - rowStart,
      );
      const colInRow = i - rowStart;
      const rowStartX = catX - ((rowLength - 1) * C.mobile.itemSpacingX) / 2;

      const itemX = rowStartX + colInRow * C.mobile.itemSpacingX;
      const itemY = itemsFirstRowY + row * C.mobile.itemRowHeight;
      const itemId = `${catId}-${i}`;

      rawNodes.push({
        id: itemId,
        kind: "tech",
        label: item.n,
        icon: item.icon,
        parentId: catId,
        categoryId: category.id,
        x: itemX,
        y: itemY,
      });
      rawEdges.push({
        id: `edge-${catId}-${itemId}`,
        kind: "category-tech",
        source: catId,
        target: itemId,
        x1: catX,
        y1: categoryY,
        x2: itemX,
        y2: itemY,
      });
    });

    categoryY =
      itemsFirstRowY + rowCount * C.mobile.itemRowHeight + C.mobile.categoryGap;
  });

  return finalizeLayout(rawNodes, rawEdges);
}
