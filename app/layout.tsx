import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { MotionProvider } from '@/components/MotionProvider';
import { SITE } from '@/lib/site';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap'
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  applicationName: SITE.shortName,
  alternates: { canonical: SITE.url },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    locale: SITE.locale
    // images: auto-picked up from app/opengraph-image.tsx by Next.js
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description
    // images: auto-picked up from app/opengraph-image.tsx by Next.js
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: 'dark'
};

// Person + WebSite structured data. Static and small, so it's inlined
// rather than fetched — search engines read it straight out of the HTML.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: SITE.name,
      url: SITE.url,
      jobTitle: 'Backend Engineer',
      email: `mailto:${SITE.contact.email}`,
      sameAs: [SITE.contact.github, SITE.contact.linkedin],
      knowsAbout: ['API Design', 'System Architecture', 'Backend Development', 'Distributed Systems']
    },
    {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
