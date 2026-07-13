'use client';

import { EASE_OUT_EXPO } from '@/constants/motion';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { projects, contact } from '@/lib/data';

export function Services() {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <section id="services" className="px-8 pb-36 pt-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="running services"
          title="What's deployed."
          sub="Each project modeled as a service instance — expand for stack, status and source."
        />

        <div>
          {projects.map((p, i) => {
            const open = openId === p.id;
            return (
              <Reveal key={p.id} delay={i * 0.05}>
                <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-soft">
                  <button
                    onClick={() => setOpenId(open ? null : p.id)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="relative h-[9px] w-[9px] flex-shrink-0 rounded-full" style={{
                      background: p.status === 'running' ? 'hsl(var(--accent))' : 'hsl(var(--amber))',
                      boxShadow: p.status === 'running' ? '0 0 10px hsl(var(--accent))' : '0 0 10px hsl(var(--amber))'
                    }}>
                      <span
                        className="absolute -inset-[5px] animate-pulseRing rounded-full border"
                        style={{ borderColor: p.status === 'running' ? 'hsl(var(--accent))' : 'hsl(var(--amber))' }}
                      />
                    </span>
                    <div>
                      <div className="font-display text-[19px] font-semibold">{p.name}</div>
                      <div className="font-mono text-[12.5px] text-text-faint">{p.route}</div>
                    </div>
                    <span
                      className={`ml-auto rounded-full border px-2.5 py-1 font-mono text-[10.5px] ${
                        p.status === 'running'
                          ? 'border-accent/35 text-accent'
                          : 'border-amber/35 text-amber'
                      }`}
                    >
                      {p.status === 'running' ? 'STABLE' : 'BUILDING'}
                    </span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-4 w-4 text-text-faint" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-4 px-6 pb-6">
                          <p className="max-w-2xl text-[14.5px] leading-relaxed text-text-dim">{p.desc}</p>
                          <div className="flex flex-wrap gap-2.5">
                            {p.stack.map((s) => (
                              <span
                                key={s.n}
                                className="flex items-center gap-1.5 rounded-lg border border-border-soft bg-surface-2 px-2.5 py-1.5 font-mono text-[11.5px] text-text-dim"
                              >
                                <Image src={s.icon} alt="" width={14} height={14} unoptimized />
                                {s.n}
                              </span>
                            ))}
                          </div>
                          <div className="mt-0.5 flex items-center gap-4 border-t border-border-soft pt-3.5">
                            <a
                              href={contact.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs text-blue hover:underline"
                            >
                              view on github →
                            </a>
                            <span className="ml-auto font-mono text-[11px] text-text-faint">{p.meta}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
