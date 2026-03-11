"use client";
import {
  useEffect,
  useState,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { useSearchParams, useParams } from "next/navigation";
import SearchBox from "@/components/common/SearchBox";
import SortFilter from "@/components/common/SortFilter";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import FeaturedOffPlanCard from "@/components/common/FeaturedOffPlanCard";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import HeroSection2 from "@/components/common/HeroSection2";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";
import PropertiesPageSkeleton from "@/components/properties/PropertiesPageSkeleton";
import PropertyGridSkeleton from "@/components/rent/PropertyGridSkeleton";
import { formatPrice as formatPriceUtil } from "@/utils/priceFormatter";
import { validateLocale, buildSafeQueryString, sanitizeQueryValue, isValidQueryKey, buildSafeUrl } from "@/utils/routeSecurity";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import { getSlug } from "@/utils/localization";

// Enhanced search parameter validation
const validateSearchParam = (key: string, value: string | null): string | null => {
  if (!value) return null;
  
  // Whitelist allowed keys (properties API: type, for, location, minPrice, maxPrice, minBeds, minBaths, title)
  const allowedKeys = ['type', 'for', 'location', 'minPrice', 'maxPrice', 'page', 'limit', 'handoverDate', 'minBeds', 'maxBeds', 'minBaths', 'maxBaths', 'bedrooms', 'lifestyle', 'title', 'propertyRange', 'priceRange', 'offeringType', 'area', 'handover'];
  if (!allowedKeys.includes(key)) return null;
  
  // Validate based on key type
  if (key === 'page') {
    const page = parseInt(value, 10);
    return (page > 0 && page < 1000 && !isNaN(page)) ? String(page) : null;
  }
  
  if (key === 'limit') {
    const limit = parseInt(value, 10);
    return (limit > 0 && limit <= 100 && !isNaN(limit)) ? String(limit) : null;
  }
  
  if (key === 'minPrice' || key === 'maxPrice') {
    const price = parseFloat(value);
    return (price >= 0 && price < 1e10 && !isNaN(price)) ? String(price) : null;
  }
  
  if (key === 'minBeds' || key === 'maxBeds' || key === 'minBaths' || key === 'maxBaths') {
    const num = parseInt(value, 10);
    return (num >= 0 && num <= 50 && !isNaN(num)) ? String(num) : null;
  }
  
  // For string values, sanitize and validate length
  const sanitized = value
    .replace(/[<>'"&]/g, '')
    .trim()
    .substring(0, 100);
  
  return sanitized.length > 0 ? sanitized : null;
};

interface Property {
  _id: string;
  slug?: string | { en?: string; fr?: string; es?: string };
  title: any;
  price: number;
  location: any;
  type: string;
  beds: number;
  baths: number;
  size: number;
  image: string;
  images?: string[];
  for?: "buy" | "rent";
  rentDuration?: string;
  description?: any;
  amenities?: string[];
  agent?: {
    name?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    image?: string;
    brokerNo?: string;
  };
  createdAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    items: Property[];
    total: number;
    page: number;
    totalPages: number;
  };
}

const FRIENDLY_QUERY_KEYS = [
  "propertyRange",
  "priceRange",
  "offeringType",
  "area",
  "handover",
  "lifestyle",
  "title",
  "bedrooms",
];

function PropertiesPageContent() {
  const { t, ready } = useTranslation("properties");
  const searchParams = useSearchParams();
  const params = useParams();
  // Validate locale to prevent injection
  const locale = validateLocale(params?.locale as string);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<any>({});
  const [appliedFilters, setAppliedFilters] = useState<
    Array<{ key: string; label: string; value: string }>
  >([]);
  const [removeFilterFn, setRemoveFilterFn] = useState<
    ((key: string) => void) | null
  >(null);
  const [sortOption, setSortOption] = useState("default");
  const [isMounted, setIsMounted] = useState(false);
  const [filtersInitialized, setFiltersInitialized] = useState(false);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch page content from API
  useEffect(() => {
    const fetchBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("properties", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  // Enhanced helper function to extract text from any structure
  const extractText = (data: any): string => {
    if (typeof data === "string") return data;

    if (data && typeof data === "object") {
      // Handle {text: "value", image: "url"} structure
      if (data.text && typeof data.text === "string") {
        return data.text;
      }
      // Handle multilingual objects {en: "text", fr: "text"}
      if (data.en && typeof data.en === "string") {
        return data.en;
      }
      // Handle current locale
      if (data[locale] && typeof data[locale] === "string") {
        return data[locale];
      }
      // Try to find any string value in the object
      for (const key in data) {
        if (typeof data[key] === "string") {
          return data[key];
        }
      }
      // If object has no string values, return empty string
      return "";
    }

    return String(data || "");
  };

  const searchParamsFilters = useMemo(() => {
    const urlFilters: any = {};

    // Sanitize and validate query parameters from URL
    FRIENDLY_QUERY_KEYS.forEach((key) => {
      const validatedValue = validateSearchParam(key, searchParams.get(key));
      if (validatedValue) {
        urlFilters[key] = validatedValue;
      }
    });

    if (!urlFilters.propertyRange) {
      const validatedType = validateSearchParam("type", searchParams.get("type"));
      if (validatedType) {
        urlFilters.propertyRange = validatedType;
      }
    }

    if (!urlFilters.offeringType) {
      const validatedFor = validateSearchParam("for", searchParams.get("for"));
      if (validatedFor) {
        urlFilters.offeringType = validatedFor;
      }
    }

    if (!urlFilters.area) {
      const validatedLocation = validateSearchParam("location", searchParams.get("location"));
      if (validatedLocation) {
        urlFilters.area = validatedLocation;
      }
    }

    if (!urlFilters.handover) {
      const handoverDate = validateSearchParam("handoverDate", searchParams.get("handoverDate"));
      const minBeds = validateSearchParam("minBeds", searchParams.get("minBeds"));
      if (handoverDate) {
        urlFilters.handover = handoverDate;
      } else if (minBeds) {
        urlFilters.handover = minBeds;
      }
    }

    if (!urlFilters.lifestyle) {
      const lifestyle = validateSearchParam("lifestyle", searchParams.get("lifestyle"));
      const minBaths = validateSearchParam("minBaths", searchParams.get("minBaths"));
      if (lifestyle) {
        urlFilters.lifestyle = lifestyle;
      } else if (minBaths) {
        urlFilters.lifestyle = minBaths;
      }
    }

    // Validate and sanitize price parameters
    const priceRangeParam = validateSearchParam("priceRange", searchParams.get("priceRange"));
    if (priceRangeParam) {
      urlFilters.priceRange = priceRangeParam;
      const [min, max] = priceRangeParam.split("-");
      const validatedMin = min ? validateSearchParam("minPrice", min) : null;
      const validatedMax = max ? validateSearchParam("maxPrice", max) : null;
      if (validatedMin) urlFilters.minPrice = validatedMin;
      if (validatedMax) urlFilters.maxPrice = validatedMax;
    } else {
      const validatedMin = validateSearchParam("minPrice", searchParams.get("minPrice"));
      const validatedMax = validateSearchParam("maxPrice", searchParams.get("maxPrice"));
      if (validatedMin) urlFilters.minPrice = validatedMin;
      if (validatedMax) urlFilters.maxPrice = validatedMax;
    }

    if (!urlFilters.title) {
      const validatedTitle = validateSearchParam("title", searchParams.get("title"));
      if (validatedTitle) {
        urlFilters.title = validatedTitle;
      }
    }

    // Bedrooms: from URL as bedrooms or minBeds (backend accepts minBeds)
    if (!urlFilters.bedrooms) {
      const validatedBedrooms = validateSearchParam("bedrooms", searchParams.get("bedrooms"))
        || validateSearchParam("minBeds", searchParams.get("minBeds"));
      if (validatedBedrooms) {
        urlFilters.bedrooms = validatedBedrooms;
      }
    }

    return urlFilters;
  }, [searchParams]);

  // Read URL parameters on mount or when they change
  useEffect(() => {
    setFilters(searchParamsFilters);
    // Validate page parameter
    const validatedPage = validateSearchParam("page", searchParams.get("page"));
    if (validatedPage) {
      const pageNum = Number(validatedPage);
      if (pageNum > 0 && pageNum < 1000) {
        setCurrentPage(pageNum);
      } else {
        setCurrentPage(1);
      }
    } else {
      setCurrentPage(1);
    }
    setFiltersInitialized(true);
  }, [searchParamsFilters, searchParams]);

  const fetchProperties = async (page: number = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        locale: locale,
        excludeContent: "true",
      });

      const apiFilters: Record<string, string | number> = {};

      // Backend getAllProperties supports: type, for, location, title, minPrice, maxPrice, minBeds, minBaths
      const propertyRange = filters.propertyRange || filters.type;
      if (propertyRange) apiFilters.type = propertyRange;

      const offeringType = filters.offeringType || filters.for;
      if (offeringType) apiFilters.for = offeringType;

      const area = filters.area || filters.location;
      if (area) apiFilters.location = area;

      if (filters.bedrooms) {
        apiFilters.minBeds = parseInt(filters.bedrooms as string, 10) || filters.bedrooms;
      }

      if (filters.minPrice)
        apiFilters.minPrice =
          parseInt(filters.minPrice as string) || filters.minPrice;
      if (filters.maxPrice)
        apiFilters.maxPrice =
          parseInt(filters.maxPrice as string) || filters.maxPrice;

      if (filters.title) apiFilters.title = filters.title;

      // Backend does not filter properties by handover or lifestyle (those are off-plan); omit them

      Object.entries(apiFilters).forEach(([key, value]) => {
        if (
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value !== 0
        ) {
          queryParams.append(key, value.toString());
        }
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties?${queryParams}`
      );

      if (!res.ok) {
        setProperties([]);
        setTotalPages(1);
        return;
      }

      const json: ApiResponse = await res.json();
      console.log({ json });
      if (json.success) {
        // Transform properties to include slug
        const transformedProperties = json.data.items.map((property: Property) => ({
          ...property,
          slug: getSlug(property.slug, locale, property._id),
        }));
        setProperties(transformedProperties);
        setTotalPages(json.data.totalPages);
        setCurrentPage(json.data.page);
      }
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);

    // Build safe query string with validation and sanitization
    const queryString = buildSafeQueryString(newFilters);
    
    // Build safe URL using current pathname and sanitized query string
    const safePathname = window.location.pathname.replace(/[^a-zA-Z0-9/._-]/g, '');
    const newUrl = buildSafeUrl(safePathname, queryString);
    
    window.history.pushState({}, "", newUrl);
  }, []);

  const handleClear = () => {
    setFilters({});
    setCurrentPage(1);
    // Sanitize pathname before using
    const safePathname = window.location.pathname.replace(/[^a-zA-Z0-9/._-]/g, '');
    window.history.pushState({}, "", safePathname);
  };

  const handleAppliedFiltersChange = useCallback(
    (
      filters: Array<{ key: string; label: string; value: string }>,
      removeFilter: (key: string) => void
    ) => {
      setAppliedFilters(filters);
      setRemoveFilterFn(() => removeFilter);
    },
    []
  );

  // Fetch properties when filters or page changes
  useEffect(() => {
    if (isMounted) {
      fetchProperties(currentPage);
    }
  }, [filters, currentPage, locale, isMounted]);

  // Apply sorting to the displayed properties
  const sortedProperties = [...properties].sort((a: any, b: any) => {
    switch (sortOption) {
      case "lowestPrice":
        return a.price - b.price;
      case "highestPrice":
        return b.price - a.price;
      case "newestFirst":
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      case "mostBedroom":
        return b.beds - a.beds;
      case "leastBedroom":
        return a.beds - b.beds;
      case "mostRecent":
      default:
        return 0;
    }
  });

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);

    // Get existing query params and sanitize them
    const existingParams = new URLSearchParams(window.location.search);
    const sanitizedParams: Record<string, string> = {};
    
    // Sanitize existing query parameters
    existingParams.forEach((value, key) => {
      if (isValidQueryKey(key)) {
        sanitizedParams[key] = sanitizeQueryValue(value);
      }
    });
    
    // Add or remove page parameter
    if (page === 1) {
      delete sanitizedParams.page;
    } else {
      sanitizedParams.page = page.toString();
    }
    
    // Build safe query string
    const queryString = buildSafeQueryString(sanitizedParams);
    
    // Build safe URL
    const safePathname = window.location.pathname.replace(/[^a-zA-Z0-9/._-]/g, '');
    const newUrl = buildSafeUrl(safePathname, queryString);
    
    window.history.pushState({}, "", newUrl);
  };

  // Format price - use rentDuration for rent (Day, Week, Month, Year, etc.)
  const formatPrice = (price: number, propertyFor?: string, rentDuration?: string) => {
    const formatted = formatPriceUtil(price.toString());

    return propertyFor === "rent"
      ? `${formatted}/${rentDuration || "Year"}`
      : formatted;
  };

  // Safe translation function
  const safeTranslate = (key: string, fallback: string = ""): string => {
    if (!ready || !isMounted) return fallback;

    const translation = t(key);
    return extractText(translation) || fallback;
  };

  // Show loading state during SSR and initial load
  if (!isMounted) return <PropertiesPageSkeleton />;

  return (
    <div className="bg-white relative min-h-screen overflow-hidden">
      {/* <section className="relative">
        <div className="relative w-full h-[330px] overflow-hidden">
          <Image
            src="/images/blogs/bg-blog.png"
            fill
            alt="background"
            className="object-cover"
            priority
          />
        </div>
        <div className="px-2 absolute mx-auto max-w-[1300px] inset-0 flex items-center z-10">
          <h1 className="text-gold text-xl sm:text-2xl font-semibold">
            {t("pageHeading.bannerTitle", "PROPERTIES")}
          </h1>
        </div>
      </section> */}
      {bannerLoading ? (
        <HeroSection2Skeleton />
      ) : (
        <HeroSection2
          title={
            bannerData?.title ||
            t("pageHeading.bannerTitle", "Properties")
          }
          imageSrc={
            bannerData?.bannerType === "image" && bannerData?.bannerUrl
              ? bannerData.bannerUrl
              : "/images/blogs/bg-blog.png"
          }
        />
      )}
      <div className="absolute w-full z-20 sm:mt-[-55px] mt-[-20px]">
        <SearchBox
          noHandover={false}
          onSearch={handleSearch}
          initialFilters={filtersInitialized ? filters : searchParamsFilters}
          showAppliedFiltersInside={false}
          onAppliedFiltersChange={handleAppliedFiltersChange}
        />
      </div>
      {appliedFilters.length > 0 && (
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 md:px-12 mt-2 pt-2 flex flex-wrap gap-2 items-center relative z-10">
          {appliedFilters.map((filter) => (
            <div
              key={filter.key}
              className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-gold rounded-full bg-white text-primary text-sm font-medium shadow-sm"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => removeFilterFn && removeFilterFn(filter.key)}
                className="ml-1 hover:bg-gold/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${filter.label} filter`}
              >
                <X className="w-4 h-4 text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* <div className="relative z-10 bg-white pt-20 pb-6 max-w-7xl mx-auto"></div> */}
      <div className="flex items-center justify-center w-full mt-10">
        <h2 className="text-gold text-2xl sm:text-3xl font-semibold">
          <span className="text-primary">
            {t("pageHeading.sectionHighlight", "ALL")}{" "}
          </span>
          {t("pageHeading.sectionTitle", "PROPERTIES")}
          <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
        </h2>
      </div>
      {/* Property Grid */}
      <section className="relative bg-white text-black px-6 py-6 max-w-[1500px] mx-auto">
        {loading && properties.length === 0 ? (
          <PropertyGridSkeleton />
        ) : (
        <>
        <div className="relative flex xl:flex-row flex-col-reverse gap-4 max-w-[1500px] mx-auto mb-10">
          <div className="block sm:hidden w-full">
            <Swiper
              key={currentPage + sortOption}
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
              slidesPerView={1.1}
              spaceBetween={12}
              loop={true}
            >
              {sortedProperties.map((property) => {
                const propertyTitle =
                  extractText(property.title) || "Property Title";
                const propertyLocation =
                  extractText(property.location) || "Location not specified";

                return (
                  <SwiperSlide key={property._id}>
                    <FeaturedOffPlanCard
                      _id={property._id}
                      priceFrom={formatPrice(property.price, property.for, property.rentDuration)}
                      title={propertyTitle}
                      location={propertyLocation}
                      type={property.type}
                      bedRange={String(property.beds)}
                      bathRange={String(property.baths)}
                      sizeRange={typeof property.size === "string" ? property.size : property.size?.toLocaleString?.()}
                      image={property.image}
                      href={`/${locale}/properties/${property.slug || property._id}`}
                      locale={locale}
                      OfferingType={
                        property?.for === "rent" ? "For Rent" : "For Sale"
                      }
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="hidden sm:grid z-10 gap-6 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProperties.map((property) => {
              const propertyTitle =
                extractText(property.title) || "Property Title";
              const propertyLocation =
                extractText(property.location) || "Location not specified";

              return (
                <FeaturedOffPlanCard
                  key={property._id}
                  _id={property._id}
                  priceFrom={formatPrice(property.price, property.for, property.rentDuration)}
                  title={propertyTitle}
                  location={propertyLocation}
                  type={property.type}
                  bedRange={String(property.beds)}
                  bathRange={String(property.baths)}
                  sizeRange={typeof property.size === "string" ? property.size : property.size?.toLocaleString?.()}
                  image={property.image}
                  href={`/${locale}/properties/${property.slug || property._id}`}
                  locale={locale}
                  OfferingType={
                    property?.for === "rent" ? "For Rent" : "For Sale"
                  }
                />
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

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={loading && page === currentPage}
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
        </>
        )}
      </section>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesPageSkeleton />}>
      <PropertiesPageContent />
    </Suspense>
  );
}
