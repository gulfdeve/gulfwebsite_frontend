"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import DldPermitCard from "@/components/DldPermitCard";
import Amenities from "@/components/Amenities";
import LocationSection from "@/components/common/LocationSection";
import SimilarProperties from "@/components/SimilarProperties";
import { useTranslation } from "next-i18next";
import SearchBox from "@/components/common/SearchBox";
import { useSearchParams } from "next/navigation";
import { formatPrice as formatPriceUtil } from "@/utils/priceFormatter";
import {
  Bath,
  BedDouble,
  Home,
  Phone,
  SquareTerminal,
  X,
} from "lucide-react";
import { SizeIcon } from "@/components/common/PropertyStatIcons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { BsWhatsapp } from "react-icons/bs";
import DetailPageContactForm from "@/components/DetailPageContactForm";
import HeroSection2 from "@/components/common/HeroSection2";
import PropertyDetailSkeleton from "@/components/properties/PropertyDetailSkeleton";
import { validateLocale, buildSafeQueryString, sanitizeQueryValue, isValidQueryKey, buildSafeUrl } from "@/utils/routeSecurity";
import { cleanHtmlForDisplay } from "@/utils/htmlCleaner";
import { getLocalizedValue } from "@/utils/localization";

interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  beds: number;
  baths: number;
  size: number;
  image: string;
  images?: string[];
  description?: string;
  amenities?: string[];
  nearbyLandmarks?: { title: string; time: string; image: string }[];
  agent?: {
    name: string;
    email: string;
    phone: string;
    brokerNo?: string;
    image?: string;
    whatsapp?: string;
  };
  buildingInfo?: {
    floors?: number;
    pools?: number;
    parking?: number;
    elevators?: number;
    area?: string;
    retail?: number;
    year?: number;
  };
  geoLocation?: {
    latitude?: string;
    longitude?: string;
  };
  for?: "buy" | "rent";
  rentDuration?: string;
  createdAt?: string;
  brochure?: string;
  dldPermitNumber?: string;
  qrImage?: string;
  developer?: string;
  serviceCharges?: string;
  // Language support
  languages?: {
    title: any;
    description: any;
    location: any;
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
];

