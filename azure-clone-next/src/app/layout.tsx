import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LeaveSiteConfirm } from '@/components/layout/ExternalLink';
import { ExploreFolio3Drawer } from '@/components/layout/ExploreFolio3Drawer';

// Fonts are stored in ./fonts (the same latin files Google Fonts serves) instead of
// being downloaded from Google at build time: Google intermittently returns a font
// URL that next/font/google cannot parse, which failed a production build.
const jakarta = localFont({
  src: './fonts/plus-jakarta-sans-latin-300-800.woff2',
  weight: '300 800',
  style: 'normal',
  variable: '--font-jakarta',
  display: 'swap',
});
const poppins = localFont({
  src: [
    { path: './fonts/poppins-latin-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/poppins-latin-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/poppins-latin-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/poppins-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://azure.folio3.com'),
  title: {
    default: 'Folio3 | Azure Cloud Services',
    template: '%s | Folio3 Azure',
  },
  description:
    'Microsoft Solutions Partner for Azure cloud, data analytics, Microsoft Fabric and Copilot. Build, run and manage applications with Folio3.',
  openGraph: {
    type: 'website',
    siteName: 'Folio3 Azure',
    images: ['/wp-content/uploads/2024/09/Azure-Herobanner-Illustration-updated-new.webp'],
  },
  twitter: { card: 'summary_large_image' },
};

// Set these in .env.local to activate tracking
const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;
const TURNSTILE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const HUBSPOT_TRACKING = process.env.NEXT_PUBLIC_HUBSPOT_TRACKING_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${poppins.variable}`}>
      <head>
        {/* fail-safe: if JS is disabled, entrance animations never run — show content */}
        <noscript dangerouslySetInnerHTML={{ __html: '<style>.reveal{opacity:1 !important}</style>' }} />
      </head>
      <body>
        {/* Site-wide structured data graph (matches the live site's Yoast output):
            Organization + WebSite. Per-page WebPage + BreadcrumbList are emitted by
            each page and reference these by @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://azure.folio3.com/#organization',
                  name: 'Folio3 Azure',
                  url: 'https://azure.folio3.com',
                  logo: 'https://azure.folio3.com/wp-content/uploads/2022/06/folio3_by_azure.svg',
                  telephone: '+1 (408) 412-3813',
                  sameAs: ['https://www.linkedin.com/company/folio3', 'https://twitter.com/folio3'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://azure.folio3.com/#website',
                  name: 'Folio3 Azure',
                  url: 'https://azure.folio3.com',
                  publisher: { '@id': 'https://azure.folio3.com/#organization' },
                  inLanguage: 'en-US',
                },
              ],
            }),
          }}
        />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-cardHover">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ExploreFolio3Drawer />
        <LeaveSiteConfirm />

        {/* Deferred tracking — replaces GTM/Clarity that render-block today */}
        {GTM && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');
          `}</Script>
        )}
        {CLARITY && (
          <Script id="clarity" strategy="afterInteractive">{`
            (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");
          `}</Script>
        )}
        {TURNSTILE && (
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
        )}
        {HUBSPOT_TRACKING && (
          <Script id="hs-script-loader" strategy="afterInteractive" src={`https://js.hs-scripts.com/${HUBSPOT_TRACKING}.js`} />
        )}
      </body>
    </html>
  );
}
