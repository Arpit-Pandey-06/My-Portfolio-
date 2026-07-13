'use client';

import { useEffect, useRef } from 'react';

const SECTION_HUES: { id: string; hue: number }[] = [
  { id: 'about', hue: 190 },
  { id: 'stack', hue: 165 },
  { id: 'services', hue: 210 },
  { id: 'log', hue: 35 },
  { id: 'contact', hue: 190 }
];

export function AmbientField() {
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        let current = 190;
        const mid = window.innerHeight * 0.5;
        for (const s of SECTION_HUES) {
          const el = document.getElementById(s.id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top < mid && r.bottom > 0) current = s.hue;
        }
        document.documentElement.style.setProperty('--hue', String(current));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="ambient-field" />
      <div className="grain" />
    </>
  );
}
