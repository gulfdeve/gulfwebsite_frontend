"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "../common/BlogCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Blog {
  id?: string;
  _id?: string;
  image: string;
  title: string;
  languages?: {
    fr?: { title?: string; excerpt?: string; content?: string };
    es?: { title?: string; excerpt?: string; content?: string };
  };
  excerpt?: string;
  date: string;
  slug: string;
}

const RelatedBlogs: React.FC<{ currentSlug: string }> = ({ currentSlug }) => {
  const { locale } = useParams();
  const { t } = useTranslation("blogs");
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const blogsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getLocalizedTitle = (blog: Blog) => {
    if (locale === "fr" && blog.languages?.fr?.title)
      return blog.languages.fr.title;
    if (locale === "es" && blog.languages?.es?.title)
      return blog.languages.es.title;
    return blog.title;
  };

  useEffect(() => {
    if (currentSlug) {
      setCurrentPage(1);
      fetchRelatedBlogs();
    }
  }, [currentSlug, locale]);

  const fetchRelatedBlogs = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/blogs?locale=${locale}&limit=5&excludeContent=true`);
      const result = await response.json();

      if (result.success && Array.isArray(result.data.items)) {
        const blogsWithId = result.data.items.map((blog: any) => ({
          ...blog,
          id: blog._id,
        }));

        // remove current blog
        const filtered = blogsWithId.filter((b: any) => b.slug !== currentSlug);

        setRelatedBlogs(filtered);
      } else {
        setRelatedBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching related blogs:", error);
      setRelatedBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // pagination calculations
  const totalPages = Math.ceil(relatedBlogs.length / blogsPerPage);
  const start = (currentPage - 1) * blogsPerPage;
  const end = start + blogsPerPage;
  const currentBlogs = relatedBlogs.slice(start, end);

  if (loading) {
    return (
      <section className="w-full py-16">
        <div className="mx-auto">
          <h2 className="sm:text-3xl text-lg font-medium mb-4 sm:mb-8 md:mb-12">
            <span className="text-primary border-b border-[#DEB66A]">
              {t("youMayAlsoLike")}
            </span>{" "}
            <span className="text-[#DEB66A]">{t("like")}</span>
          </h2>
          <div className="text-center">{t("loadingRelatedBlogs")}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mb-5 lg:pt-16 max-w-[1300px] mx-auto">
      <div className="mx-auto">
        <h2 className="sm:text-3xl text-lg font-medium mb-4 sm:mb-8 md:mb-12">
          <span className="text-primary border-b border-[#DEB66A]">
            {t("youMayAlsoLike")}
          </span>{" "}
          <span className="text-[#DEB66A]">{t("like")}</span>
        </h2>

        {/* blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <BlogCard
                locale={locale as string}
                key={blog.id || blog._id}
                slug={blog.slug}
                date={blog.date}
                image={blog.image}
                title={getLocalizedTitle(blog)}
                readTime="5 minutes"
              />
            ))
          ) : (
            <p className="text-center text-gray-500">{t("noRelatedBlogs")}</p>
          )}
        </div>

        {/* pagination (same style as Blogs.tsx) */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center my-10 gap-1 mb-10 pb-12">
            <ArrowLeft width={18} height={18} color="#DEB66A" />

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 text-xs rounded-lg cursor-pointer flex items-center justify-center border ${currentPage === i + 1
                  ? "bg-[#DEB66A] text-white"
                  : "text-black border border-[#DEB66A] transition"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <ArrowRight width={18} height={18} color="#DEB66A" />
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedBlogs;
