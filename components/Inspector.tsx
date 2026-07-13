'use client';

import { EASE_OUT_EXPO } from '@/constants/motion';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { focusBars, specialization } from '@/lib/data';

export function Inspector() {
  return (
    <section id="about" className="px-8 pb-32 pt-36">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="process inspector"
          title="Read the process, not the resume."
          sub="A live snapshot of what's currently running — role, focus, and what's actually being learned right now."
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <Row label="role">
              <div className="mb-2.5 font-display text-lg font-medium text-text">Backend Engineer</div>
              <div className="flex flex-wrap gap-2">
                {specialization.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[11.5px] text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Row>

            <Row label="current focus">
              <div className="flex flex-col gap-2.5">
                {focusBars.map((f, i) => (
                  <FocusBar key={f.label} label={f.label} value={f.value} index={i} />
                ))}
              </div>
            </Row>

            <Row label="status" last>
              <div className="flex items-center gap-2.5 font-mono text-[13px] text-text-dim">
                <span className="relative h-[7px] w-[7px] rounded-full bg-accent">
                  <span className="absolute -inset-1 animate-pulseRing rounded-full border border-accent" />
                </span>
                Actively building FitSaaS — a multi-tenant SaaS platform
              </div>
              <div className="mt-2 font-mono text-[13px] text-text-faint">
                Prior work spans full-stack apps, realtime systems and AI-integrated platforms
              </div>
            </Row>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 transition-colors hover:bg-surface-2 sm:grid-cols-[200px_1fr] ${
        last ? '' : 'border-b border-border-soft'
      }`}
    >
      <div className="flex items-start border-b border-border-soft px-6 py-6 font-mono text-[11.5px] uppercase tracking-[0.08em] text-text-faint sm:border-b-0 sm:border-r">
        {label}
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

function FocusBar({ label, value, index }: { label: string; value: number; index: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="min-w-[150px] font-mono text-[13px] text-text">{label}</span>
      <div className="h-[3px] max-w-[280px] flex-1 overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: '0%' }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: EASE_OUT_EXPO }}
        />
      </div>
    </div>
  );
}
