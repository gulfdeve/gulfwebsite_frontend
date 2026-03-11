"use client";
import { useState, useEffect, useDeferredValue, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import SortFilter from "../common/SortFilter";
import { useTranslation } from "next-i18next";
import FeaturedOffPlanCard from "../common/FeaturedOffPlanCard";
import BuyRentPropertyCard from "../common/BuyRentPropertyCard";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { formatPrice as formatPriceUtil } from "@/utils/priceFormatter";
import { getSlug } from "@/utils/localization";
import PropertyGridSkeleton from "./PropertyGridSkeleton";

interface Property {
  _id: string;
  slug?: string | { en?: string; fr?: string; es?: string };
  title: any; // Changed to any to handle objects
  price: number;
  location: any; // Changed to any to handle objects
  type: string;
  beds: number;
  baths: number;
  size: number;
  image: string;
  for?: "buy" | "rent";
  rentDuration?: string;
  createdAt?: string;
  updatedAt?: string;
  agent?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

interface PropertyGridProps {
  initialProperties?: Property[];
  filters?: {
    for?: string;
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minBeds?: number;
    minBaths?: number;
  };
  purpose?: "buy" | "rent";
}

export default function PropertyGrid({
  initialProperties = [],
  filters = {},
  purpose,
}: PropertyGridProps) {
  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation("common");
  const locale = (params?.locale as string) || "en";
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const deferredSortOption = useDeferredValue(sortOption);
  const [loading, setLoading] = useState(!initialProperties.length);
  const limit = 9;

  const isBuyOrRent = purpose === "buy" || purpose === "rent";

  // Helper function to extract text from multilingual objects (stable ref to avoid child re-renders)
  const extractText = useCallback((data: any): string => {
    if (typeof data === "string") return data;

    if (data && typeof data === "object") {
      if (data.text && typeof data.text === "string") return data.text;
      if (data.en && typeof data.en === "string") return data.en;
      if (data[locale] && typeof data[locale] === "string") return data[locale];
      for (const key in data) {
        if (typeof data[key] === "string") return data[key];
      }
      return "";
    }
    return String(data || "");
  }, [locale]);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);

  // Fetch properties with page and limit (calls API on page/limit/filters change)
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("locale", locale);
        queryParams.set("page", String(currentPage));
        queryParams.set("limit", String(limit));
        queryParams.set("excludeContent", "true");

        if (purpose) queryParams.set("for", purpose);

        Object.entries(filters).forEach(([key, value]) => {
          if (
            key !== "for" &&
            value !== "" &&
            value != null &&
            value !== 0
          ) {
            queryParams.append(key, String(value));
          }
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties?${queryParams}`
        );

        if (!res.ok) throw new Error("Failed to fetch properties");

        const json = await res.json();
        if (json.success && json.data) {
          const items = json.data.items || [];
          const transformedProperties = items.map((property: Property) => {
            const slugValue = getSlug(property.slug, locale, property._id);
            return { ...property, slug: slugValue };
          });
          setProperties(transformedProperties);
          setTotalPages(json.data.totalPages ?? 1);
        } else {
          setProperties([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, purpose, locale, currentPage, limit]);

  // Apply sorting to current page items (deferred for responsive INP)
  const visibleProperties = useMemo(() => {
    return [...properties].sort((a, b) => {
    switch (deferredSortOption) {
      case "lowestPrice":
        return a.price - b.price;
      case "highestPrice":
        return b.price - a.price;
      case "newestFirst":
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      case "mostBedroom":
        return b.beds - a.beds;
      case "leastBedroom":
        return a.beds - b.beds;
      case "default":
      default:
        return 0;
    }
  });
  }, [properties, deferredSortOption]);

  // Format price - stable callback to avoid unnecessary re-renders
  const formatPrice = useCallback((price: number, propertyFor?: string, rentDuration?: string) => {
    const formatted = formatPriceUtil(price.toString());
    const propertyType = purpose || filters?.for || propertyFor;
    return propertyType === "rent"
      ? `${formatted}/${rentDuration || "Year"}`
      : formatted;
  }, [purpose, filters?.for]);

  const handlePageClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const p = Number((e.currentTarget as HTMLButtonElement).getAttribute("data-page"));
    if (p) setCurrentPage(p);
  }, []);

  if (loading) {
    return (
      <section className="px-4 my-6">
        <PropertyGridSkeleton />
      </section>
    );
  }

  return (
    <section className="px-4 my-6">
      <div className="xl:pl-10 relative flex xl:flex-row flex-col-reverse items-start gap-4 max-w-[1500px] mx-auto mb-10">
        {/* Mobile Swiper (<640px) */}
        <div className="block sm:hidden w-full">
          <Swiper
            key={currentPage + deferredSortOption}
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            slidesPerView={1.1}
            spaceBetween={12}
            loop={true}
          >
            {visibleProperties.map((property) => {
              const propertyTitle =
                extractText(property.title) || "Property Title";
              const propertyLocation =
                extractText(property.location) || "Location not specified";

              return (
                <SwiperSlide key={property._id}>
                  {isBuyOrRent ? (
                    <BuyRentPropertyCard
                      _id={property._id}
                      priceFrom={formatPrice(
                        property.price,
                        property.for,
                        property.rentDuration
                      )}
                      title={propertyTitle}
                      location={propertyLocation}
                      type={property.type}
                      bedRange={String(property.beds)}
                      bathRange={String(property.baths)}
                      sizeRange={
                        typeof property.size === "string"
                          ? property.size
                          : property.size?.toLocaleString?.()
                      }
                      image={property.image}
                      href={`/${locale}/properties/${property.slug || property._id}`}
                      OfferingType={
                        property?.for === "rent" ? "For Rent" : "For Sale"
                      }
                    />
                  ) : (
                    <FeaturedOffPlanCard
                      _id={property._id}
                      priceFrom={formatPrice(
                        property.price,
                        property.for,
                        property.rentDuration
                      )}
                      title={propertyTitle}
                      location={propertyLocation}
                      type={property.type}
                      bedRange={String(property.beds)}
                      bathRange={String(property.baths)}
                      sizeRange={
                        typeof property.size === "string"
                          ? property.size
                          : property.size?.toLocaleString?.()
                      }
                      image={property.image}
                      href={`/${locale}/properties/${property.slug || property._id}`}
                      locale={locale}
                      OfferingType={
                        property?.for === "rent" ? "For Rent" : "For Sale"
                      }
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Desktop Grid (>=640px) */}
        <div className="hidden sm:grid z-10 gap-6 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProperties.map((property) => {
            const propertyTitle =
              extractText(property.title) || "Property Title";
            const propertyLocation =
              extractText(property.location) || "Location not specified";

            return (
              isBuyOrRent ? (
                <BuyRentPropertyCard
                  key={property._id}
                  _id={property._id}
                  priceFrom={formatPrice(
                    property.price,
                    property.for,
                    property.rentDuration
                  )}
                  title={propertyTitle}
                  location={propertyLocation}
                  type={property.type}
                  bedRange={String(property.beds)}
                  bathRange={String(property.baths)}
                  sizeRange={
                    typeof property.size === "string"
                      ? property.size
                      : property.size?.toLocaleString?.()
                  }
                  image={property.image}
                  href={`/${locale}/properties/${property.slug || property._id}`}
                  OfferingType={
                    property?.for === "rent" ? "For Rent" : "For Sale"
                  }
                />
              ) : (
                <FeaturedOffPlanCard
                  key={property._id}
                  _id={property._id}
                  priceFrom={formatPrice(
                    property.price,
                    property.for,
                    property.rentDuration
                  )}
                  title={propertyTitle}
                  location={propertyLocation}
                  type={property.type}
                  bedRange={String(property.beds)}
                  bathRange={String(property.baths)}
                  sizeRange={
                    typeof property.size === "string"
                      ? property.size
                      : property.size?.toLocaleString?.()
                  }
                  image={property.image}
                  href={`/${locale}/properties/${property.slug || property._id}`}
                  locale={locale}
                  OfferingType={
                    property?.for === "rent" ? "For Rent" : "For Sale"
                  }
                />
              )
            );
          })}
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

      {/* Property Grid */}

      {/* No Properties Message */}
      {properties.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">
            {purpose
              ? t(
                "noPropertiesForPurpose",
                `No properties found matching your criteria.`
              )
              : t(
                "noProperties",
                "No properties found matching your criteria."
              )}
          </p>
        </div>
      )}

      {/* Pagination - single stable handler to avoid re-creating callbacks per page */}
      {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                data-page={page}
                onClick={handlePageClick}
                disabled={loading}
                className={`w-9 h-9 text-sm cursor-pointer rounded-lg border-2 border-gold transition ${currentPage === page
                  ? "bg-gold text-white"
                  : "text-primary underline hover:bg-gold hover:text-white"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
      )}
    </section>
  );
}
