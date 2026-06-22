import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${poppins.variable}`}>
      <head>
        {/* fail-safe: if JS is disabled, entrance animations never run — show content */}
        <noscript dangerouslySetInnerHTML={{ __html: '<style>.reveal{opacity:1 !important}</style>' }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Folio3 Azure',
              url: 'https://azure.folio3.com',
              logo: 'https://azure.folio3.com/wp-content/uploads/2022/06/folio3_by_azure.svg',
              telephone: '+1 (408) 412-3813',
              sameAs: ['https://www.linkedin.com/company/folio3', 'https://twitter.com/folio3'],
            }),
          }}
        />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-cardHover">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />

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
      </body>
    </html>
  );
}
