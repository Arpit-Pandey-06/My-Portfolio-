'use client';

import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { commitLog } from '@/lib/data';

// Real branch graph instead of a dotted vertical list — the data already
// carries a `branch` field per year (main vs feature/go-systems) that the
// old version stored but never actually drew. This draws it: the trunk
// runs straight down, and whichever year is on a different branch visibly
// forks off onto its own line, ending in an open "HEAD" marker rather than
// a fake merge, since that branch hasn't actually merged back yet.

const ROW_H = 34; // px per commit row — fixed so the SVG path math stays exact
const YEAR_H = 44; // px per year header row
const GAP = 18; // px between year groups
const TRUNK_X = 14;
const BRANCH_X = 54;
const CURVE_H = 26;

export function CommitLog() {
  // Flatten into a row list with precomputed y (and x, once we know which
  // branch a row belongs to) so the SVG overlay and the HTML rows are
  // guaranteed to line up — no runtime measurement, no drift.
  let y = 0;
  const yearRows = commitLog.map((yr) => {
    const headerY = y;
    y += YEAR_H;
    const commitYs = yr.commits.map(() => {
      const cy = y + ROW_H / 2;
      y += ROW_H;
      return cy;
    });
    y += GAP;
    return { ...yr, headerY, commitYs };
  });
  const totalHeight = y - GAP;

  const mainRows = yearRows.filter((yr) => yr.branch === 'main');
  const featureGroups = yearRows.filter((yr) => yr.branch !== 'main');
  const firstFeature = featureGroups[0];
  const splitY = firstFeature ? firstFeature.headerY - GAP / 2 : totalHeight;
  const lastFeatureY = firstFeature
    ? firstFeature.commitYs.slice(-1)[0]
    : null;

  return (
    <section id="log" className="px-8 pb-36 pt-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="branch graph"
          title="The history, one commit at a time."
          sub="How the system got here — main trunk, with the current work still on its own open branch."
        />

        <Reveal>
          <div className="relative" style={{ height: totalHeight, paddingLeft: BRANCH_X + 40 }}>
            <svg
              className="absolute left-0 top-0 h-full"
              width={BRANCH_X + 20}
              style={{ overflow: 'visible' }}
              aria-hidden="true"
            >
              {/* trunk */}
              <line
                x1={TRUNK_X}
                y1={0}
                x2={TRUNK_X}
                y2={totalHeight}
                stroke="hsl(var(--border))"
                strokeWidth={1.5}
              />
              {/* branch fork, only drawn if there's a diverging branch */}
              {firstFeature && (
                <path
                  d={`M ${TRUNK_X} ${splitY} C ${TRUNK_X} ${splitY + CURVE_H}, ${BRANCH_X} ${splitY + CURVE_H}, ${BRANCH_X} ${splitY + CURVE_H * 1.6}
                      L ${BRANCH_X} ${lastFeatureY}`}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth={1.5}
                />
              )}
              {/* open HEAD marker at the tip of the active branch */}
              {firstFeature && lastFeatureY !== null && (
                <>
                  <circle cx={BRANCH_X} cy={lastFeatureY} r={5} fill="hsl(var(--bg))" stroke="hsl(var(--accent))" strokeWidth={1.5} />
                  <circle cx={BRANCH_X} cy={lastFeatureY} r={9} fill="none" stroke="hsl(var(--accent))" strokeWidth={1} className="animate-pulseRing" />
                </>
              )}
              {/* commit dots on the trunk */}
              {mainRows.flatMap((yr) =>
                yr.commitYs.map((cy, i) => (
                  <circle key={`${yr.year}-${i}`} cx={TRUNK_X} cy={cy} r={3.5} fill="hsl(var(--bg))" stroke="hsl(var(--border-soft))" strokeWidth={1.5} />
                ))
              )}
              {/* commit dots on the branch */}
              {firstFeature &&
                firstFeature.commitYs.map((cy, i) => (
                  <circle key={`feat-${i}`} cx={BRANCH_X} cy={cy} r={3.5} fill="hsl(var(--bg))" stroke="hsl(var(--accent))" strokeWidth={1.5} />
                ))}
            </svg>

            {yearRows.map((yr) => {
              const onBranch = yr.branch !== 'main';
              const rowX = onBranch ? BRANCH_X : TRUNK_X;
              return (
                <div key={yr.year}>
                  <div
                    className="absolute flex items-center gap-2.5 font-mono text-[13px] text-accent"
                    style={{ top: yr.headerY, left: rowX + 20, height: YEAR_H }}
                  >
                    {yr.year}
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10.5px] text-text-faint">
                      {yr.branch}
                    </span>
                  </div>
                  {yr.commits.map((c, ci) => (
                    <div
                      key={c.hash}
                      className="group absolute flex items-center gap-3.5 rounded-lg px-3 transition-colors hover:bg-surface"
                      style={{ top: yr.commitYs[ci] - ROW_H / 2, left: rowX + 20, height: ROW_H, right: 0 }}
                    >
                      <span className="flex-shrink-0 font-mono text-[11.5px] text-text-faint">{c.hash}</span>
                      <span className="text-[14.5px] text-text">{c.message}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