export default function PropertyDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  // Validate locale to prevent injection
  const locale = validateLocale(params?.locale as string);
  const { t } = useTranslation("property");
  const searchParams = useSearchParams();

  const [data, setData] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersInitialized, setFiltersInitialized] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<
    Array<{ key: string; label: string; value: string }>
  >([]);
  const [removeFilterFn, setRemoveFilterFn] = useState<
    ((key: string) => void) | null
  >(null);

  const searchParamsFilters = useMemo(() => {
    const urlFilters: any = {};

    // Sanitize and validate query parameters from URL
    FRIENDLY_QUERY_KEYS.forEach((key) => {
      if (isValidQueryKey(key)) {
        const value = searchParams.get(key);
        if (value) {
          // Sanitize value to prevent injection
          urlFilters[key] = sanitizeQueryValue(value);
        }
      }
    });

    if (!urlFilters.propertyRange) {
      const type = searchParams.get("type");
      if (type && isValidQueryKey("type")) {
        urlFilters.propertyRange = sanitizeQueryValue(type);
      }
    }

    if (!urlFilters.offeringType) {
      const forVal = searchParams.get("for");
      if (forVal && isValidQueryKey("for")) {
        urlFilters.offeringType = sanitizeQueryValue(forVal);
      }
    }

    if (!urlFilters.area) {
      const location = searchParams.get("location");
      if (location && isValidQueryKey("location")) {
        urlFilters.area = sanitizeQueryValue(location);
      }
    }

    if (!urlFilters.handover) {
      const handover =
        searchParams.get("handoverDate") || searchParams.get("minBeds");
      if (handover) {
        const key = searchParams.get("handoverDate") ? "handoverDate" : "minBeds";
        if (isValidQueryKey(key)) {
          urlFilters.handover = sanitizeQueryValue(handover);
        }
      }
    }

    if (!urlFilters.lifestyle) {
      const lifestyle =
        searchParams.get("lifestyle") || searchParams.get("minBaths");
      if (lifestyle) {
        const key = searchParams.get("lifestyle") ? "lifestyle" : "minBaths";
        if (isValidQueryKey(key)) {
          urlFilters.lifestyle = sanitizeQueryValue(lifestyle);
        }
      }
    }

    const priceRangeParam =
      urlFilters.priceRange || searchParams.get("priceRange");
    if (priceRangeParam && isValidQueryKey("priceRange")) {
      const sanitized = sanitizeQueryValue(priceRangeParam);
      urlFilters.priceRange = sanitized;
      const [min, max] = sanitized.split("-");
      urlFilters.minPrice = min ? sanitizeQueryValue(min) : "";
      urlFilters.maxPrice = max ? sanitizeQueryValue(max) : "";
    } else {
      const min = searchParams.get("minPrice");
      const max = searchParams.get("maxPrice");
      if (min && isValidQueryKey("minPrice")) {
        urlFilters.minPrice = sanitizeQueryValue(min);
      }
      if (max && isValidQueryKey("maxPrice")) {
        urlFilters.maxPrice = sanitizeQueryValue(max);
      }
    }

    if (!urlFilters.title) {
      const title = searchParams.get("title");
      if (title && isValidQueryKey("title")) {
        urlFilters.title = sanitizeQueryValue(title);
      }
    }

    return urlFilters;
  }, [searchParams]);

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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}?locale=${locale}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch property");
        const json = await res.json();
        setData(json.success ? json.data : null);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
      console.log(data);
    };

    fetchProperty();
  }, [id, locale]);
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

  if (loading) return <PropertyDetailSkeleton />;

  if (error || !data)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 gap-4">
        <h2 className="text-2xl font-semibold">
          {t("notFound","Property Not Found")}
        </h2>
        <p className="text-gray-500">
          Sorry, we couldn't find the property you're looking for.
        </p>
        <Link
          href="/properties"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {t("backToProperties","Back to Properties")}
        </Link>
      </div>
    );

  // Format price - use rentDuration for rent (Day, Week, Month, Year, etc.)
  const formatPrice = (price: number, propertyFor?: string, rentDuration?: string) => {
    const formatted = formatPriceUtil(price.toString());

    return propertyFor === "rent"
      ? `${formatted}/${rentDuration || "Year"}`
      : formatted;
  };

  const sanitizedDescription = cleanHtmlForDisplay(data.description);

  return (
    <>
      <div className="bg-white text-[#606060]">
        <HeroSection2
          title={data?.title}
          imageSrc="/images/blogs/bg-blog.png"
        />
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 px-2 pt-3 md:px-4 max-w-6xl mx-auto my-8">
          <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
            <p className="uppercase text-xs sm:text-sm font-semibold">STARTING PRICE</p>
            <p className="text-gold text-md sm:text-xl font-medium tracking-wide">
              {formatPrice(data?.price ?? 0, data?.for, data?.rentDuration)}
            </p>
          </div>

          <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
            <p className="uppercase text-xs sm:text-sm font-semibold">
              {t("sections.location")}
            </p>
            <p className="text-gold text-md sm:text-xl font-medium tracking-wide">
              {data?.location}
            </p>
          </div>

          <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
            <p className="uppercase text-xs sm:text-sm font-semibold">Property Type</p>
            <p className="text-gold text-md sm:text-xl font-medium tracking-wide">
              {data?.type}
            </p>
          </div>

          <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
            <p className="uppercase text-xs sm:text-sm font-semibold">Size</p>
            <p className="text-gold text-md sm:text-xl font-medium tracking-wide">
              {data?.size != null ? `${data.size} sq ft` : ""}
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col mx-auto px-4 gap-8 justify-center my-14 max-w-[1300px]">
          <div className="flex flex-col gap-4 lg:w-1/2">
            {sanitizedDescription && (
              <div
                className="text-gray-700 leading-relaxed space-y-4 [&_p]:mb-4 [&_p]:text-base [&_strong]:font-semibold [&_strong]:text-gray-900 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-4 [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_li]:mb-2"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            )}
            <b className="text-primary text-2xl font-semibold">Location:</b>
            <p>{data.location && data.location}</p>
            {data?.brochure?.trim() && (
              <a
                href={data.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-4 py-2 border border-primary bg-primary text-white hover:bg-white hover:text-primary transition-colors duration-300 hover:border hover:border-primary mt-4 cursor-pointer rounded-full"
              >
                {t("id.downloadBrochure", "Download Brochure")}
              </a>
            )}
          </div>
          <div className="relative w-full h-[250px] sm:h-[400px] lg:w-[550px] lg:h-[350px]">
            <Image
              src={data.image}
              alt="main image"
              fill
              className="lg:object-cover object-contain rounded-lg"
            />
          </div>
        </div>

        {/* image gallery */}
        <div className="mt-6 max-w-[1300px] mx-auto">
          <div className="w-full flex justify-between items-center mb-4 px-8">
            <div className="w-[150px] font-semibold text-primary text-3xl my-4">
              <h3>Gallery</h3>
              <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
            </div>

            {/* Custom navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                className="swiper-button-prev-custom bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                className="swiper-button-next-custom bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

          {/* Swiper */}
          <div className="w-full p-3">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              className="overflow-hidden"
              breakpoints={{
                0: { slidesPerView: 1 }, // mobile
                640: { slidesPerView: 2 }, // small screens
                768: { slidesPerView: 2 }, // tablets
                1024: { slidesPerView: 3 }, // desktops
                1280: { slidesPerView: 3}, // large desktops
              }}
            >
              {data.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[250px] sm:h-[300px] md:h-[330px]">
                    <Image
                      src={img}
                      alt={`property image ${index}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* <div className="container mx-auto px-4 py-8"></div> */}
        {/* Property Info */}
        <div className="max-w-[1300px] mx-auto px-4 py-8">
          <div className="">
            {/* Left Section - Main Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Property Details */}
              <div className="space-y-4">
                <div className="w-[250px] font-semibold text-primary text-3xl my-4">
                  <h3>{t("sections.details") || "Property Details"}</h3>
                  <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
                </div>

                <ul className="grid md:grid-cols-3 space-y-3 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                      <Home className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
                    </span>
                    <span className="font-semibold">Property Type:</span>
                    {data.type}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                      <SizeIcon className="w-4 h-4 md:w-5 md:h-5 text-[#DEB66A]" />
                    </span>
                    <span className="font-semibold">Property Size:</span>
                    {data.size != null ? `${data.size} sq ft` : ""}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                      <BedDouble className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
                    </span>
                    <span className="font-semibold">Bedrooms:</span>
                    {data.beds}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                      <Bath className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
                    </span>
                    <span className="font-semibold">Bathrooms:</span>
                    {data.baths}
                  </li>
                  {data.serviceCharges && data.serviceCharges !== "N/A" && (
                  <li className="flex items-center gap-2">
                    <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                      <SquareTerminal
                        className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                        color="#DEB66A"
                      />
                    </span>
                    <span className="font-semibold">Service Charges:</span>
                    {data.serviceCharges || t("common.notAvailable", "N/A")}
                  </li>
                  )}
                </ul>
              </div>
              {data?.amenities && data?.amenities?.length > 0 && (
                <>
                  <div className="w-full h-px underline-gradient"></div>
                  {/* Amenities */}
                  <Amenities features={data?.amenities || []} />
                  <div className="w-full h-px underline-gradient"></div>
                </>
              )}
              <div className="space-y-4">
                <div className="w-[330px] font-semibold text-primary text-2xl sm:text-3xl my-4">
                  <h3 className="uppercase wrap-break-word">
                    Nearby <span className="text-gold">Landmarks</span>
                  </h3>
                  <div className="max-w-[330px] mt-1 mx-auto underline-gradient" />
                </div>
                <div className="flex justify-center items-center gap-4 mt-4">
                  {data.nearbyLandmarks?.map((landmark, index) => (
                    <div key={index} className="relative w-[300px]">
                      <Image
                        src={landmark.image}
                        width={300}
                        height={300}
                        alt="nearby landmark"
                        className="rounded border border-gold"
                      />

                      {/* Blue Gradient Layer */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 rounded-b-lg bg-linear-to-t from-primary to-transparent"></div>

                      {/* Text Overlay */}
                      <div className="absolute bottom-3 left-0 right-0 px-3 flex justify-between text-white text-sm z-10">
                        <p className="font-medium text-lg">{landmark.title}</p>
                        <p>{landmark.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full px-4 md:px-8 py-6 lg:h-[500px] rounded bg-[url('/images/properties/detail-page.png')] bg-cover bg-center bg-no-repeat">
                {/* Bluish Overlay */}
                <div className="absolute inset-0 bg-primary/40 z-0"></div>

                {/* Text Content */}
                <div className="relatvie flex lg:flex-row flex-col justify-between items-center lg:items-start lg:gap-y-0 gap-y-5">
                  <div className="relative z-10 sm:w-[330px] lg:mr-2 font-semibold text-white text-2xl sm:text-3xl my-4">
                    <h3 className="uppercase">Want more information?</h3>
                    <div className="max-w-[330px] mt-1 mx-auto underline-gradient" />
                  </div>
                  <div className="relative md:mb-0 mb-6 lg:mr-8">
                    <DetailPageContactForm propertyName={getLocalizedValue(data?.title, locale, data?.title || "")} />
                  </div>
                  <div className="relative flex flex-col gap-y-6 lg:gap-y-12">
                    <DldPermitCard
                      qrImage={data?.qrImage}
                      permitNumber={data?.dldPermitNumber}
                      verifiedText={t("dldDesc") || "Verified by DLD"}
                    />
                    <div className="flex justify-between gap-4 max-w-[300px] mx-auto">
                      <Link href={`tel:+971563645835`} target="_blank" className="flex flex-1 gap-2 bg-white text-primary items-center justify-center border rounded-full px-4 py-1">
                        <Phone className="text-gold w-5 h-5" />
                        {t("agent.call", "Call")}
                      </Link>
                      <Link href={`https://wa.me/971563645835?text=Hi, I'm interested in ${data?.title} at ${data?.location}`} target="_blank" className="flex flex-1 gap-2 bg-white text-primary items-center justify-center border rounded-full px-4 py-1">
                        <BsWhatsapp className="text-gold w-5 h-5" />
                        {t("agent.whatsapp", "WhatsApp")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <LocationSection
                title={t("sections.location") || "Location"}
                location={data.location}
                latitude={data.geoLocation?.latitude}
                longitude={data.geoLocation?.longitude}
              />
            </div>
          </div>
          <div className="space-y-4">
            <SimilarProperties propertyId={data._id} />
          </div>
        </div>
      </div>
    </>
  );
}
