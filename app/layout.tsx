import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Footer } from '@/components/site/Footer';
import { MobileActions, SiteHeader } from '@/components/site/SiteHeader';
import { business, SITE_ORIGIN } from '@/lib/site-data';

import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'PRO Detailing | LLumar Tint & Ceramic Coating in Manassas, VA',
    template: '%s | PRO Detailing',
  },
  description:
    'Premium LLumar window tint, Ceramic Pro coating, paint protection film and auto detailing at the PRO Detailing studio in Manassas, Virginia.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/pro-mark.png', type: 'image/png', sizes: '400x400' }],
    apple: [{ url: '/pro-mark.png', sizes: '400x400' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PRO Detailing',
    title: 'PRO Detailing | Vehicle Appearance & Protection',
    description:
      'LLumar window tint, Ceramic Pro coating, paint protection film and premium detailing in Manassas, Virginia.',
    url: '/',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  '@id': `${SITE_ORIGIN}/#business`,
  name: business.legalName,
  alternateName: business.name,
  url: SITE_ORIGIN,
  telephone: business.phoneHref,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7501 Gary Rd',
    addressLocality: 'Manassas',
    addressRegion: 'VA',
    postalCode: '20109',
    addressCountry: 'US',
  },
  areaServed: ['Manassas', 'Northern Virginia'],
  sameAs: [business.instagram, business.facebook, business.google],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <Footer />
        <MobileActions />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}
