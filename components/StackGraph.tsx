import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { graphLayoutDesktop, graphLayoutMobile } from '@/lib/graphData';
import { GraphCanvas } from './graph/GraphCanvas';

// Lightweight orchestrator: this file only lays out the section shell.
// All graph behavior — layout math, hover derivation, responsive layout
// choice, rendering — lives under components/graph/.
export function StackGraph() {
  return (
    <section id="stack" className="px-4 pb-36 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="dependency graph"
          title="The system, mapped."
          sub="Every tool in the stack, wired to where it actually lives. Hover a node to trace its connections."
        />

        <Reveal>
          <GraphCanvas desktopLayout={graphLayoutDesktop} mobileLayout={graphLayoutMobile} />
        </Reveal>
      </div>
    </section>
  );
}
