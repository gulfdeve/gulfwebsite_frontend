"use client";

import { useState, useCallback, useEffect } from "react";
import OffPlanList from "@/components/offPlanPage/OffPlanList";
import OffPlanPageSkeleton from "@/components/offPlanPage/OffPlanPageSkeleton";
import { useTranslation } from "next-i18next";
import SearchBox from "@/components/common/SearchBox";
import { X } from "lucide-react";
import HeroSection2 from "@/components/common/HeroSection2";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import { useParams } from "next/navigation";
import { validateLocale } from "@/utils/routeSecurity";

export interface SearchFilters {
  searchQuery: string;
  location: string;
  developer: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  handoverDate: string;
  status: string;
}

export default function OffPlanePageClient() {
  const { t } = useTranslation("off-plan");
  const params = useParams();
  const locale = validateLocale(params?.locale as string);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchQuery: "",
    location: "",
    developer: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    handoverDate: "",
    status: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<
    Array<{ key: string; label: string; value: string }>
  >([]);
  const [removeFilterFn, setRemoveFilterFn] = useState<
    ((key: string) => void) | null
  >(null);

  const handleSearch = useCallback((searchData: any) => {
    setSearchFilters({
      searchQuery: searchData.title || "",
      location: searchData.location || "",
      developer: searchData.developer || "",
      type: searchData.type || "",
      minPrice: searchData.minPrice || "",
      maxPrice: searchData.maxPrice || "",
      bedrooms: searchData.bedrooms || "",
      handoverDate: searchData.handoverDate || "",
      status: searchData.status || "",
    });
  }, []);

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

  const handleRemoveFilter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const key = (e.currentTarget as HTMLButtonElement).getAttribute("data-filter-key");
    if (key && removeFilterFn) removeFilterFn(key);
  }, [removeFilterFn]);

  // Fetch page content from API
  useEffect(() => {
    const fetchBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("offplan", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  if (bannerLoading) {
    return <OffPlanPageSkeleton />;
  }

  return (
    <div className="bg-white relative min-h-screen overflow-hidden">
      <HeroSection2
        title={
          bannerData?.title ||
          t("pageHeading.bannerTitle", "Off Plan Properties for Sale in UAE")
        }
        imageSrc={
          bannerData?.bannerType === "image" && bannerData?.bannerUrl
            ? bannerData.bannerUrl
            : "/images/blogs/bg-blog.png"
        }
      />
      <div className="absolute w-full z-20 sm:mt-[-55px] mt-[-20px]">
        <SearchBox
          noHandover={false}
          onSearch={handleSearch}
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
                data-filter-key={filter.key}
                onClick={handleRemoveFilter}
                className="ml-1 hover:bg-gold/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${filter.label} filter`}
              >
                <X className="w-4 h-4 text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center  w-full mt-12 sm:mt-10">
        <h2 className="text-gold md:text-2xl p-4 text-xl font-semibold">
          <span className="text-primary">
            {t("pageHeading.sectionHighlight", "Explore Premium Off-Plan")}{" "}
          </span>
          {t("pageHeading.sectionTitle", "Apartments & Villas")}
          <div className="max-w-[600px] mt-1 underline-gradient" />
        </h2>
      </div>
      <div className="mt-6">
        <OffPlanList searchFilters={searchFilters} />
      </div>
    </div>
  );
}

