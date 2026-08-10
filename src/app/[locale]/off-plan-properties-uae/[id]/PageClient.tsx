"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import SimilarOffPlans from "@/components/SimilarOffPlans";
import DldPermitCard from "@/components/DldPermitCard";
import Amenities from "@/components/Amenities";
import LocationSection from "@/components/common/LocationSection";
import SearchBox from "@/components/common/SearchBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  Bath,
  BedDouble,
  Home,
  Phone,
  SquareTerminal,
  X,
  Download,
} from "lucide-react";
import { SizeIcon } from "@/components/common/PropertyStatIcons";
// import FloorPlanCard from "@/components/FloorPlanCard"; // Commented out - Floor Plan section removed
import DetailPageContactForm from "@/components/DetailPageContactForm";
import { BsWhatsapp } from "react-icons/bs";
import HeroSection2 from "@/components/common/HeroSection2";
import OffPlanDetailSkeleton from "@/components/offPlanPage/OffPlanDetailSkeleton";
import { cleanHtmlForDisplay } from "@/utils/htmlCleaner";
import { formatPrice as formatPriceUtil } from "@/utils/priceFormatter";

const FRIENDLY_QUERY_KEYS = [
  "propertyRange",
  "priceRange",
  "offeringType",
  "area",
  "handover",
  "lifestyle",
  "title",
];

interface Property {
  _id: string;
  title: string | { en?: string; fr?: string; es?: string };
  location?: string | { en?: string; fr?: string; es?: string };
  developer?: string;
  type?: string;
  handover?: string;
  priceFrom?: string;
  paymentPlan?: string;
  bedRange?: string;
  bathRange?: string;
  sizeRange?: string;
  image?: string;
  images?: string[];
  description?: string | { en?: string; fr?: string; es?: string };
  // floorPlans?: FloorPlan[]; // Commented out - Floor Plan section removed
  nearbyLandmarks?: { title: string; time?: string; image?: string }[];
  amenities?: string[];
  propertyType?: string;
  serviceCharges?: string;
  geoLocation?: {
    latitude?: string;
    longitude?: string;
  };
  brochure?: string;
  dldPermitNumber?: string;
  qrImage?: string;
}

