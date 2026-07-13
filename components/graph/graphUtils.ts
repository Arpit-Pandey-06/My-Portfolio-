// Everything the graph needs to know is derived from a single hoveredId.
// This file is that derivation — GraphCanvas holds the one piece of state,
// this turns it into "which nodes/edges are active, dim, or pulsing".

import type { GraphLayout, HoverContext, VisualState } from './graphTypes';

const EMPTY_CONTEXT: HoverContext = {
  hoveredId: null,
  coreAwake: false,
  activeNodeIds: new Set(),
  activeEdgeIds: new Set(),
  pulseEdgeIds: new Set(),
  activeCategoryId: null
};

export function computeHoverContext(hoveredId: string | null, layout: GraphLayout): HoverContext {
  if (!hoveredId) return EMPTY_CONTEXT;

  const node = layout.nodesById.get(hoveredId);
  if (!node) return EMPTY_CONTEXT;

  // Hover core: the whole network wakes up, nothing dims.
  if (node.kind === 'core') {
    const allNodeIds = new Set(layout.nodes.map((n) => n.id));
    const allEdgeIds = new Set(layout.edges.map((e) => e.id));
    return {
      hoveredId,
      coreAwake: true,
      activeNodeIds: allNodeIds,
      activeEdgeIds: allEdgeIds,
      pulseEdgeIds: allEdgeIds,
      activeCategoryId: null
    };
  }

  // Hover a category: core -> this category -> every tech under it.
  if (node.kind === 'category') {
    const childEdges = layout.edges.filter((e) => e.kind === 'category-tech' && e.source === node.id);
    const coreEdge = layout.edges.find((e) => e.kind === 'core-category' && e.target === node.id);

    const activeNodeIds = new Set<string>(['core', node.id, ...childEdges.map((e) => e.target)]);
    const activeEdgeIds = new Set<string>(childEdges.map((e) => e.id));
    if (coreEdge) activeEdgeIds.add(coreEdge.id);

    return {
      hoveredId,
      coreAwake: false,
      activeNodeIds,
      activeEdgeIds,
      pulseEdgeIds: activeEdgeIds,
      activeCategoryId: node.categoryId
    };
  }

  // Hover a tech leaf: only its own chain back to core stays visible —
  // siblings under the same category fade along with everything else.
  const categoryId = node.parentId;
  const coreEdge = categoryId
    ? layout.edges.find((e) => e.kind === 'core-category' && e.target === categoryId)
    : undefined;
  const techEdge = layout.edges.find((e) => e.kind === 'category-tech' && e.target === node.id);

  const activeNodeIds = new Set<string>(['core', node.id]);
  if (categoryId) activeNodeIds.add(categoryId);

  const activeEdgeIds = new Set<string>();
  if (coreEdge) activeEdgeIds.add(coreEdge.id);
  if (techEdge) activeEdgeIds.add(techEdge.id);

  return {
    hoveredId,
    coreAwake: false,
    activeNodeIds,
    activeEdgeIds,
    pulseEdgeIds: activeEdgeIds,
    activeCategoryId: node.categoryId
  };
}

export function getNodeState(nodeId: string, ctx: HoverContext): VisualState {
  if (!ctx.hoveredId) return 'idle';
  if (ctx.coreAwake) return 'active';
  return ctx.activeNodeIds.has(nodeId) ? 'active' : 'dim';
}

export function getEdgeState(edgeId: string, ctx: HoverContext): VisualState {
  if (!ctx.hoveredId) return 'idle';
  if (ctx.coreAwake) return 'active';
  return ctx.activeEdgeIds.has(edgeId) ? 'active' : 'dim';
}

export function isEdgePulsing(edgeId: string, ctx: HoverContext): boolean {
  return ctx.pulseEdgeIds.has(edgeId);
}
