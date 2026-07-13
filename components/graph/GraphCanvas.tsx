'use client';

import { useCallback, useMemo, useState } from 'react';
import type { GraphLayout } from './graphTypes';
import { computeHoverContext, getEdgeState, getNodeState, isEdgePulsing } from './graphUtils';
import { GraphEdge } from './GraphEdge';
import { GraphNode } from './GraphNode';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface GraphCanvasProps {
  desktopLayout: GraphLayout;
  mobileLayout: GraphLayout;
}

export function GraphCanvas({ desktopLayout, mobileLayout }: GraphCanvasProps) {
  // Genuinely different layouts, not one shape scaled down — the mobile
  // version is a vertical stack (see computeStackedLayout), because a
  // wide radial burst squeezed into a narrow, short strip is unreadable.
  const isMobile = useMediaQuery('(max-width: 640px)');
  const layout = isMobile ? mobileLayout : desktopLayout;

  // The ONE interaction state. Every visual (node glow, edge pulse, legend
  // highlight, label growth) is derived from this — nothing else is stored.
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const onHoverStart = useCallback((id: string) => setHoveredNodeId(id), []);
  const onHoverEnd = useCallback(() => setHoveredNodeId(null), []);

  const hoverContext = useMemo(() => computeHoverContext(hoveredNodeId, layout), [hoveredNodeId, layout]);

  const categoryNodes = useMemo(() => layout.nodes.filter((n) => n.kind === 'category'), [layout.nodes]);

  return (
    <div className="graph-widget">
      <div
        className="graph-canvas"
        style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
        onPointerLeave={onHoverEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) onHoverEnd();
        }}
      >
        <svg
          className="graph-svg"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="presentation"
        >
          {layout.edges.map((edge) => (
            <GraphEdge
              key={edge.id}
              edge={edge}
              state={getEdgeState(edge.id, hoverContext)}
              pulsing={isEdgePulsing(edge.id, hoverContext)}
            />
          ))}
        </svg>

        <div className="graph-node-layer" role="group" aria-label="Technology dependency graph">
          {layout.nodes.map((node) => (
            <GraphNode
              key={node.id}
              node={node}
              layoutWidth={layout.width}
              layoutHeight={layout.height}
              state={getNodeState(node.id, hoverContext)}
              isHovered={hoveredNodeId === node.id}
              coreAwake={hoverContext.coreAwake}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-5 font-mono text-[11.5px] text-text-dim">
        {categoryNodes.map((cat) => (
          <span
            key={cat.id}
            className={`inline-flex items-center gap-2 transition-colors duration-300 ${
              hoverContext.activeCategoryId === cat.categoryId ? 'text-accent' : ''
            }`}
          >
            <i
              className={`inline-block h-2 w-2 rounded-full border transition-colors duration-300 ${
                hoverContext.activeCategoryId === cat.categoryId
                  ? 'border-accent bg-accent shadow-[0_0_8px_hsl(var(--accent))]'
                  : 'border-text-faint bg-border'
              }`}
            />
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
}
