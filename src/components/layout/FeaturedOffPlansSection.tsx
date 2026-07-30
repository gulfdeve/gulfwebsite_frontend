"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import FeaturedOffPlanCard from "@/components/common/FeaturedOffPlanCard";
import FeaturedOffPlansSectionSkeleton from "./FeaturedOffPlansSectionSkeleton";
import { getSlug, getLocalizedValue } from "@/utils/localization";

interface OffPlanProperty {
  _id: string;
  slug?: string;
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

const SWIPER_BREAKPOINTS = {
  0: { slidesPerView: 1, spaceBetween: 20 },
  640: { slidesPerView: 2, spaceBetween: 20 },
  940: { slidesPerView: 2, spaceBetween: 20 },
  1100: { slidesPerView: 3, spaceBetween: 20 },
  1440: { slidesPerView: 3, spaceBetween: 24 },
};

const SWIPER_NAVIGATION = {
  nextEl: ".swiper-button-next-custom",
  prevEl: ".swiper-button-prev-custom",
};

const SWIPER_AUTOPLAY = {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};

const FeaturedOffPlansSection = () => {
  const { t } = useTranslation("featuredProperties");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [properties, setProperties] = useState<OffPlanProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${API_URL}/api/offplans?page=1&limit=4&locale=${locale}&excludeContent=true`
        );

        if (!res.ok) throw new Error("Failed to fetch off-plans");

        const data = await res.json();
        if (data.success) {
          const rawProperties = data.data?.items || data.data || data.offplans || [];
          // Transform multilingual objects to strings based on locale
          const transformedProperties = rawProperties.map((property: any) => {
            // Extract slug based on locale
            const slugValue = getSlug(property.slug, locale, property._id || property.id);

            return {
              ...property,
              _id: property._id || property.id,
              slug: slugValue,
              title: getLocalizedValue(property.title, locale),
              location: getLocalizedValue(property.location, locale),
              developer: property.developer || '',
              type: property.type || '',
              handover: property.handover || '',
              priceFrom: property.starting_price || property.priceFrom || '',
              paymentPlan: property.payment_plan || property.paymentPlan || '',
              bedRange: property.bedroom || property.bedRange || '',
              bathRange: property.bathroom || property.bathRange || '',
              sizeRange: property.area_size || property.sizeRange || '',
              image: property.gallery?.[0] || property.image || '',
              images: property.gallery || property.images || [],
            };
          });
          setProperties(transformedProperties);
        }
      } catch (error) {
        console.error("Error fetching off-plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [locale]);

  if (loading) return <FeaturedOffPlansSectionSkeleton />;

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="text-black">
      <div className="-mt-32 md:mt-0 mb-4">
        {/* Header */}
        <div className="p-2 md:mt-0 mt-20 container max-w-[1200px] text-center mb-8 lg:mb-12 mx-auto">
          <h2 className="text-lg inline-block lg:text-2xl font-bold uppercase mb-4 tracking-[1px]">
            <span className="text-primary">{t("headerTitle1", "Gulf Estates Trusted Dubai")} </span>{" "}
            <span className="text-gold">{t("headerTitle2", "Real Estate")} </span>{" "}
            <span className="text-primary">{t("headerTitle3", "Experts")}</span>
            <div className="mx-auto underline-gradient" />
          </h2>
          <p className="text-[14px] text-[#7E8492] md:max-w-[1178px] mx-auto">
            {t("headerDescription")}
          </p>
        </div>
        {/* Property Cards */}
        <div className="bg-primary py-[20px]">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start justify-between mb-4 gap-4">
              <div>
                <h3 className="text-xl lg:text-2xl w-fit text-white font-bold uppercase tracking-[1px]">
                  <span>{t("keyListingsTitle", "Luxury Homes, Off-Plan Investments & High-ROI Opportunities")}</span>
                  <div className="max-w-[450px] underline-gradient" />
                </h3>
              </div>
              {/* Navigation Buttons - desktop only */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  className="swiper-button-prev-custom bg-gold rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
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
                  className="swiper-button-next-custom bg-gold rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
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
          </div>
          <div className="p-4 max-w-[1400px] mx-auto">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={SWIPER_BREAKPOINTS}
              navigation={SWIPER_NAVIGATION}
              autoplay={SWIPER_AUTOPLAY}
              loop={properties.length > 4}
              className="featured-offplans-swiper"
            >
              {properties.map((property) => (
                <SwiperSlide key={property._id} className="h-auto">
                  <FeaturedOffPlanCard
                    _id={property?._id}
                    title={property?.title}
                    location={property?.location}
                    developer={property.developer}
                    type={property?.type}
                    handover={property?.handover}
                    priceFrom={property?.priceFrom}
                    paymentPlan={property?.paymentPlan}
                    bedRange={property?.bedRange}
                    bathRange={property?.bathRange}
                    sizeRange={property?.sizeRange}
                    image={property?.image}
                    href={`/${locale}/off-plan-properties-uae/${property?.slug || property?._id}`}
                    locale={locale}
                    minHeight="610px"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigation Buttons - mobile only, below cards, right-aligned */}
            <div className="hidden max-md:flex items-center justify-end gap-3 mt-6">
              <button
                className="swiper-button-prev-custom bg-gold rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
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
                className="swiper-button-next-custom bg-gold rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
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
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeaturedOffPlansSection);
