"use client";

import { useState, useEffect } from "react";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactInfoSectionSkeleton from "@/components/contact/ContactInfoSectionSkeleton";
import HeroSection2 from "@/components/common/HeroSection2";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import { useParams } from "next/navigation";
import { validateLocale } from "@/utils/routeSecurity";

function Page() {
  const params = useParams();
  const locale = validateLocale(params?.locale as string);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  // Fetch page content from API
  useEffect(() => {
    const fetchBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("contact", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  return (
    <div className="bg-white min-h-screen">
      {bannerLoading ? (
        <>
          <HeroSection2Skeleton />
          <ContactInfoSectionSkeleton />
        </>
      ) : (
        <>
          <HeroSection2
            title={
              bannerData?.title || "Contact Us"
            }
            imageSrc={
              bannerData?.bannerType === "image" && bannerData?.bannerUrl
                ? bannerData.bannerUrl
                : "/images/blogs/bg-blog.png"
            }
          />
          <ContactInfoSection />
        </>
      )}
    </div>
  );
}

export default Page;
