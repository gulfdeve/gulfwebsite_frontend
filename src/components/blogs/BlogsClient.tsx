"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { FaCheck } from "react-icons/fa";
import BlogCard from "../common/BlogCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { cleanHtmlForDisplay } from "@/utils/htmlCleaner";

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

type FilterKey = "latestarticles" | "mostviewed" | "justforyou";

interface BlogsClientProps {
    locale: string;
    blogs: Blog[];
    featuredBlog: Blog | null;
    currentPage: number;
    totalPages: number;
}

export default function BlogsClient({
    locale,
    blogs,
    featuredBlog,
    currentPage,
    totalPages,
}: BlogsClientProps) {
    const { t } = useTranslation("blogs");

    const [filters, setFilters] = React.useState<Record<FilterKey, boolean>>({
        latestarticles: false,
        mostviewed: false,
        justforyou: false,
    });

    const [isFilterActive, setIsFilterActive] = React.useState(false);
    const blogsPerPage = 4;

    const getLocalizedTitle = (blog: Blog) => {
        if (locale === "fr" && blog.languages?.fr?.title)
            return blog.languages.fr.title;
        if (locale === "es" && blog.languages?.es?.title)
            return blog.languages.es.title;
        return blog.title;
    };

    const getLocalizedExcerpt = (blog: Blog) => {
        if (locale === "fr" && blog.languages?.fr?.excerpt)
            return blog.languages.fr.excerpt;
        if (locale === "es" && blog.languages?.es?.excerpt)
            return blog.languages.es.excerpt;
        return blog.excerpt;
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; // Return original if invalid date
            }

            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const month = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();

            return `${month} ${day}, ${year}`;
        } catch (error) {
            return dateString; // Return original if error
        }
    };

    const applyFilters = () => {
        setIsFilterActive(true);
    };

    const removeFilters = () => {
        setFilters({
            latestarticles: false,
            mostviewed: false,
            justforyou: false,
        });
        setIsFilterActive(false);
    };

    const filteredBlogs = useMemo(() => {
        let result = [...blogs];

        if (filters.latestarticles) {
            result.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        }

        if (filters.mostviewed) {
            result.sort(() => Math.random() - 0.5);
        }

        if (filters.justforyou) {
            result = result.sort(() => Math.random() - 0.5).slice(0, 6);
        }

        return result;
    }, [blogs, filters]);

    const suggestedBlogs = blogs
        .filter((b) => b._id !== featuredBlog?._id)
        .slice(0, 6);

    const start = (currentPage - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const paginatedFiltered = filteredBlogs.slice(start, end);

    return (
        <div className="container mx-auto p-4 md:p-2 lg:px-8 text-gray-800 mt-10 sm:mt-0">
            <div className="flex flex-col-reverse lg:flex-row gap-4">
                {/* LEFT SIDE */}
                <div className="lg:w-[82%] w-full">
                    {!isFilterActive ? (
                        <>
                            {/* FEATURED BLOG */}
                            {featuredBlog && (
                                <div className="w-full flex md:flex-row flex-col gap-4 lg:gap-0 justify-between">
                                    <div className="lg:w-[62%] md:w-[70%] w-full relative">
                                        <h2 className="text-xl font-medium">
                                            {getLocalizedTitle(featuredBlog)}
                                        </h2>
                                        <p className="text-gray-500 mt-1">{formatDate(featuredBlog.date)}</p>
                                        <Image
                                            src="/images/bg-dots.png"
                                            width={130}
                                            height={200}
                                            alt="background"
                                            className="absolute translate-y-0.5 -right-5 z-0"
                                        />
                                        <Image
                                            src={featuredBlog.image || "/images/blogs/default.jpg"}
                                            alt={getLocalizedTitle(featuredBlog)}
                                            width={600}
                                            height={340}
                                            className="relative w-full h-[350px] object-cover rounded-xl mt-5 z-40"
                                        />

                                        <div className="mt-6 flex flex-col justify-center">
                                            <div
                                                className="text-gray-700"
                                                dangerouslySetInnerHTML={{
                                                    __html: cleanHtmlForDisplay(getLocalizedExcerpt(featuredBlog)),
                                                }}
                                            />
                                            <Link
                                                href={`/${locale}/blogs/${featuredBlog.slug}`}
                                                className="mt-4 inline-block px-4 text-sm mx-auto py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition"
                                            >
                                                {t("button")}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="md:w-px md:h-[600px] hidden md:block bg-gray-200" />
                                    {/* Featured Blogs */}
                                    <div className="lg:w-[30%] md:w-[32%] w-full">
                                        <h3 className="lg:text-lg font-medium">
                                            {t("interestedIn")}
                                        </h3>

                                        <div className="flex flex-col gap-5 lg:mt-4 mt-2">
                                            {suggestedBlogs.map((blog) => (
                                                <Link
                                                    key={blog._id}
                                                    href={`/${locale}/blogs/${blog.slug}`}
                                                    className="group flex xl:flex-row flex-col gap-3 items-start"
                                                >
                                                    <Image
                                                        src={blog.image}
                                                        alt={getLocalizedTitle(blog)}
                                                        width={128}
                                                        height={100}
                                                        className="xl:w-32 xl:min-w-32 w-full xl:max-w-40 h-28 xl:h-24 object-cover rounded-md shrink-0"
                                                    />

                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm line-clamp-3 leading-snug mb-1">{getLocalizedTitle(blog)}</p>
                                                        <p className="text-xs text-gray-500 mb-1">{formatDate(blog.date)}</p>
                                                        <p className="text-xs font-medium text-primary flex items-center">
                                                            {t("readMore")}
                                                            <span className="ml-1 inline-block transform transition-transform duration-300 group-hover:translate-x-1">
                                                                →
                                                            </span>
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:w-px md:h-[600px] hidden md:block bg-gray-200" />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-14 h-0.5 bg-black" />
                                <p className="text-xs uppercase tracking-widest font-bold">
                                    {t("filteredBlogs")}
                                </p>
                            </div>

                            {paginatedFiltered.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {paginatedFiltered.map((blog) => (
                                            <Link
                                                key={blog._id}
                                                href={`/${locale}/blogs/${blog.slug}`}
                                                className="block"
                                            >
                                                <Image
                                                    src={blog.image}
                                                    alt={getLocalizedTitle(blog)}
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-[210px] object-cover rounded-lg"
                                                />
                                                <p className="mt-3 font-semibold">
                                                    {getLocalizedTitle(blog)}
                                                </p>
                                                <p className="text-sm text-gray-500">{formatDate(blog.date)}</p>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex flex-wrap items-center justify-center mt-10 gap-1">
                                        <ArrowLeft width={18} height={18} color="#DEB66A" />

                                        {Array.from({
                                            length: Math.ceil(filteredBlogs.length / blogsPerPage),
                                        }).map((_, idx) => {
                                            const page = idx + 1;
                                            const params = new URLSearchParams();
                                            if (page !== 1) {
                                                params.set("page", page.toString());
                                            }
                                            const href = `/${locale}/blogs${params.toString() ? `?${params.toString()}` : ""}` as any;

                                            return (
                                                <Link
                                                    key={idx}
                                                    href={href}
                                                    className={`w-7 h-7 text-xs rounded-lg cursor-pointer flex items-center justify-center border ${currentPage === page
                                                        ? "bg-[#DEB66A] text-white"
                                                        : "text-black border border-[#DEB66A] transition hover:bg-[#DEB66A]/10"
                                                        }`}
                                                >
                                                    {page}
                                                </Link>
                                            );
                                        })}

                                        <ArrowRight width={18} height={18} color="#DEB66A" />
                                    </div>
                                </>
                            ) : (
                                <p>{t("noBlogsMatch")}</p>
                            )}
                        </>
                    )}
                </div>
                <div className="lg:w-[20%]">
                    <div>
                        <button className="md:px-6 px-2 bg-primary/80 text-center mb-4 border border-primary text-white/90 font-medium py-1.5 rounded-full w-28 md:w-auto cursor-pointer flex items-center md:gap-2 gap-1 md:text-base text-xs">
                            <span>{t("filters")}</span>
                            <Image
                                src="/icons/filter.svg"
                                width={20}
                                height={20}
                                alt="filters"
                            />
                        </button>
                        <div className="flex flex-row lg:flex-col gap-x-4 flex-wrap lg:gap-x-0">
                            {["latestarticles", "mostviewed", "justforyou"].map((key) => (
                                <label
                                    key={key}
                                    className="flex items-center gap-2 text-sm mb-3"
                                >
                                    <span className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer appearance-none w-4 h-4 border-2 rounded-sm cursor-pointer border-[#DEB66A] checked:bg-[#DEB66A] checked:border-[#DEB66A]"
                                            checked={filters[key as FilterKey]}
                                            onChange={(e) =>
                                                setFilters({ ...filters, [key]: e.target.checked })
                                            }
                                        />

                                        {/* Check Icon */}
                                        <FaCheck className="absolute left-[4px] top-[4px] text-white text-[9px] opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                    </span>

                                    {key === "latestarticles" && t("latestArticles")}
                                    {key === "mostviewed" && t("mostViewed")}
                                    {key === "justforyou" && t("justForYou")}
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3 max-w-[350px]">
                            <button
                                onClick={applyFilters}
                                className="w-full py-1 cursor-pointer border border-primary text-primary rounded-full text-sm hover:bg-primary hover:text-white transition"
                            >
                                {t("apply")}
                            </button>

                            <button
                                onClick={removeFilters}
                                className="w-full py-1 border border-primary text-primary cursor-pointer rounded-full text-sm hover:bg-primary hover:text-white transition"
                            >
                                {t("remove")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {!isFilterActive && (
                <>
                    <div className="inline-block">
                        <h3 className="text-primary text-2xl sm:text-3xl font-semibold mt-12">
                            {t("otherArticles")}
                        </h3>
                        <div className="underline-gradient h-px w-full" />
                    </div>

                    {/* MOBILE: Swiper slider */}
                    <div className="block lg:hidden mt-6">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                320: { slidesPerView: 1 },
                                440: { slidesPerView: 1.2 },
                                640: { slidesPerView: 2.2 },
                                1024: { slidesPerView: 3.2 },
                                1440: { slidesPerView: 4.2 },
                            }}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            grabCursor={true}
                        >
                            {blogs.map((blog) => (
                                <SwiperSlide key={blog._id}>
                                    <div className="h-full">
                                        <BlogCard
                                            title={getLocalizedTitle(blog)}
                                            slug={blog.slug}
                                            image={blog.image}
                                            locale={locale}
                                            date={blog.date}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* TABLET & DESKTOP GRID */}
                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="h-full rounded-sm">
                                <BlogCard
                                    title={getLocalizedTitle(blog)}
                                    slug={blog.slug}
                                    image={blog.image}
                                    locale={locale}
                                    date={blog.date}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap items-center justify-center mt-4 gap-1 mb-6 pb-2">
                            {currentPage > 1 ? (
                                <Link
                                    href={(`/${locale}/blogs${currentPage === 2 ? "" : `?page=${currentPage - 1}`}` as any)}
                                    className="flex items-center"
                                >
                                    <ArrowLeft width={18} height={18} color="#DEB66A" />
                                </Link>
                            ) : (
                                <div className="flex items-center opacity-50">
                                    <ArrowLeft width={18} height={18} color="#DEB66A" />
                                </div>
                            )}
                            {Array.from({ length: totalPages }, (_, i) => {
                                const page = i + 1;
                                const params = new URLSearchParams();
                                if (page !== 1) {
                                    params.set("page", page.toString());
                                }
                                const href: any = `/${locale}/blogs${params.toString() ? `?${params.toString()}` : ""}`;

                                return (
                                    <Link
                                        key={i}
                                        href={href}
                                        className={`w-7 h-7 text-xs rounded-lg cursor-pointer flex items-center justify-center border ${currentPage === page
                                            ? "bg-[#DEB66A] text-white"
                                            : "text-black border border-[#DEB66A] transition hover:bg-[#DEB66A]/10"
                                            }`}
                                    >
                                        {page}
                                    </Link>
                                );
                            })}
                            {currentPage < totalPages ? (
                                <Link
                                    href={(`/${locale}/blogs?page=${currentPage + 1}` as any)}
                                    className="flex items-center"
                                >
                                    <ArrowRight width={18} height={18} color="#DEB66A" />
                                </Link>
                            ) : (
                                <div className="flex items-center opacity-50">
                                    <ArrowRight width={18} height={18} color="#DEB66A" />
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

