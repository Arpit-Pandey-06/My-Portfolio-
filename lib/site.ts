// Single source of truth for site-wide identity used by every metadata
// surface (layout metadata, robots, sitemap, manifest, OG/Twitter images,
// JSON-LD). Change the domain or tagline once here instead of hunting
// through five files that each hardcoded their own copy.

import { contact } from './data';

export const SITE = {
  // TODO: after your first Vercel deploy, replace this with the real URL —
  // either the *.vercel.app one Vercel assigns, or your custom domain if
  // you attach one later. Everything else in this file can stay as-is.
  url: 'https://arpit-portfolio.vercel.app',
  name: 'Arpit Pandey',
  title: 'Arpit Pandey — Backend Engineer',
  shortName: 'arpit.sys',
  description:
    'Backend engineer focused on API design, system architecture and scalable applications. Currently building FitSaaS and learning Go, distributed systems and HTTP server engineering.',
  keywords: [
    'Arpit Pandey',
    'Backend Engineer',
    'API Design',
    'System Architecture',
    'Node.js Developer',
    'Go Developer',
    'FastAPI',
    'Full Stack Developer Portfolio'
  ],
  locale: 'en_US',
  themeColor: '#0a0f1a',
  twitterHandle: undefined as string | undefined,
  contact
} as const;
