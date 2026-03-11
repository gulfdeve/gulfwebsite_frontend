"use client";

import { useRouter, useParams } from "next/navigation";
import HeroSection from "@/components/layout/HeroSection";
import HeroSectionSkeleton from "@/components/layout/HeroSectionSkeleton";
import { useTranslation } from "next-i18next";
import SearchBox from "@/components/common/SearchBox";
import FeaturedOffPlansSection from "@/components/layout/FeaturedOffPlansSection";
import OffPlanSection from "@/components/layout/OffPlanSection";
import FindHomeSection from "@/components/layout/FindHomeSection";
import DeveloperSection from "@/components/layout/DeveloperSection";
import TestimonialsSection from "@/components/layout/TestimonialSection";
import BlogSection from "@/components/layout/BlogSection";
import SubscribeNewsLetters from "@/components/layout/SubscribeNewsLetters";
import { useState, useEffect, useCallback } from "react";
import Popup from "@/components/Popup";
import { validateLocale, buildSafeQueryString, buildSafeUrl } from "@/utils/routeSecurity";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";

export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("popupShown");

    if (!hasShown) {
      setIsPopupOpen(true);
      sessionStorage.setItem("popupShown", "true");
    }
  }, []);
  const { t } = useTranslation("home");
  const router = useRouter();
  const params = useParams();
  // Validate locale to prevent injection
  const locale = validateLocale(params?.locale as string);

  // Fetch home page banner data from API
  useEffect(() => {
    const fetchHomeBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("home", locale);
      console.log("Home page banner data:", data);
      setBannerData(data);
      setBannerLoading(false);
    };

    fetchHomeBanner();
  }, [locale]);

  const handleSearch = useCallback((filters: any) => {
    const queryString = buildSafeQueryString(filters);
    const url = buildSafeUrl(`/${locale}/properties`, queryString);
    router.push(url as any);
  }, [locale, router]);

  const handlePopupClose = useCallback(() => setIsPopupOpen(false), []);

  return (
    <>
      <Popup isOpen={isPopupOpen} onClose={handlePopupClose} />
      <main className="flex flex-col min-h-screen">
        <div className="relative w-full h-[400px] md:h-[550px] lg:h-full">
          {bannerLoading ? (
            <HeroSectionSkeleton height="md:h-[700px] lg:h-[800px] h-[450px]" />
          ) : (
            <HeroSection
              title={
                bannerData?.title ||
                t(
                  "hero.title",
                  "Dubai Luxury Real Estate Agency for Premium & Off-Plan Properties"
                )
              }
              subtitle={
                bannerData?.subtitle ||
                t(
                  "hero.subtitle",
                  "Explore elite listings, off-plan investments and exclusive developments in Dubai's top locations."
                )
              }
              mediaType={
                (bannerData?.bannerType as "video" | "image") ||
                (t("hero.mediaType") as "video" | "image") ||
                "video"
              }
              mediaSrc={
                bannerData?.bannerUrl ||
                t("hero.mediaSrc") ||
                "/videos/hero-video.mp4"
              }
              height="md:h-[700px] lg:h-[800px] h-[450px]"
            />
          )}
          <SearchBox noHandover={false} onSearch={handleSearch} />
        </div>
        <div className="mt-14 lg:mt-16">
          <FeaturedOffPlansSection />
        </div>
        <DeveloperSection />
        <OffPlanSection />
        <FindHomeSection />
        <TestimonialsSection />
        <BlogSection />
        <SubscribeNewsLetters />
        {/* <AboutSection /> */}
      </main>
    </>
  );
}
