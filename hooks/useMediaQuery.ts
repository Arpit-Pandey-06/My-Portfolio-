'use client';

import { useEffect, useState } from 'react';

// SSR-safe media query hook. Starts false (assumes the "larger" layout)
// during server render and the first client paint, then syncs to the
// real value on mount — a one-frame layout swap on mobile is the
// standard, accepted tradeoff for any client-driven responsive layout
// choice that can't be resolved at build time.
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}
