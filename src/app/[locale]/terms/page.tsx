"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { validateLocale } from "@/utils/routeSecurity";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import TermsPageSkeleton from "@/components/terms/TermsPageSkeleton";
import HeroSection2 from "@/components/common/HeroSection2";

type Section = {
  title: string;
  content?: string[];
  bullets?: string[];
};

function TermsPage() {
  const { t } = useTranslation("terms");
  const params = useParams();
  const locale = validateLocale(params?.locale as string);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const pageTitle = t("title", "Terms and Conditions");
  const rawSections = t("sections", { returnObjects: true });
  const sections: Section[] = Array.isArray(rawSections) ? rawSections : [];

  // Fetch page content from API
  useEffect(() => {
    const fetchBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("terms", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  if (bannerLoading) return <TermsPageSkeleton />;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection2
        title={
          bannerData?.title ||
          t("title", "Terms and Conditions")
        }
        imageSrc={
          bannerData?.bannerType === "image" && bannerData?.bannerUrl
            ? bannerData.bannerUrl
            : "/images/blogs/bg-blog.png"
        }
      />
      <section className="px-4 py-12 text-sm text-[#606060] leading-relaxed">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-base font-semibold text-[#606060]">
                {section.title}
              </h2>
              {section.content?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-1">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TermsPage;
