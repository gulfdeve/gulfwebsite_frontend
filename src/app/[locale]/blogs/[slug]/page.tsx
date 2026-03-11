import BlogDetailsClient from "./BlogDetailsClient";
import type { Metadata } from "next";
import Script from "next/script";

interface Blog {
  _id: string;
  title: string;
  languages?: {
    fr?: string;
    es?: string;
  };
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags?: string[];
  image?: string;
  seo?: {
    title?: string;
    description?: string;
    schema?: {
      en?: string;
      fr?: string;
      es?: string;
    };
  };
  createdAt?: string;
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.data || null;
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return {
      title: "Blog Post - Gulf Estates",
      description: "Blog post not found.",
    };
  }

  // Get localized title based on locale
  const localizedTitle =
    locale === "fr"
      ? blog.languages?.fr
      : locale === "es"
      ? blog.languages?.es
      : blog.title;

  const baseTitle = localizedTitle || blog.title;
  const seoTitle = blog.seo?.title || baseTitle;
  const seoDescription = blog.seo?.description || blog.excerpt || baseTitle;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gulfestates.ae";
  const canonicalUrl = `${baseUrl}/${locale}/blogs/${slug}`;
  const imageUrl =
    blog?.image && blog?.image?.startsWith("http")
      ? blog.image
      : `${baseUrl}/images/banner-image.webp`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: "Gulf Estates",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: baseTitle,
        },
      ],
      locale: locale === "en" ? "en_US" : locale === "fr" ? "fr_FR" : "es_ES",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const blog = await fetchBlog(slug);
  
  // Get SEO schema from blog based on locale
  const getLocalizedSchema = (schema: any): string | null => {
    if (!schema) return null;
    if (typeof schema === "string") return schema; // Backward compatibility
    if (typeof schema === "object") {
      return schema[locale as keyof typeof schema] || schema.en || null;
    }
    return null;
  };
  
  const seoSchema = getLocalizedSchema(blog?.seo?.schema);

  return (
    <>
      {/* JSON-LD Schema from SEO */}
      {seoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seoSchema }}
        />
      )}
      <BlogDetailsClient slug={slug as string} locale={locale} />
    </>
  );
}
