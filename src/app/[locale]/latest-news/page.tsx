"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogCard from "@/components/common/BlogCard";
import { useParams } from "next/navigation";
import Link from "next/link";
import FeaturedOffPlanCard from "@/components/common/FeaturedOffPlanCard";
import SubscribeNewsLetters from "@/components/layout/SubscribeNewsLetters";
import { getSlug } from "@/utils/localization";

interface OffPlanProperty {
  _id: string;
  slug?: string | { en?: string; fr?: string; es?: string };
  title: string;
  location: string;
  developer: string;
  type: string;
  handover: string;
  priceFrom: string;
  paymentPlan: string;
  bedRange?: string;
  bathRange?: string;
  sizeRange?: string;
  image: string;
}

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
  languages?: {
    fr?: { title?: string; excerpt?: string };
    es?: { title?: string; excerpt?: string };
  };
}

function LatestNews() {
  const { locale } = useParams();
  const currentLocale = Array.isArray(locale) ? locale[0] : locale;

  const API = process.env.NEXT_PUBLIC_API_URL;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [offplans, setOffplans] = useState<OffPlanProperty[]>([]);

  const getLocalizedTitle = (blog: Blog) => {
    if (locale === "fr" && blog.languages?.fr?.title)
      return blog.languages.fr.title;
    if (locale === "es" && blog.languages?.es?.title)
      return blog.languages.es.title;
    return blog.title;
  };

  const fetchOffplans = async () => {
    try {
        const res = await fetch(
          `${API}/api/offplans?page=1&limit=3&locale=${locale}&excludeContent=true`
        );
      const data = await res.json();

      if (data.success) {
        const rawOffplans = data.data.items || data.data || [];
        // Transform offplans to include slug
        const transformedOffplans = rawOffplans.map(
          (property: OffPlanProperty) => ({
            ...property,
            slug: getSlug(
              property.slug,
              currentLocale || "en",
              property._id || ""
            ),
          })
        );
        setOffplans(transformedOffplans);
      }
    } catch (err) {
      console.log("Error fetching offplans:", err);
    }
  };

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API}/api/blogs?page=1&limit=8&locale=${locale}&excludeContent=true`
        );
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data.items);
        }
      } catch (err) {
        console.log("Error fetching latest blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
    fetchOffplans();
  }, [locale]);

  return (
    <div className="min-h-screen bg-white text-[#606060] overflow-hidden pb-2">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[330px] overflow-hidden">
          <Image
            src="/images/blogs/bg-blog.png"
            fill
            alt="background"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute mx-auto md:w-[1300px] inset-0 flex items-center z-10">
          <h1 className="text-gold text-xl sm:text-2xl font-medium ml-[4%]">
            Latest News
          </h1>
        </div>
      </section>

      <div className="relative -mt-18 h-18 bg-gradient-to-b from-[#2F4D5F] to-white z-20"></div>

      {/* latest articles */}
      <div className="px-8">
        <div className="inline-block">
          <h6 className="uppercase text-2xl text-primary font-semibold">
            Discover our latest articles
          </h6>
          <div className="underline-gradient h-px w-full" />
        </div>

        {loading ? (
          <p className="mt-6">Loading articles...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {blogs.map((blog) => (
              <BlogCard
                title={blog.title}
                slug="/${locale}/blogs/${blog.slug}"
                image={blog.image}
                locale={getLocalizedTitle(blog)}
                date={blog.date}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center pt-6">
        <Link
          href={`/${locale}/blogs`}
          className="rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors duration-300 px-3 py-1"
        >
          Discover our Blogs Page
        </Link>
      </div>
      <div className="px-8 mt-6">
        <div className="inline-block">
          <h6 className="uppercase text-2xl text-primary font-semibold">
            Explore our hot selling properties
          </h6>
          <div className="underline-gradient h-px w-full" />
        </div>
        {offplans.length === 0 ? (
          <p>Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 max-w-[1100px] mx-auto">
            {offplans.map((property) => (
              <FeaturedOffPlanCard
                key={property._id}
                _id={property._id}
                title={property.title}
                location={property.location}
                developer={property.developer}
                type={property.type}
                handover={property.handover}
                priceFrom={property.priceFrom}
                paymentPlan={property.paymentPlan}
                bedRange={property.bedRange}
                bathRange={property.bathRange}
                sizeRange={property.sizeRange}
                image={property.image}
                href={`/${locale}/off-plan-properties-uae/${property.slug || property._id}`}
                locale={currentLocale}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center pt-6">
          <Link
            href={`/${locale}/off-plan-properties-uae`}
            className="rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors duration-300 px-3 py-1"
          >
            Discover our Off Plan Properties
          </Link>
        </div>
      </div>
      <SubscribeNewsLetters />
    </div>
  );
}

export default LatestNews;
