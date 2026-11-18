import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/schibsted-grotesk';
import './globals.css';
import { SiteHeader, SiteFooter } from './components/Chrome';
import { ServiceWorkerCleanup } from './components/ServiceWorkerCleanup';

const title = 'R1N1 | We build businesses that run themselves';
const description =
  'R1N1 builds automation and private AI for companies: the system does the routine work, watches itself, and brings people only the exceptions. Proven on buyX and MMCC® | Mobile Mint Car Care.';

export const metadata: Metadata = {
  metadataBase: new URL('https://r1n1.com'),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://r1n1.com',
    siteName: 'R1N1',
    title,
    description,
    locale: 'en_GB',
  },
  twitter: { card: 'summary', site: '@r1n1com_', title, description },
};

export const viewport: Viewport = {
  themeColor: '#0c1824',
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'R1N1 LTD',
  alternateName: 'R1N1',
  url: 'https://r1n1.com',
  email: 'info@r1n1.com',
  identifier: { '@type': 'PropertyValue', propertyID: 'Companies House', value: '13218580' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1a Langton Road',
    addressLocality: 'West Molesey',
    postalCode: 'KT8 2HX',
    addressCountry: 'GB',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ServiceWorkerCleanup />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
