"use client";
import { useState, useCallback, useEffect } from "react";
import SearchBox from "@/components/common/SearchBox";
import PropertyGrid from "@/components/rent/PropertyGrid";
import { useTranslation } from "next-i18next";
import { X } from "lucide-react";
import HeroSection2 from "@/components/common/HeroSection2";
import BuyRentPageSkeleton from "@/components/rent/BuyRentPageSkeleton";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import { useParams } from "next/navigation";
import { validateLocale } from "@/utils/routeSecurity";

function BuyPage() {
  const { t } = useTranslation("buy-rent");
  const params = useParams();
  const locale = validateLocale(params?.locale as string);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [filters, setFilters] = useState<any>({});
  const [appliedFilters, setAppliedFilters] = useState<
    Array<{ key: string; label: string; value: string }>
  >([]);
  const [removeFilterFn, setRemoveFilterFn] = useState<
    ((key: string) => void) | null
  >(null);

  const handleSearch = useCallback((newFilters: any) => {
    setFilters({ ...newFilters });
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
      const data = await fetchPageContentByType("buy", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  if (bannerLoading) return <BuyRentPageSkeleton />;

  return (
    <div className="min-h-screen bg-white relative">
      <HeroSection2
        title={
          bannerData?.title ||
          t("buyPage.bannerTitle", "Buy Properties")
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

      {/* Applied Filters Pills */}
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

      <div className="flex mt-10 sm:mt-10 items-center justify-center w-full">
        <h2 className="text-gold text-2xl sm:text-3xl font-semibold">
          <span className="text-primary">
            {t("buyPage.sectionHighlight", "BUY")}{" "}
          </span>
          {t("buyPage.sectionTitle", "PROPERTIES")}
          <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
        </h2>
      </div>
      <div className="border">
        <PropertyGrid purpose="buy" filters={filters} />
      </div>
    </div>
  );
}

export default BuyPage;
