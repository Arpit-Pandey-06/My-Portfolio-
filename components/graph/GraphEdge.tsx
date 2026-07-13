'use client';

import { memo } from 'react';
import type { PositionedEdge, VisualState } from './graphTypes';

interface GraphEdgeProps {
  edge: PositionedEdge;
  state: VisualState;
  pulsing: boolean;
}

function GraphEdgeImpl({ edge, state, pulsing }: GraphEdgeProps) {
  const dim = state === 'dim';
  const active = state === 'active';

  return (
    <g
      className={['graph-edge', active ? 'graph-edge--active' : '', dim ? 'graph-edge--dim' : ''].join(' ')}
      aria-hidden="true"
    >
      <line className="graph-edge-base" x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} />
      {active && <line className="graph-edge-glow" x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} />}
      {active && pulsing && (
        <line className="graph-edge-pulse" x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} />
      )}
    </g>
  );
}

export const GraphEdge = memo(GraphEdgeImpl);
