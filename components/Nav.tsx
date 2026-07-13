'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/constants/motion';

const links = [
  { href: '#about', label: '/about' },
  { href: '#stack', label: '/stack' },
  { href: '#services', label: '/services' },
  { href: '#log', label: '/log' },
  { href: '#contact', label: '/contact' }
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Scroll-spy: highlight whichever section is actually in view. There
  // was no active-state indication at all before this — links only
  // reacted to hover, giving no sense of where you are on the page.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="fixed left-0 right-0 top-0 z-[100] border-b border-border-soft bg-bg/55 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2.5 font-mono text-[13px]">
          <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-surface font-display text-xs font-bold text-accent">
            AP
          </span>
          arpit.sys
        </div>

        <div className="hidden gap-7 font-mono text-[12.5px] text-text-dim md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative py-1 transition-colors ${active === l.href ? 'text-accent' : ''}`}
            >
              {l.label}
              <span
                className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                  active === l.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 font-mono text-[11.5px] text-text-dim md:flex">
          <span className="relative h-[7px] w-[7px] rounded-full bg-accent">
            <span className="absolute -inset-1 animate-pulseRing rounded-full border border-accent" />
          </span>
          SYSTEM ONLINE
        </div>

        {/* Mobile: hamburger — the links above are hidden below md, so this
            is the only way to navigate on a phone. It didn't exist before. */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative -mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className={`block h-px w-5 bg-text transition-transform duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-text transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-text transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            id="mobile-nav"
            className="overflow-hidden border-t border-border-soft md:hidden"
          >
            <div className="flex flex-col gap-1 px-8 py-4 font-mono text-[13px] text-text-dim">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 transition-colors ${active === l.href ? 'text-accent' : ''}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
