'use client';

import { EASE_OUT_EXPO } from '@/constants/motion';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { focusItems } from '@/lib/data';

const bootMessages = [
  { tag: '[sys]', text: 'initializing runtime...' },
  { tag: '[sys]', text: 'loading modules: backend-engineering, api-design, system-architecture' },
  { tag: '[sys]', text: 'connecting to: go, distributed-systems, cloud' },
  { tag: '[ok] ', text: 'status: online', ok: true }
];

export function Hero() {
  const [uptime, setUptime] = useState('since 2023');

  useEffect(() => {
    const years = (
      (Date.now() - new Date('2023-01-01').getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
    ).toFixed(1);
    setUptime(`${years} yrs since 2023`);
  }, []);

  return (
    <header className="relative flex min-h-screen flex-col justify-center px-8 pb-16 pt-32">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mb-10 min-h-[132px] max-w-[520px] font-mono text-[12.5px] text-text-faint">
          {bootMessages.map((b, i) => (
            <motion.div
              key={b.text}
              className="mb-1.5 flex gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.28, duration: 0.3 }}
            >
              <span className={b.ok ? 'text-accent' : 'text-accent/40'}>{b.tag}</span>
              <span>{b.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <h1 className="font-display text-[clamp(48px,9vw,108px)] font-bold leading-[0.98] tracking-[-0.03em]">
            Arpit <span className="text-accent">Pandey</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[clamp(14px,2vw,18px)] text-text-dim">
            <span>Backend Engineer</span>
            <span className="text-text-faint">/</span>
            <span>API Design</span>
            <span className="text-text-faint">/</span>
            <span>System Architecture</span>
          </div>

          <div className="mt-7 flex max-w-2xl flex-wrap gap-2.5">
            {focusItems.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35 + i * 0.08, duration: 0.4 }}
                className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11.5px] text-text-dim"
              >
                {f}
              </motion.span>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-12">
            <MetaItem k="Currently" v="Building FitSaaS · learning Go" delay={1.7} />
            <MetaItem k="Based" v="Remote-first" delay={1.78} />
            <MetaItem k="Uptime" v={uptime} delay={1.86} />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-9 left-8 flex items-center gap-2.5 font-mono text-[11px] text-text-faint"
      >
        <span className="relative block h-[34px] w-px overflow-hidden bg-gradient-to-b from-text-faint to-transparent">
          <motion.span
            className="absolute left-0 top-0 h-full w-full bg-accent"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
        </span>
        SCROLL
      </motion.div>
    </header>
  );
}

function MetaItem({ k, v, delay }: { k: string; v: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-faint">{k}</div>
      <div className="font-mono text-sm text-text">{v}</div>
    </motion.div>
  );
}
