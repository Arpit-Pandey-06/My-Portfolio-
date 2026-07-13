'use client';

import { useEffect, useState } from 'react';

export function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // A footer timestamp doesn't need second-level precision, so this
    // ticks once a minute instead of every second — the previous version
    // re-rendered the whole component 3600 times an hour for a decorative
    // clock. Also pauses entirely while the tab isn't visible.
    let id: ReturnType<typeof setInterval> | null = null;

    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const start = () => {
      if (id) return;
      tick();
      id = setInterval(tick, 60_000);
    };
    const stop = () => {
      if (id) clearInterval(id);
      id = null;
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') start();
      else stop();
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <footer className="relative z-[2] border-t border-border-soft px-8 py-11">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 font-mono text-[11.5px] text-text-faint">
        <span>© 2026 Arpit Pandey — built as a system, not a template.</span>
        <span suppressHydrationWarning>{time && `local time ${time}`}</span>
      </div>
    </footer>
  );
}
