'use client';

import Image from 'next/image';
import { memo } from 'react';
import { nodeSize } from './graphLayout';
import type { PositionedNode, VisualState } from './graphTypes';

interface GraphNodeProps {
  node: PositionedNode;
  layoutWidth: number;
  layoutHeight: number;
  state: VisualState;
  isHovered: boolean;
  coreAwake: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

function GraphNodeImpl({
  node,
  layoutWidth,
  layoutHeight,
  state,
  isHovered,
  coreAwake,
  onHoverStart,
  onHoverEnd
}: GraphNodeProps) {
  const size = nodeSize(node.kind);
  const sizeCqw = (size / layoutWidth) * 100;
  const leftPct = (node.x / layoutWidth) * 100;
  const topPct = (node.y / layoutHeight) * 100;
  const dim = state === 'dim';
  const active = state === 'active';

  const wake = () => onHoverStart(node.id);
  const sleep = () => onHoverEnd();

  return (
    <div
      className="graph-node absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
      data-kind={node.kind}
      data-cursor-hover
    >
      <button
        type="button"
        className={[
          'graph-node-hit flex flex-col items-center gap-1.5 bg-transparent',
          dim ? 'graph-node--dim' : '',
          active ? 'graph-node--active' : '',
          isHovered ? 'graph-node--hovered' : ''
        ].join(' ')}
        style={{ '--node-size': `${sizeCqw}cqw` } as React.CSSProperties}
        onMouseEnter={wake}
        onMouseLeave={sleep}
        onFocus={wake}
        onBlur={sleep}
        onClick={() => (isHovered ? onHoverEnd() : onHoverStart(node.id))}
        aria-label={node.kind === 'core' ? 'Arpit Pandey — core' : node.label}
        aria-expanded={isHovered}
      >
        <span
          className={[
            'graph-node-dot flex items-center justify-center rounded-full',
            `graph-node-dot--${node.kind}`,
            node.kind === 'core' && coreAwake ? 'graph-node-dot--breathing' : ''
          ].join(' ')}
        >
          {node.kind === 'core' && <span className="font-display text-base font-bold">{node.label}</span>}
          {node.kind === 'tech' && node.icon && (
            <span className="graph-node-icon">
              <Image src={node.icon} alt="" fill sizes="40px" unoptimized style={{ objectFit: 'contain' }} />
            </span>
          )}
        </span>
        {node.kind !== 'core' && (
          <span className={`graph-node-label graph-node-label--${node.kind}`}>{node.label}</span>
        )}
      </button>
    </div>
  );
}

export const GraphNode = memo(GraphNodeImpl);
