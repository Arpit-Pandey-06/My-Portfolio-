// Shared types for the dependency graph. This is the only place node/edge
// shapes are defined — every other graph file imports from here.

export type NodeKind = 'core' | 'category' | 'tech';

export type EdgeKind = 'core-category' | 'category-tech';

/** Raw node before layout has assigned it a position. */
export interface GraphNodeDatum {
  id: string;
  kind: NodeKind;
  label: string;
  icon?: string;
  /** id of the node this one hangs off of ('core' -> null). */
  parentId: string | null;
  /** the category this node belongs to (own id for category nodes). */
  categoryId: string | null;
}

/** Raw edge before layout has assigned it coordinates. */
export interface GraphEdgeDatum {
  id: string;
  kind: EdgeKind;
  source: string;
  target: string;
}

export interface PositionedNode extends GraphNodeDatum {
  x: number;
  y: number;
}

export interface PositionedEdge extends GraphEdgeDatum {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface GraphLayout {
  width: number;
  height: number;
  nodes: PositionedNode[];
  edges: PositionedEdge[];
  nodesById: Map<string, PositionedNode>;
  edgesById: Map<string, PositionedEdge>;
}

/** How a node or edge should render given the current hover target. */
export type VisualState = 'idle' | 'active' | 'dim';

export interface HoverContext {
  hoveredId: string | null;
  /** true only when the core itself is hovered — nothing dims, everything wakes. */
  coreAwake: boolean;
  activeNodeIds: Set<string>;
  activeEdgeIds: Set<string>;
  pulseEdgeIds: Set<string>;
  activeCategoryId: string | null;
}
