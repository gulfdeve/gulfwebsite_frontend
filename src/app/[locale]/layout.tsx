import "../globals.css";
import { dir } from "i18next";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import LiveAvatarChatButton from "@/components/layout/LiveAvatarChatButton";
import ClientI18nProvider from "@/components/common/ClientI18nProvider";
import { getMetadata } from "@/lib/metadata";
import { Toaster } from "sonner";

const { i18n } = require("../../../next-i18next.config.cjs");

export async function generateStaticParams() {
  return i18n.locales.map((locale: string) => ({ locale }));
}

const VALID_LOCALES = ["en", "fr", "es"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const normalizedLocale = localeParam?.toLowerCase() || "en";
  
  // If locale is not valid, redirect to not-found
  let locale: string;
  if (!VALID_LOCALES.includes(normalizedLocale)) {
    // This will be handled by middleware, but we ensure it here too
    locale = "en";
  } else {
    locale = normalizedLocale;
  }

  return (
    <>
      <section
        lang={locale.toLowerCase()}
        dir={dir(locale.toLowerCase())}
        className="overflow-hidden"
      >
        {/* ✅ Wrap with a client provider to sync language */}
        <ClientI18nProvider locale={locale.toLowerCase()}>
          <Navbar locale={locale.toLowerCase()} />
          {children}
          <Footer locale={locale.toLowerCase()} />
          <WhatsAppButton />
          <LiveAvatarChatButton locale={locale.toLowerCase()} />
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={true}
            duration={4000}
            visibleToasts={3}
            toastOptions={{
              style: {
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          />
        </ClientI18nProvider>
      </section>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") || `/${locale}`;

  const metadata = getMetadata(pathname);
  const fullImageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://gulfestates.ae"
  }${metadata?.ogImage}`;

  const fullTwitterImageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://gulfestates.ae"
  }${metadata?.twitterImage}`;

  // Construct canonical URL - use metadata canonical or current pathname
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gulfestates.ae";
  const cleanPathname = pathname.replace(/\/$/, "") || `/${locale}`;

  // Determine canonical URL
  let canonicalUrl: string;
  
  if (metadata?.canonical && metadata.canonical !== baseUrl) {
    // If metadata.canonical is a full URL
    if (metadata.canonical.startsWith('http://') || metadata.canonical.startsWith('https://')) {
      // Check if it already includes a locale prefix
      const urlObj = new URL(metadata.canonical);
      const path = urlObj.pathname;
      
      // If path doesn't start with /en, /es, or /fr, add the locale
      if (!path.match(/^\/(en|fr|es)(\/|$)/)) {
        // Remove leading slash if present, then add locale
        const pathWithoutLeadingSlash = path.startsWith('/') ? path.slice(1) : path;
        canonicalUrl = `${baseUrl}/${locale}${pathWithoutLeadingSlash ? `/${pathWithoutLeadingSlash}` : ''}`;
      } else {
        // Already has locale, use as-is
        canonicalUrl = metadata.canonical;
      }
    } else {
      // If it's a path (not a full URL), add base URL and locale
      const pathWithoutLocale = metadata.canonical.replace(/^\/(en|fr|es)(\/|$)/, '/');
      canonicalUrl = `${baseUrl}/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }
  } else {
    // Use current pathname (which already includes locale)
    canonicalUrl = `${baseUrl}${cleanPathname}`;
  }

  return {
    title: metadata?.title,
    description: metadata?.description,
    openGraph: {
      title: metadata?.title,
      description: metadata?.description,
      url: canonicalUrl,
      siteName: "Gulf Estates",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: metadata?.title || "Gulf Estates",
        },
      ],
      locale: locale === "en" ? "en_US" : locale === "fr" ? "fr_FR" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata?.title,
      description: metadata?.description,
      images: [fullTwitterImageUrl],
    },
    alternates: { canonical: canonicalUrl },
  };
}
