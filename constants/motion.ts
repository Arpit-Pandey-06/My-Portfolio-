// Single source of truth for animation timing/easing across the site.
// Before this, the same easing curve and magic-number durations were
// hand-typed in Reveal, Hero, Services, CommitLog, and Inspector —
// changing the site's motion "feel" meant editing five files. Now it
// means editing this one.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  bar: 1.2,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
} as const;

export const revealTransition = (delay = 0) => ({
  duration: DURATION.slow,
  ease: EASE_OUT_EXPO,
  delay,
});
