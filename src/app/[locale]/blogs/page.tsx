"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import BlogsClient from "@/components/blogs/BlogsClient";
import BlogsPageSkeleton from "@/components/blogs/BlogsPageSkeleton";
import HeroSection2 from "@/components/common/HeroSection2";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  languages?: {
    fr?: { title?: string; excerpt?: string; content?: string };
    es?: { title?: string; excerpt?: string; content?: string };
  };
  slug: string;
  image: string;
  author: string;
  date: string;
  tags?: string[];
  featured?: boolean;
}

async function fetchBlogs(locale: string, page: number, limit: number) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  try {
    const res = await fetch(
      `${API_URL}/api/blogs?page=${page}&limit=${limit}&locale=${locale}&excludeContent=true`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data.success ? data.data : { items: [], totalPages: 1 };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { items: [], totalPages: 1 };
  }
}

async function fetchFeaturedBlog(locale: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    return null;
  }

  try {
    const res = await fetch(
      `${API_URL}/api/blogs/featured?locale=${locale}&excludeContent=true`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching featured blog:", error);
    return null;
  }
}

function BlogsPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { t } = useTranslation("blogs");
  const locale = params.locale as string;

  // Get current page from URL search params - this will update when URL changes
  const pageParam = searchParams.get("page");
  const currentPage = useMemo(() => {
    return pageParam ? parseInt(pageParam, 10) : 1;
  }, [pageParam]);

  const blogsPerPage = 4;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  // Fetch data from database when page or locale changes
  useEffect(() => {
    const loadData = async () => {
      if (!locale) return;

      setLoading(true);
      try {
        // Fetch blogs for current page from database
        const [blogsData, featuredData] = await Promise.all([
          fetchBlogs(locale, currentPage, blogsPerPage),
          fetchFeaturedBlog(locale),
        ]);

        setBlogs(blogsData.items || []);
        setTotalPages(blogsData.totalPages || 1);
        setFeaturedBlog(featuredData);

        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]);
        setTotalPages(1);
        setFeaturedBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [locale, currentPage, blogsPerPage]);

  // Fetch page content from API
  useEffect(() => {
    const fetchBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("blogs", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  // Title based on locale
  const titleMap: Record<string, string> = {
    en: "Blogs",
    fr: "Blogs",
    es: "Blogs",
  };
  const title = titleMap[locale] || "Blogs";

  if (loading || bannerLoading) {
    return <BlogsPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection2
        title={
          bannerData?.title || title
        }
        imageSrc={
          bannerData?.bannerType === "image" && bannerData?.bannerUrl
            ? bannerData.bannerUrl
            : "/images/blogs/bg-blog.png"
        }
      />
      {/* <div className="relative -mt-18 sm:h-18 bg-gradient-to-b from-[#2F4D5F] to-white z-20"></div> */}
      <BlogsClient
        locale={locale}
        blogs={blogs}
        featuredBlog={featuredBlog}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogsPageSkeleton />}>
      <BlogsPageContent />
    </Suspense>
  );
}
