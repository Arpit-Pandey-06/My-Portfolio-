// The graph's layout depends only on `categories`, which changes rarely and
// never at runtime — so it's computed once here, at module load, instead of
// being recalculated (or memoized with a hook) on every render.
//
// To add or edit a node: edit `categories` in lib/data.ts. Nothing else
// needs to change — both layouts (desktop radial, mobile stacked) rebuild
// and rebalance themselves from that one array, including angle spacing.

import { categories } from './data';
import { computeLayout, computeStackedLayout } from '@/components/graph/graphLayout';

export const graphLayoutDesktop = computeLayout(categories);
export const graphLayoutMobile = computeStackedLayout(categories);
