'use client';

import { MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

// Framer Motion does NOT automatically respect prefers-reduced-motion —
// that has to be opted into explicitly. Without this wrapper, every
// Reveal, the Inspector's focus bars, and the Services accordion all
// ignore the OS-level setting entirely. `reducedMotion="user"` makes
// Framer Motion detect the media query itself and swap animations for
// instant transitions site-wide, no per-component checks needed.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