export default function PageClient() {
  const { t } = useTranslation("off-plan");
  const searchParams = useSearchParams();
  const { id, locale } = useParams() as { id: string; locale?: string };

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<
    Array<{ key: string; label: string; value: string }>
  >([]);
  const [removeFilterFn, setRemoveFilterFn] = useState<
    ((key: string) => void) | null
  >(null);

  const searchParamsFilters = useMemo(() => {
    const urlFilters: any = {};

    FRIENDLY_QUERY_KEYS.forEach((key: any) => {
      const value = searchParams.get(key);
      if (value) {
        urlFilters[key] = value;
      }
    });

    if (!urlFilters.propertyRange) {
      const type = searchParams.get("type");
      if (type) urlFilters.propertyRange = type;
    }

    if (!urlFilters.offeringType) {
      const forVal = searchParams.get("for");
      if (forVal) urlFilters.offeringType = forVal;
    }

    if (!urlFilters.area) {
      const location = searchParams.get("location");
      if (location) urlFilters.area = location;
    }

    if (!urlFilters.handover) {
      const handover =
        searchParams.get("handoverDate") || searchParams.get("minBeds");
      if (handover) urlFilters.handover = handover;
    }

    if (!urlFilters.lifestyle) {
      const lifestyle =
        searchParams.get("lifestyle") || searchParams.get("minBaths");
      if (lifestyle) urlFilters.lifestyle = lifestyle;
    }

    const priceRangeParam =
      urlFilters.priceRange || searchParams.get("priceRange");
    if (priceRangeParam) {
      urlFilters.priceRange = priceRangeParam;
      const [min, max] = priceRangeParam.split("-");
      urlFilters.minPrice = min || "";
      urlFilters.maxPrice = max || "";
    } else {
      const min = searchParams.get("minPrice");
      const max = searchParams.get("maxPrice");
      if (min) urlFilters.minPrice = min;
      if (max) urlFilters.maxPrice = max;
    }

    if (!urlFilters.title) {
      const title = searchParams.get("title");
      if (title) urlFilters.title = title;
    }

    return urlFilters;
  }, [searchParams]);

  // Ref for the RegisterInterest component
  const registerInterestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL!;
        const res = await fetch(
          `${API_URL}/api/offplans/${id}?locale=${locale || "en"}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch property");

        const json = await res.json();
        const data: Property | null = json.data || null;
        setProperty(
          data
            ? {
                ...data,
                image: data.image || "/images/properties/default.jpg",
                images:
                  data.images && data.images.length > 0
                    ? data.images
                    : [data.image || "/images/properties/default.jpg"],
              }
            : null
        );
      } catch (err) {
        console.error(err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, locale]);

  // Helper function to extract text from multilingual objects
  const getLocalizedText = (
    field: string | { en?: string; fr?: string; es?: string } | undefined,
    fallback: string = ""
  ): string => {
    if (!field) return fallback;
    if (typeof field === "string") return field;
    if (typeof field === "object") {
      const currentLocale = locale || "en";
      return field[currentLocale as keyof typeof field] || field.en || fallback;
    }
    return fallback;
  };

  // Extract localized values
  const propertyTitle = getLocalizedText(
    property?.title,
    t("common.property", "Property")
  );
  const propertyLocation = getLocalizedText(
    property?.location,
    t("common.locationNotSpecified", "Location not specified")
  );
  const propertyDescription = getLocalizedText(property?.description);

  // Get location from URL parameter if available, otherwise use property location
  const urlLocation = searchParams.get("location");
  const displayLocation = urlLocation || propertyLocation;

  // Get map URL - prioritize geo_location coordinates, then URL location, then property location
  const getMapUrl = (): string => {
    // Priority 1: If geoLocation exists with latitude and longitude, use coordinates
    if (property?.geoLocation?.latitude && property?.geoLocation?.longitude) {
      const lat = property.geoLocation.latitude.trim();
      const lng = property.geoLocation.longitude.trim();
      if (lat && lng) {
        // Use Google Maps with coordinates - this is the most accurate
        return `https://www.google.com/maps?q=${lat},${lng}`;
      }
    }

    // Priority 2: Use location from URL parameter if available
    if (urlLocation) {
      return `https://www.google.com/maps?q=${encodeURIComponent(urlLocation)}`;
    }

    // Priority 3: Use property location text
    if (
      propertyLocation &&
      propertyLocation !==
        t("common.locationNotSpecified", "Location not specified")
    ) {
      return `https://www.google.com/maps?q=${encodeURIComponent(
        propertyLocation
      )}`;
    }

    // Fallback: Just open Google Maps
    return `https://www.google.com/maps`;
  };

  const mapUrl = getMapUrl();

  // Clean and sanitize HTML description for display (XSS protection)
  const cleanedDescription = cleanHtmlForDisplay(propertyDescription);

  // Handle brochure download
  const handleDownloadBrochure = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!property?.brochure) {
      console.error("No brochure available");
      return;
    }

    // Cloudinary serves brochures as extensionless raw files (wrong
    // Content-Type/filename), so browsers/OS flag the download as an
    // unrecognized file. Fetch as a blob and force a proper .pdf name.
    try {
      const res = await fetch(property.brochure);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${propertyTitle || "brochure"}-brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download brochure", err);
      window.open(property.brochure, "_blank", "noopener,noreferrer");
    }
  };

  // Check if sizeRange already contains square feet units
  const hasSquareFeetUnit = (sizeRange: string | undefined): boolean => {
    if (!sizeRange) return false;
    const lowerSizeRange = sizeRange.toLowerCase();
    return /sq\s*ft|sqft|sq\.\s*ft|square\s*feet|sq\s|ft\s|sq\.|feet/i.test(
      lowerSizeRange
    );
  };

  const displaySizeRange = property?.sizeRange
    ? hasSquareFeetUnit(property.sizeRange)
      ? property.sizeRange
      : `${property.sizeRange} ${t("common.sqFt", "sq ft")}`
    : "";

  if (loading) return <OffPlanDetailSkeleton />;

  if (!property)
    return (
      <div className="container mx-auto px-4 py-16 text-center text-gray-600">
        <div className="max-w-xl flex flex-col gap-4 h-[700px] items-center justify-center mx-auto">
          <h4 className="text-lg mb-6 text-primary">
            {t(
              "id.propertyNotFound",
              "Property may not be found or some error occurred. Please refresh the page."
            )}
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#024959] text-white rounded-lg hover:bg-[#036b7a] transition font-medium"
            >
              {t("id.refreshPage", "Refresh Page")}
            </button>
            <Link
              href={`/${locale}/` as any}
              className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              {t("offPlanList.goHome", "Go Home")}
            </Link>
          </div>
        </div>
      </div>
    );

  const propertyImages = property.images || [
    property.image || "/images/properties/default.jpg",
  ];
  const landmarks = (property.nearbyLandmarks || []).map((lm) => ({
    title: lm.title || t("common.unknown", "Unknown"),
    time: lm.time || t("timeUnknown", "N/A"),
    image: lm.image || "/images/landmark-placeholder.jpg",
  }));
  const OnSearch = () => {
    console.log("on search");
  };

  const defaultAmenities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "Balcony",
    "Air Conditioning",
    "WiFi",
    "Laundry",
  ];

  return (
    <div className="bg-white text-black">
      <HeroSection2
        // title={t("pageHeading.bannerTitle", "OFF PLAN PROPERTIES")}
        title={propertyTitle || "Off Plan Properties"}
        imageSrc="/images/blogs/bg-blog.png"
      />
      <div className="absolute w-full z-20 md:mt-[-70px]"></div>
      <div className="absolute w-full z-20 md:mt-[-55px] -mt-[40px]">
        <SearchBox
          noHandover={false}
          showAppliedFiltersInside={false}
          onSearch={OnSearch}
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
                aria-label={
                  t("common.removeFilter", "Remove filter") +
                  `: ${filter.label}`
                }
              >
                <X className="w-4 h-4 text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 px-2 md:px-4 max-w-6xl mx-auto my-8">
        <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
          <p className="uppercase text-xs sm:text-sm font-semibold">
            {t("id.startingPrice") || "Starting Price"}
          </p>
          <h2 className="text-gold text-md sm:text-2xl font-medium tracking-wide">
            {formatPriceUtil((property?.priceFrom ?? 0).toString())}
          </h2>
        </div>

        <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
          <p className="uppercase text-xs sm:text-sm font-semibold">
            {t("id.paymentPlan") || "Payment Plan"}
          </p>
          <h2 className="text-gold text-md sm:text-2xl font-medium tracking-wide">
            {property.paymentPlan||"N/A"}
          </h2>
        </div>

        <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
          <p className="uppercase text-xs sm:text-sm font-semibold">
            {t("id.developer") || "Developer"}
          </p>
          <h2 className="text-gold text-md sm:text-2xl font-medium tracking-wide">
            {property.developer}
          </h2>
        </div>

        <div className="w-full text-center sm:w-[250px] bg-linear-to-r from-primary to-primary/80 text-white shadow-[inset_0_0_15px_#deb66a] py-8 rounded-lg flex flex-col justify-center items-center gap-1 px-4">
          <p className="uppercase text-xs sm:text-sm font-semibold">
            {t("id.propertySize") || "size range"}
          </p>
          <h2 className="text-gold text-md sm:text-2xl font-medium tracking-wide">
            {displaySizeRange}
          </h2>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col mx-auto px-4 gap-8 justify-center my-14 max-w-[1300px]">
        <div className="flex flex-col gap-4 lg:w-1/2">
          {cleanedDescription ? (
            <div
              className="text-gray-700 leading-relaxed space-y-4 [&_p]:mb-4 [&_p]:text-base [&_strong]:font-semibold [&_strong]:text-gray-900 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-4 [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: cleanedDescription }}
            />
          ) : (
            <p className="text-gray-700">{propertyDescription}</p>
          )}
          {property?.brochure && (
            <button
              onClick={handleDownloadBrochure}
              className="w-fit px-4 py-2 border border-primary bg-primary text-white hover:bg-white hover:text-primary transition-colors duration-300 hover:border hover:border-primary mt-4 cursor-pointer rounded-full flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t("id.downloadBrochure") || "Download Brochure"}
            </button>
          )}
        </div>
        <div className="relative w-full h-[250px] sm:h-[400px] lg:w-[550px] lg:h-[350px]">
          <Image
            src={propertyImages[0] || "/images/landmark-placeholder.jpg"}
            alt={t("common.mainImage", "Main image")}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="px-8 max-w-[1300px] mx-auto"></div>
      <div className="px-8 max-w-[1300px] mx-auto"></div>
      {/* image gallery */}
      <div className="mt-6 max-w-[1300px] mx-auto">
        <div className="w-full flex justify-between items-center mb-4 px-8">
          <div className="w-[150px] font-semibold text-primary text-3xl my-4">
            <h3>{t("sections.gallery", "Gallery")}</h3>
            <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
          </div>

          {/* Custom navigation buttons */}
          <div className="flex items-center gap-3">
            <button
              className="swiper-button-prev-custom bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t("common.previousSlide", "Previous slide")}
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
              aria-label={t("common.nextSlide", "Next slide")}
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
            {property.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[330px]">
                  <Image
                    src={img}
                    alt={`${t("common.propertyImage", "Property image")} ${
                      index + 1
                    }`}
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

      <div className="max-w-[1300px] mx-auto px-4 py-8">
        <div className="">
          {/* Left Section - Main Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Property Details */}
            <div className="space-y-4">
              <div className="w-[250px] font-semibold text-primary text-3xl my-4">
                <h3>{t("id.propertyDetails") || "Property Details"}</h3>
                <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
              </div>

              <ul className="grid md:grid-cols-3 space-y-3 gap-2">
                <li className="flex items-center gap-2">
                  <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                    <Home className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
                  </span>
                  <span className="font-semibold">
                    {t("id.propertyType", "Property Type")}:
                  </span>
                  {property.type}
                </li>
                <li className="flex items-center gap-2">
                  <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                    <SizeIcon className="w-4 h-4 md:w-5 md:h-5 text-[#DEB66A]" />
                  </span>
                  <span className="font-semibold">
                    {t("id.propertySize", "Property Size")}:
                  </span>
                  {property.sizeRange}
                </li>
                <li className="flex items-center gap-2">
                  <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                    <BedDouble className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
                  </span>
                  <span className="font-semibold">
                    {t("id.bedrooms", "Bedrooms")}:
                  </span>
                  {property.bedRange}
                </li>
                <li className="flex items-center gap-2">
                  <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                    <Bath className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
                  </span>
                  <span className="font-semibold">
                    {t("id.bathrooms", "Bathrooms")}:
                  </span>
                  {property.bathRange}
                </li>
                {property.serviceCharges && property.serviceCharges !== "N/A" && (
                <li className="flex items-center gap-2">
                  <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                    <SquareTerminal className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
                  </span>
                  <span className="font-semibold">
                    {t("id.serviceCharges", "Service Charges")}:
                  </span>
                  {property.serviceCharges || t("common.notAvailable", "N/A")}
                </li>
                )}
              </ul>
            </div>
            <div className="w-full h-px underline-gradient"></div>
            {/* Amenities */}
            <Amenities
              features={property.amenities || []}
            />

            <div className="w-full h-px underline-gradient"></div>
            {/* Floor Plan Section - Commented Out */}
            {/* <div className="space-y-4">
              <div className="w-full flex md:flex-row flex-col md:justify-between">
                <div className="w-[250px] font-semibold text-primary text-3xl my-4">
                  <h3>{t("id.floorPlan") || "Floor Plans"}</h3>
                  <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
                </div>
                <div className="px-8">
                  <button className="md:px-4 px-2 py-2 border border-primary hover:bg-primary hover:text-white bg-white text-primary transition-colors duration-300 mt-4 cursor-pointer rounded-full">
                    {t("id.downloadAllFloorPlans") ||
                      "Download all floor plans"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {floorPlansData.map((floorPlan, index) => (
                  <FloorPlanCard key={index} floorPlan={floorPlan} />
                ))}
              </div>
            </div> */}
            <div className="space-y-4">
              <div className="w-[330px] font-semibold text-primary text-2xl sm:text-3xl my-4">
                <h3 className="uppercase wrap-break-word">
                  {t("id.nearbyLandmarks") || "Nearby Landmarks"}
                </h3>
                <div className="max-w-[330px] mt-1 mx-auto underline-gradient" />
              </div>
              <div className="flex flex-wrap justify-start items-start gap-4 mt-4">
                {property.nearbyLandmarks?.map((landmark, index) => (
                  <div key={index} className="relative w-full sm:w-[300px]">
                    <Image
                      src={landmark.image || "/images/landmark-placeholder.jpg"}
                      width={300}
                      height={300}
                      alt={t("common.nearbyLandmark", "Nearby landmark")}
                      className="rounded border h-[250px] sm:h-[200px] w-full object-cover border-gold"
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
              <div className="relative flex lg:flex-row flex-col justify-between items-center lg:items-start lg:gap-y-0 gap-y-5">
                <div className="relative z-10 sm:w-[330px] lg:mr-2 font-semibold text-white text-2xl sm:text-3xl my-4">
                  <h3 className="uppercase">
                    {t("id.knowMore") || "Want to know more ?"}
                  </h3>
                  <div className="max-w-[330px] mt-1 mx-auto underline-gradient" />
                </div>
                <div className="relative md:mb-0 lg:mb-6 lg:mr-8">
                  <DetailPageContactForm propertyName={propertyTitle} />
                </div>
                <div className="relative flex flex-col gap-y-6 lg:gap-y-12">
                  <div className="w-full">
                    <DldPermitCard
                      qrImage={property?.qrImage}
                      permitNumber={property?.dldPermitNumber}
                      verifiedText={t("id.dldDesc") || "Verified by DLD"}
                    />
                  </div>
                  <div className="flex justify-between gap-4 max-w-[300px] mx-auto">
                    <Link href={`tel:+971563645835`} target="_blank" className="flex flex-1 gap-2 bg-white text-primary items-center justify-center border rounded-full px-4 py-1">
                      <Phone className="text-gold w-5 h-5" />
                      {t("id.call", "Call")}
                    </Link>
                    <Link href={`https://wa.me/971563645835?text=Hi, I'm interested in ${property?.title} at ${property?.location}`} target="_blank" className="flex flex-1 gap-2 bg-white text-primary items-center justify-center border rounded-full px-4 py-1">
                      <BsWhatsapp className="text-gold w-5 h-5" />
                      {t("id.whatsapp", "WhatsApp")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Section - Always display, use URL location if available, otherwise property location */}
            <LocationSection
              title={t("id.location") || "LOCATION"}
              location={displayLocation}
              mapUrl={mapUrl}
              latitude={property?.geoLocation?.latitude}
              longitude={property?.geoLocation?.longitude}
            />
          </div>
        </div>
        <div className="space-y-4">
          <SimilarOffPlans offPlanId={id} limit={3} />
        </div>
      </div>
    </div>
  );
}
