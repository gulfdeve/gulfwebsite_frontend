"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BlogCard from "@/components/common/BlogCard";
import BlogSectionSkeleton from "./BlogSectionSkeleton";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  date: string;
  image: string;
  excerpt?: string;
  readTime?: string;
}

const BlogSection = () => {
  const { t: tHome } = useTranslation("home");
  const { t: tBlogs } = useTranslation("blogs");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${API_URL}/api/blogs?page=1&limit=7&locale=${locale}&excludeContent=true`
        );

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();
        if (data.success && data.data?.items) {
          const formattedBlogs = data.data.items.map((blog: any) => ({
            _id: blog._id,
            title: blog.title,
            slug: blog.slug || blog._id,
            date: blog.date || blog.createdAt || new Date().toISOString(),
            image: blog.image || "/images/blogs/default.jpg",
            excerpt: blog.excerpt,
            readTime:
              blog.readTime ||
              blog.read_time ||
              blog.readingTime ||
              blog.reading_time ||
              "5 min to read",
          }));
          setBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [locale]);

  if (loading) return <BlogSectionSkeleton />;

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-10 text-black">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-xl lg:text-2xl text-primary font-semibold text-center md:text-left">
            {tHome("blogs.title", "Dubai Real Estate News, Insights & Market Trends")}
            <div className="max-w-[1050px] mx-auto underline-gradient" />
          </h2>
          <div className="hidden md:flex items-center gap-3">
            <button
              className="blogs-prev bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous blog"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="blogs-next bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next blog"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            0: { slidesPerView: 1 },
            320: { slidesPerView: 1 },
            440: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          navigation={{ prevEl: ".blogs-prev", nextEl: ".blogs-next" }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={blogs.length > 3}
          className="w-full h-full"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id} style={{ height: "auto" }}>
              <div className="h-full flex">
                <BlogCard
                  title={blog.title}
                  slug={blog.slug}
                  image={blog.image}
                  locale={locale}
                  date={blog.date}
                  readTime={blog.readTime}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden max-md:flex items-center justify-end gap-3 mt-6">
          <button
            className="blogs-prev bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous blog"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="blogs-next bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next blog"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
