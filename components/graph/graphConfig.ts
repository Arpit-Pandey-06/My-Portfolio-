// Single source of truth for every layout constant. Nothing in
// graphLayout.ts should ever contain a bare number — if it needs tuning,
// it belongs here, named, with a comment explaining what it controls.

export const GRAPH_CONFIG = {
  // Minimum distance kept between the graph's content and the edge of its
  // own canvas, on every side. This is a hard guarantee, not a hope —
  // finalizeLayout() sizes the canvas around the content plus this value,
  // so it can never be violated regardless of category/tech count.
  safePadding: 70,

  // Rough vertical space a node's label needs below it, used when
  // measuring the content's bounding box so labels are never clipped or
  // pushed outside safePadding.
  labelHeightAllowance: 34,

  startAngleDeg: -100,
  verticalSquash: 0.82, // keeps the radial burst from reading as a tall oval

  core: {
    size: 92
  },

  category: {
    size: 70,
    // Minimum clearance kept between two adjacent category nodes' edges.
    minGap: 46,
    // Estimated label width, folded into the same clearance check as
    // minGap — two icons can clear each other while their text labels
    // still collide, so the radius math has to account for both.
    labelWidthAllowance: 96,
    // The ring radius never shrinks below this even for very few
    // categories — purely aesthetic, keeps a 2-category graph from
    // looking cramped near the core.
    baseRadius: 190
  },

  tech: {
    size: 50,
    minGap: 34,
    labelWidthAllowance: 78,
    baseRadius: 104,
    // Once a category has more items than this, each additional item also
    // pushes that category's whole tech ring further out (not just
    // tighter together) — keeps a 10-item category from packing as
    // densely as a 3-item one.
    radiusGrowthThreshold: 3,
    radiusGrowthPerItem: 34,
    // Hard ceiling on how wide one category's tech items can fan out, so
    // a single dense category can't sprawl into its neighbors' territory.
    maxSpreadDeg: 100
  },

  mobile: {
    breakpointPx: 640,
    itemsPerRow: 4,
    itemSpacingX: 84,
    itemRowHeight: 70,
    categoryGap: 48,
    coreToFirstCategoryGap: 118
  }
} as const;
