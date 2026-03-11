"use client";
import { Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import CommentForm from "@/components/blogs/CommentForm";
import CommentsList from "@/components/blogs/CommentsList";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import BlogDetailsSkeleton from "@/components/blogs/BlogDetailsSkeleton";
import HeroSection2 from "@/components/common/HeroSection2";
import { sanitizeBlogContent } from "@/utils/htmlCleaner";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  languages?: {
    fr?: {
      title?: string;
      excerpt?: string;
      content?: string;
    };
    es?: {
      title?: string;
      excerpt?: string;
      content?: string;
    };
  };
  slug: string;
  image: string;
  author: string;
  date: string;
  tags?: string[];
}

interface BlogDetailsClientProps {
  slug: string;
  locale: string;
}

export default function BlogDetailsClient({
  slug,
  locale,
}: BlogDetailsClientProps) {
  const { t } = useTranslation("blogs");
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`
        );
        const data = await res.json();

        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Get localized data based on locale
  const getLocalizedData = () => {
    if (!blog) return { title: "", excerpt: "", content: "" };

    if (locale === "fr" && blog.languages?.fr) {
      return {
        title: blog.languages.fr.title || blog.title,
        excerpt: blog.languages.fr.excerpt || blog.excerpt,
        content: blog.languages.fr.content || blog.content,
      };
    }

    if (locale === "es" && blog.languages?.es) {
      return {
        title: blog.languages.es.title || blog.title,
        excerpt: blog.languages.es.excerpt || blog.excerpt,
        content: blog.languages.es.content || blog.content,
      };
    }

    // Default to English
    return {
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
    };
  };

  // Function to format date as "5 dec 2024" with time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Function to format the content with perfect styling
  const formatContent = (content: string) => {
    let formattedContent = content
      // Headings with perfect alignment and spacing
      .replace(
        /<h1>/g,
        '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900">'
      )
      .replace(/<\/h1>/g, "</h1>")
      .replace(
        /<h2>/g,
        '<h2 class="text-2xl font-semibold mt-6 mb-3 text-gray-800">'
      )
      .replace(/<\/h2>/g, "</h2>")
      .replace(
        /<h3>/g,
        '<h3 class="text-xl font-medium mt-5 mb-2 text-gray-700">'
      )
      .replace(/<\/h3>/g, "</h3>")
      .replace(
        /<h4>/g,
        '<h4 class="text-lg font-medium mt-4 mb-2 text-gray-700">'
      )
      .replace(/<\/h4>/g, "</h4>")
      .replace(
        /<h5>/g,
        '<h5 class="text-base font-medium mt-3 mb-1 text-gray-700">'
      )
      .replace(/<\/h5>/g, "</h5>")
      .replace(
        /<h6>/g,
        '<h6 class="text-sm font-medium mt-2 mb-1 text-gray-600">'
      )
      .replace(/<\/h6>/g, "</h6>")

      // Paragraphs with perfect readability
      .replace(/<p>/g, '<p class="text-gray-700 leading-7 mb-4 text-base">')
      .replace(/<\/p>/g, "</p>")

      // Lists with proper spacing
      .replace(
        /<ul>/g,
        '<ul class="list-disc list-inside mb-4 space-y-1 text-gray-700">'
      )
      .replace(
        /<ol>/g,
        '<ol class="list-decimal list-inside mb-4 space-y-1 text-gray-700">'
      )
      .replace(/<li>/g, '<li class="leading-6">')
      .replace(/<\/li>/g, "</li>")

      // Blockquotes with elegant styling
      .replace(
        /<blockquote>/g,
        '<blockquote class="border-l-4 border-[#024959] bg-gray-50 pl-4 py-2 mb-4 italic text-gray-600">'
      )
      .replace(/<\/blockquote>/g, "</blockquote>")

      // Links with proper styling
      .replace(
        /<a/g,
        '<a class="text-[#024959] hover:text-[#036881] underline font-medium"'
      )

      // Strong and emphasis
      .replace(/<strong>/g, '<strong class="font-semibold text-gray-900">')
      .replace(/<em>/g, '<em class="italic text-gray-800">');

    return formattedContent;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || "",
        text: blog?.excerpt || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return <BlogDetailsSkeleton />;
  }

  if (!blog) {
    return (
      <div className="h-[600px] flex items-center justify-center flex-col container mx-auto px-4 py-16 text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">
          {t("detailsPage.notFound")}
        </h2>
        <Link
          href="/blogs"
          className="text-[#024959] hover:underline font-medium"
        >
          {t("detailsPage.backToBlogs")}
        </Link>
      </div>
    );
  }

  const localizedData = getLocalizedData();
  // Sanitize content to prevent XSS attacks
  const sanitizedContent = sanitizeBlogContent(localizedData.content);

  return (
    <main className="bg-white text-black">
      <HeroSection2
        title={t("title", "Blogs")}
        imageSrc="/images/blogs/bg-blog.png"
      />
      <div className="container mx-auto px-4 md:px-10">
        {/* Blog Content */}
        <div className="flex flex-col gap-6 mt-12 mb-6 sm:mt-3 sm:mb-3 max-w-4xl mx-auto w-full">
          <div className="space-y-4 w-full">
            <h2 className="text-2xl font-medium wrap-break-word">
              {localizedData.title}
            </h2>
            <p className="text-[#999999] text-sm">{formatDate(blog.date)}</p>
            <div className="relative w-full h-[250px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/bg-dots.png"
                width={200}
                height={200}
                alt="background image"
                className="absolute right-[-40px] top-[-35px]"
              />
              <Image
                src={blog.image || "/images/blogs/default.jpg"}
                alt={localizedData.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="mt-4 w-full">
              {/* Excerpt */}
              <p className="text-gray-700 leading-6 mt-4 text-base break-words">
                {localizedData.excerpt}
              </p>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 w-full">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer wrap-break-word"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Blog Content */}
            <article
              className="text-gray-700 leading-relaxed space-y-4 [&_p]:mb-4 [&_p]:text-base [&_strong]:font-semibold [&_strong]:text-gray-900 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-4 [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <CommentsList blogId={blog._id} />
          <CommentForm blog={blog._id} />
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <RelatedBlogs currentSlug={slug} />
        </div>
      </div>
    </main>
  );
}
