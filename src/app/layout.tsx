import type { Metadata } from "next";
import { Baskervville, Poppins, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import { getJsonLdSchema } from "@/lib/jsonLdSchemas";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

// Register fonts with CSS variables
const baskervville = Baskervville({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-hero",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-primary",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-secondary",
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gulfestates.ae";

  return {
    metadataBase: new URL(baseUrl),
    title: "Gulf Estates - Premier Real Estate in Dubai, UAE",
    description:
      "Discover luxury properties in Dubai with Gulf Estates. Buy, rent, or invest in off-plan properties from top developers. Your trusted real estate partner in the UAE.",
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      title: "Gulf Estates - Premier Real Estate in Dubai, UAE",
      description:
        "Discover luxury properties in Dubai with Gulf Estates. Buy, rent, or invest in off-plan properties from top developers.",
      url: baseUrl,
      siteName: "Gulf Estates",
      images: [
        {
          url: "/images/og-home.jpg",
          width: 1200,
          height: 630,
          alt: "Gulf Estates - Dubai Real Estate",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gulf Estates - Premier Real Estate in Dubai, UAE",
      description:
        "Discover luxury properties in Dubai with Gulf Estates. Buy, rent, or invest in off-plan properties from top developers.",
      images: ["/images/twitter-home.jpg"],
    },
    alternates: {
      canonical: `${baseUrl}/en`,
    },
  };
}

const isValidGTMId = (id: string | undefined): boolean => {
  if (!id || typeof id !== 'string') return false;
  // GTM ID format: GTM- followed by alphanumeric characters (typically 6-7 chars)
  const gtmIdPattern = /^GTM-[A-Z0-9]{4,10}$/i;
  return gtmIdPattern.test(id.trim());
};

const sanitizeGTMId = (id: string | undefined): string => {
  if (!id) return '';
  // Remove any characters that aren't alphanumeric, dash, or underscore
  const sanitized = id.replace(/[^A-Z0-9-_]/gi, '');
  // Validate format
  if (isValidGTMId(sanitized)) {
    return sanitized;
  }
  return '';
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawGTMId = process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID || "GTM-547W3JJ4";
  // Validate and sanitize GTM ID to prevent injection attacks
  const googleTagManagerId = sanitizeGTMId(rawGTMId);
  const isGTMEnabled = googleTagManagerId && isValidGTMId(googleTagManagerId);
  const metaPixelId = "397766946281365";
  const googleAnalyticsId = "G-FC93PQMZ1G";

  // Get pathname and locale from headers for JSON-LD schema
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") || "/en";

  // Extract locale from pathname (default to "en")
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0]?.toLowerCase();
  const VALID_LOCALES = ["en", "fr", "es"];
  const locale = VALID_LOCALES.includes(firstSegment) ? firstSegment : "en";

  // Generate JSON-LD schema
  const jsonLdSchema = getJsonLdSchema(pathname, locale);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `,
          }}
        />
        {/* Preload LCP image (logo) for faster initial render */}
        <link rel="preload" href="/images/logo.png" as="image" />
        {/* JSON-LD Schema */}
        {jsonLdSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdSchema }}
          />
        )}
        {/* Google Tag Manager - Only render if ID is valid */}
        {isGTMEnabled && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${googleTagManagerId}');
              `,
            }}
          />
        )}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        className={`${baskervville.variable} ${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Google Tag Manager (noscript) - Only render if ID is valid */}
        {isGTMEnabled && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
