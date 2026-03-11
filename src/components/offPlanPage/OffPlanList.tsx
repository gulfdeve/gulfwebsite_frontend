"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import SortFilter from "../../components/common/SortFilter";
import FeaturedOffPlanCard from "../common/FeaturedOffPlanCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { getSlug, getLocalizedValue } from "@/utils/localization";

export interface OffPlanProperty {
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
  images?: string[];
}

interface OffPlanListProps {
  searchFilters?: {
    searchQuery?: string;
    location?: string;
    developer?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    handoverDate?: string;
  };
}

export default function OffPlanList({ searchFilters }: OffPlanListProps) {
  const { t } = useTranslation("off-plan");
  const params = useParams() as { locale?: string };
  const locale = params?.locale || "en";

  const [properties, setProperties] = useState<OffPlanProperty[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const itemsPerPage = 6;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilters]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchFilters) {
          if (searchFilters.location)
            queryParams.append("location", searchFilters.location);
          if (searchFilters.developer)
            queryParams.append("developer", searchFilters.developer);
          if (searchFilters.type)
            queryParams.append("type", searchFilters.type);
          if (searchFilters.handoverDate)
            queryParams.append("handover", searchFilters.handoverDate);
          if (searchFilters.minPrice)
            queryParams.append("minPrice", searchFilters.minPrice);
          if (searchFilters.maxPrice)
            queryParams.append("maxPrice", searchFilters.maxPrice);
          if (searchFilters.searchQuery)
            queryParams.append("title", searchFilters.searchQuery);
          if (searchFilters.bedrooms)
            queryParams.append("bedrooms", searchFilters.bedrooms);
        }

        const backendUrl = process.env.NEXT_PUBLIC_API_URL;
        queryParams.append("locale", locale);
        queryParams.append("limit", String(itemsPerPage));
        queryParams.append("page", String(currentPage));
        queryParams.append("excludeContent", "true");
        const url = `${backendUrl}/api/offplans?${queryParams.toString()}`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch offplan data");

        const data = await res.json();
        console.log("📦 Offplan API Response:", data);

        // Handle response structure: data.data contains the array of offplans
        const rawProperties = data?.data || [];
        console.log(
          `✅ Received ${rawProperties.length} offplans from API for page ${currentPage}`
        );

        // Extract pagination metadata from API response
        if (data?.pagination) {
          setTotalPages(data.pagination.totalPages || 1);
        } else if (data?.totalPages) {
          // Fallback for different response structure
          setTotalPages(data.totalPages);
        }

        // Transform multilingual objects to strings based on locale
        const transformedProperties = rawProperties.map((property: any) => {
          // Extract slug based on locale
          const slugValue = getSlug(property.slug, locale, property._id);

          return {
            ...property,
            slug: slugValue,
            title: getLocalizedValue(property.title, locale, ""),
            location: getLocalizedValue(property.location, locale, ""),
            developer: property.developer || "",
            type: property.type || "",
            handover: property.handover || "",
            priceFrom: property.starting_price
              ? String(property.starting_price)
              : property.priceFrom
              ? String(property.priceFrom)
              : "",
            paymentPlan: property.payment_plan || property.paymentPlan || "",
            bedRange: property.bedroom || property.bedRange || "",
            bathRange: property.bathroom || property.bathRange || "",
            sizeRange: property.area_size || property.sizeRange || "",
            image: property.gallery?.[0] || property.image || "",
            images: property.gallery || property.images || [],
          };
        });
        setProperties(transformedProperties);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [locale, searchFilters, currentPage]); // Added currentPage to dependencies

  // Memoize sorted list to avoid re-sorting on every render
  const sortedProperties = useMemo(() => {
    return [...properties].sort((a, b) => {
      const priceA = parseInt(a.priceFrom?.replace(/\D/g, "") || "0");
      const priceB = parseInt(b.priceFrom?.replace(/\D/g, "") || "0");

      if (sortOption === "lowestPrice") return priceA - priceB;
      if (sortOption === "highestPrice") return priceB - priceA;

      if (sortOption === "newest") {
        return new Date(b.handover).getTime() - new Date(a.handover).getTime();
      }

      if (sortOption === "oldest") {
        return new Date(a.handover).getTime() - new Date(b.handover).getTime();
      }

      return 0;
    });
  }, [properties, sortOption]);

  const pagesToShow = useMemo(() => {
    if (isMobile && totalPages > 3) {
      const start = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
      return [start, start + 1, start + 2].filter((p) => p <= totalPages);
    }
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages, currentPage, isMobile]);

  const handlePageClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const p = Number((e.currentTarget as HTMLButtonElement).getAttribute("data-page"));
    if (p) setCurrentPage(p);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // 🧱 Error block (modern 404 style)
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center text-center min-h-[70vh] px-4 max-w-3xl mx-auto">
        <Image
          src="/images/404.svg"
          alt="Not Found"
          width={250}
          height={250}
          className="mb-6 w-48 sm:w-64 h-auto"
        />
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("offPlanList.errorTitle") || "Something went wrong"}
        </h2>
        <p className="text-base text-gray-500 mb-6 max-w-md">
          {t("offPlanList.errorMessage") ||
            "We couldn’t load the page or property list you’re looking for."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {t("offPlanList.retry") || "Reload Page"}
          </button>
          <Link
            href={`/${locale}`}
            className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
          >
            {t("offPlanList.goHome") || "Go Home"}
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-4 mb-10">
        <div className="relative flex xl:flex-row flex-col-reverse gap-4 max-w-[1500px] mx-auto mb-10">
          <div className="relative z-10 w-full">
            {isMobile ? (
              // 📱 MOBILE → SWIPER HORIZONTAL SCROLL SKELETON
              <div className="flex gap-3 overflow-hidden">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg w-[92%] shrink-0 overflow-hidden border border-gray-200 shadow-lg animate-pulse"
                  >
                    {/* Price and Type Section */}
                    <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                      <div className="h-6 bg-gray-300 rounded w-24"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                    {/* Image Section */}
                    <div className="px-3">
                      <div className="h-56 bg-gray-300 rounded-xl"></div>
                    </div>
                    {/* Icons & Stats Section */}
                    <div className="px-5 py-3 flex items-center gap-4">
                      <div className="h-4 bg-gray-300 rounded w-12"></div>
                      <div className="h-4 bg-gray-300 rounded w-12"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                    {/* Title and Location */}
                    <div className="px-5 pb-3 space-y-2">
                      <div className="h-5 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                    {/* Developer */}
                    <div className="px-5 pb-3">
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    {/* Buttons */}
                    <div className="px-5 pb-5 flex gap-2">
                      <div className="h-9 bg-gray-300 rounded flex-1"></div>
                      <div className="h-9 bg-gray-300 rounded flex-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 🖥 DESKTOP → REGULAR GRID SKELETON
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg w-full overflow-hidden border border-gray-200 shadow-lg animate-pulse h-full flex flex-col"
                  >
                    {/* Price and Type Section */}
                    <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                      <div className="h-6 bg-gray-300 rounded w-24"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                    {/* Image Section */}
                    <div className="px-3">
                      <div className="h-56 sm:h-64 bg-gray-300 rounded-xl"></div>
                    </div>
                    {/* Icons & Stats Section */}
                    <div className="px-5 py-3 flex items-center gap-4 flex-wrap">
                      <div className="h-4 bg-gray-300 rounded w-12"></div>
                      <div className="h-4 bg-gray-300 rounded w-12"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                    {/* Title and Location */}
                    <div className="px-5 pb-3 space-y-2">
                      <div className="h-5 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                    {/* Developer */}
                    <div className="px-5 pb-3">
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    {/* Buttons */}
                    <div className="px-5 pb-5 mt-auto flex gap-2">
                      <div className="h-9 bg-gray-300 rounded flex-1"></div>
                      <div className="h-9 bg-gray-300 rounded flex-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* SortFilter Skeleton */}
          <div className="relative z-50 min-w-[200px]">
            <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-20 mb-4"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-10 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          {/* Background Images Skeleton (hidden on mobile) */}
          <div className="xl:block hidden absolute -top-16 -left-20 z-0 w-[300px] h-[300px] bg-gray-100 rounded-full opacity-20"></div>
          <div className="xl:block hidden absolute -bottom-16 right-20 z-0 w-[300px] h-[300px] bg-gray-100 rounded-full opacity-20"></div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-600 px-4 text-center max-w-xl mx-auto">
        <div className="text-5xl mb-4">🏠</div>
        <p className="text-xl mb-2">{t("offPlanList.noProperties")}</p>
        <p className="text-sm">{t("offPlanList.tryDifferentFilters")}</p>
      </div>
    );
  }

  return (
    <div className="px-4 mb-10">
      <div className="relative flex xl:flex-row flex-col-reverse gap-4 max-w-[1500px] mx-auto mb-10">
        <div className="relative z-10 w-full">
          {isMobile ? (
            // 📱 MOBILE → SWIPER HORIZONTAL SCROLL
            <Swiper
              key={sortOption + currentPage}
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
              spaceBetween={12}
              slidesPerView={1.08}
              loop={true}
              className="w-full"
            >
              {sortedProperties.map((property) => (
                <SwiperSlide key={property._id}>
                  <FeaturedOffPlanCard
                    {...property}
                    href={`/${locale}/off-plan/${
                      property.slug || property._id
                    }`}
                    locale={locale}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // 🖥 DESKTOP → REGULAR GRID
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProperties.map((property) => (
                <FeaturedOffPlanCard
                  key={property._id}
                  {...property}
                  minHeight="610px"
                  href={`/${locale}/off-plan/${property.slug || property._id}`}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
        <div className="relative z-10 min-w-[200px]">
          <SortFilter sortOption={sortOption} onSortChange={setSortOption} />
        </div>
        <Image
          src="/images/properties-dots-bg.svg"
          alt="properties dots background"
          width={1000}
          height={1000}
          className="xl:block hidden absolute -top-16 -left-20 z-0 w-[300px]"
        />
        <Image
          src="/images/properties-dots-bg.svg"
          alt="properties dots background"
          width={1000}
          height={1000}
          className="xl:block hidden absolute -bottom-16 right-20 z-0 w-[300px]"
        />
      </div>
      {/* Pagination - stable handlers to avoid re-renders */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center mt-8 gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`w-9 h-9 text-sm cursor-pointer rounded-lg border-2 border-gold transition flex items-center justify-center ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500"
                : "text-primary hover:bg-gold hover:text-white"
            }`}
            aria-label="Previous page"
          >
            ‹
          </button>

          {pagesToShow.map((page) => (
            <button
              key={page}
              data-page={page}
              onClick={handlePageClick}
              className={`w-9 h-9 text-sm cursor-pointer rounded-lg border-2 border-gold transition ${
                currentPage === page
                  ? "bg-gold text-white"
                  : "text-primary underline hover:bg-gold hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`w-9 h-9 text-sm cursor-pointer rounded-lg border-2 border-gold transition flex items-center justify-center ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500"
                : "text-primary hover:bg-gold hover:text-white"
            }`}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
