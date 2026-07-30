import PropertyDetailPage from "./PropertyDetailPage";
import type { Metadata } from "next";
import Script from "next/script";
import { permanentRedirect } from "next/navigation";

interface Property {
  _id: string;
  title: string | { en?: string; fr?: string; es?: string };
  location?: string | { en?: string; fr?: string; es?: string };
  image?: string;
  images?: string[];
  description?: string | { en?: string; fr?: string; es?: string };
  seo?: {
    title?: {
      en?: string;
      fr?: string;
      es?: string;
    };
    description?: {
      en?: string;
      fr?: string;
      es?: string;
    };
    schema?: {
      en?: string;
      fr?: string;
      es?: string;
    };
  };
  languages?: {
    title: any;
    description: any;
    location: any;
  };
}

async function fetchProperty(
  id: string,
  locale: string = "en"
): Promise<Property | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  try {
    const res = await fetch(`${API_URL}/api/properties/${id}?locale=${locale}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch property");
    const data = await res.json();
    return data?.data || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// If a property was found under an old slug, resolve where it moved to
async function fetchPropertyRedirect(
  slug: string,
  locale: string
): Promise<string | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  try {
    const res = await fetch(
      `${API_URL}/api/redirects/resolve/property/${locale}/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.newSlug || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const property: any = await fetchProperty(id, locale);

  if (!property) {
    return {
      title: "Property - Gulf Estates",
      description: "Property not found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gulfestates.ae";

  const getLocalizedText = (
    field: string | { en?: string; fr?: string; es?: string } | undefined,
    fallback: string = ""
  ): string => {
    if (!field) return fallback;
    if (typeof field === "string") return field;
    if (typeof field === "object") {
      return field[locale as keyof typeof field] || field.en || fallback;
    }
    return fallback;
  };

  const titleText = property.seo?.title
    ? property.seo.title[locale as keyof typeof property.seo.title] ||
      property.seo.title.en ||
      ""
    : getLocalizedText(property.title, "Property");

  const descriptionText = property.seo?.description
    ? property.seo.description[
        locale as keyof typeof property.seo.description
      ] ||
      property.seo.description.en ||
      ""
    : getLocalizedText(property.description) ||
      `${getLocalizedText(property.title)} in ${getLocalizedText(
        property.location
      )}`;

  const canonicalUrl = `${baseUrl}/${locale}/properties/${id}`;
  const imageUrl =
    property?.image && property?.image?.startsWith("http")
      ? property.image
      : property?.images?.[0] || `${baseUrl}/images/banner-image.webp`;

  return {
    title: titleText,
    description: descriptionText,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
      url: canonicalUrl,
      siteName: "Gulf Estates",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: titleText,
        },
      ],
      locale: locale === "en" ? "en_US" : locale === "fr" ? "fr_FR" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descriptionText,
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const property: any = await fetchProperty(id, locale);

  if (!property) {
    const newSlug = await fetchPropertyRedirect(id, locale);
    if (newSlug) {
      permanentRedirect(`/${locale}/properties/${newSlug}`);
    }
  }

  // Get SEO schema from property based on locale
  const getLocalizedSchema = (schema: any): string | null => {
    if (!schema) return null;
    if (typeof schema === "string") return schema; // Backward compatibility
    if (typeof schema === "object") {
      return schema[locale as keyof typeof schema] || schema.en || null;
    }
    return null;
  };
  
  const seoSchema = getLocalizedSchema(property?.seo?.schema);

  return (
    <>
      {/* JSON-LD Schema from SEO */}
      {seoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seoSchema }}
        />
      )}
      <PropertyDetailPage />
    </>
  );
}
