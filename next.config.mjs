/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.simpleicons.org' }],
    // Icons render via next/image with `unoptimized` (see GraphNode/Services)
    // since Simple Icons already serves tiny, cache-friendly SVGs — this just
    // keeps the allowed-host allowlist tight for CSP/img-src purposes.
    minimumCacheTTL: 60 * 60 * 24 * 30
  },

  // Security headers applied to every route. Static response headers, zero
  // runtime cost — the baseline Vercel/Lighthouse expect in production.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      },
      {
        // Fonts are content-hashed by next/font and safe to cache forever.
        source: '/:all*(woff2|woff)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }
    ];
  }
};

export default nextConfig;
