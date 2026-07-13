'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [data-cursor-hover]';
const MAGNETIC_STRENGTH = 0.35; // how strongly the ring gets pulled toward an element's center
const FOLLOW_SPEED = 0.18; // ring interpolation speed — lower = softer trail

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(canHover);
    if (!canHover) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let magnetTarget: { x: number; y: number } | null = null;
    let rafId = 0;

    const place = (el: HTMLDivElement | null, x: number, y: number) => {
      if (el) el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      place(dotRef.current, mouseX, mouseY);
      if (reduceMotion) place(ringRef.current, mouseX, mouseY);
    };

    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!el) return;
      ringRef.current?.classList.add('cursor-ring--interactive');
      if (el.closest('.graph-node')) {
        ringRef.current?.classList.add('cursor-ring--graph');
      }
      const rect = el.getBoundingClientRect();
      magnetTarget = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    const out = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR);
      if (!el) return;
      ringRef.current?.classList.remove('cursor-ring--interactive', 'cursor-ring--graph');
      magnetTarget = null;
    };

    const tick = () => {
      const targetX = magnetTarget ? mouseX + (magnetTarget.x - mouseX) * MAGNETIC_STRENGTH : mouseX;
      const targetY = magnetTarget ? mouseY + (magnetTarget.y - mouseY) * MAGNETIC_STRENGTH : mouseY;
      ringX += (targetX - ringX) * FOLLOW_SPEED;
      ringY += (targetY - ringY) * FOLLOW_SPEED;
      place(ringRef.current, ringX, ringY);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    if (!reduceMotion) rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
