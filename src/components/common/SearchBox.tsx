"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Dropdown from "../common/Dropdown";
import { Search, Settings, X } from "lucide-react";
import { useTranslation } from "next-i18next";

interface SearchBoxProps {
  noHandover?: boolean;
  onSearch: (filters: any) => void;
  initialFilters?: any;
  showAppliedFiltersInside?: boolean;
  onAppliedFiltersChange?: (
    filters: Array<{ key: string; label: string; value: string }>,
    removeFilter: (key: string) => void
  ) => void;
}

// Property types must match backend/dashboard (property.model + BasicInformation)
const propertyTypeOptions = [
  { label: "All Types", value: "" },
  { label: "Apartment", value: "Apartment" },
  { label: "Villa", value: "Villa" },
  { label: "Townhouse", value: "Townhouse" },
  { label: "Penthouse", value: "Penthouse" },
  { label: "Office", value: "Office" },
  { label: "Studio", value: "Studio" },
];

const areaOptions = [
  { label: "All Areas", value: "" },
  { label: "Dubai", value: "dubai" },
  { label: "Abu Dhabi", value: "abu dhabi" },
  { label: "Sharjah", value: "sharjah" },
  { label: "Ajman", value: "ajman" },
  { label: "Ras Al Khaimah", value: "ras al khaimah" },
  { label: "Fujairah", value: "fujairah" },
  { label: "Umm Al Quwain", value: "umm al quwain" },
];

const handoverOptions = [
  { label: "Any", value: "" },
  { label: "2026-08-03", value: "2026-08-03" },
  { label: "2026-08-05", value: "2026-08-05" },
  { label: "2026-08-06", value: "2026-08-06" },
  { label: "2029-12-01", value: "2029-12-01" },
];

const lifeStyleOptions = [
  { label: "Downtown Dubai", value: "downtown dubai" },
  { label: "Palm Jumeirah", value: "palm jumeirah" },
  { label: "Dubai Land Residence", value: "dubai land residence" },
  { label: "Rashid Yachts and Marina", value: "rashid yachts" },
  { label: "Dubai Creek Harbour", value: "dubai creek" },
  { label: "Comlex (DLRC)", value: "complex" },
];

const offeringTypeOptions = [
  { label: "All", value: "" },
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
];

const priceRanges = [
  { label: "Any Price", value: "" },
  { label: "Under 500,000 AED", value: "0-500000" },
  { label: "500,000 - 1M AED", value: "500000-1000000" },
  { label: "1M - 2M AED", value: "1000000-2000000" },
  { label: "2M - 5M AED", value: "2000000-5000000" },
  { label: "Over 5M AED", value: "5000000-10000000" },
];

const bedroomOptions = [
  { label: "Any", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

// Define initial filters as a constant to ensure consistency
const initialFiltersState = {
  propertyRange: "",
  priceRange: "",
  offeringType: "",
  area: "",
  handover: "",
  lifestyle: "",
  bedrooms: "",
  minPrice: "",
  maxPrice: "",
  title: "",
};

function SearchBox({
  noHandover = false,
  onSearch,
  initialFilters,
  showAppliedFiltersInside = false,
  onAppliedFiltersChange,
}: SearchBoxProps) {
  const { t } = useTranslation("search");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState(initialFiltersState);

  // Update filters when initialFilters changes (from URL params)
  useEffect(() => {
    if (initialFilters) {
      const derivedPriceRange =
        initialFilters.priceRange ||
        (initialFilters.minPrice && initialFilters.maxPrice
          ? `${initialFilters.minPrice}-${initialFilters.maxPrice}`
          : "");

      setFilters({
        ...initialFiltersState,
        ...initialFilters,
        propertyRange:
          initialFilters.propertyRange || initialFilters.type || "",
        offeringType: initialFilters.offeringType || initialFilters.for || "",
        area: initialFilters.area || initialFilters.location || "",
        handover:
          initialFilters.handover ||
          initialFilters.handoverDate ||
          initialFilters.minBeds ||
          "",
        lifestyle:
          initialFilters.lifestyle ||
          initialFilters.lifeStyle ||
          initialFilters.minBaths ||
          "",
        bedrooms: initialFilters.bedrooms || "",
        priceRange: derivedPriceRange,
        minPrice: initialFilters.minPrice
          ? String(initialFilters.minPrice)
          : initialFilters.minPrice === 0
          ? "0"
          : initialFilters.minPrice || "",
        maxPrice: initialFilters.maxPrice
          ? String(initialFilters.maxPrice)
          : initialFilters.maxPrice === 0
          ? "0"
          : initialFilters.maxPrice || "",
        title: initialFilters.title || "",
      });
    } else {
      setFilters(initialFiltersState);
    }
  }, [initialFilters]);

  const handleInputChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const handlePriceRangeChange = (value: string) => {
    if (value === "") {
      setFilters((prev: any) => ({
        ...prev,
        priceRange: "",
        minPrice: "",
        maxPrice: "",
      }));
      return;
    }

    const [min, max] = value.split("-").map(Number);
    setFilters((prev: any) => ({
      ...prev,
      priceRange: value,
      minPrice: min ? min.toString() : "",
      maxPrice: max ? max.toString() : "",
    }));
  };

  const handleSearchProgrammatically = useCallback(
    (searchFilters = filters) => {
      const cleanFilters: any = {};

      if (searchFilters.propertyRange) {
        cleanFilters.propertyRange = searchFilters.propertyRange;
        cleanFilters.type = searchFilters.propertyRange;
      }

      if (searchFilters.offeringType) {
        cleanFilters.offeringType = searchFilters.offeringType;
        cleanFilters.for = searchFilters.offeringType;
      }

      if (searchFilters.area) {
        cleanFilters.area = searchFilters.area;
        cleanFilters.location = searchFilters.area;
      }

      if (searchFilters.handover) {
        cleanFilters.handover = searchFilters.handover;
        cleanFilters.handoverDate = searchFilters.handover;
      }

      if (searchFilters.lifestyle) {
        cleanFilters.lifestyle = searchFilters.lifestyle;
      }

      if (searchFilters.bedrooms) {
        cleanFilters.bedrooms = searchFilters.bedrooms;
      }

      if (searchFilters.priceRange) {
        cleanFilters.priceRange = searchFilters.priceRange;
      }

      if (searchFilters.minPrice) {
        cleanFilters.minPrice =
          parseInt(searchFilters.minPrice as string) || searchFilters.minPrice;
      }

      if (searchFilters.maxPrice) {
        cleanFilters.maxPrice =
          parseInt(searchFilters.maxPrice as string) || searchFilters.maxPrice;
      }

      if (searchFilters.title) {
        cleanFilters.title = searchFilters.title;
      }

      console.log("Searching with filters:", cleanFilters);
      onSearch(cleanFilters);
    },
    [filters, onSearch]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchProgrammatically();
  };

  const getPriceRangeLabel = (minPrice?: string, maxPrice?: string) => {
    const min = minPrice || filters.minPrice;
    const max = maxPrice || filters.maxPrice;

    if (min && max) {
      return `${parseInt(min).toLocaleString()}AED-${parseInt(
        max
      ).toLocaleString()} AED`;
    }
    if (min) {
      return `From ${parseInt(min).toLocaleString()} AED`;
    }
    if (max) {
      return `Up to ${parseInt(max).toLocaleString()} AED`;
    }
    return "Any Price";
  };

  // Get label for a filter value
  const getFilterLabel = (key: string, value: string): string => {
    if (!value) return "";

    switch (key) {
      case "propertyRange":
        return (
          propertyTypeOptions.find((opt) => opt.value === value)?.label || value
        );
      case "area":
        return areaOptions.find((opt) => opt.value === value)?.label || value;
      case "offeringType":
        return (
          offeringTypeOptions.find((opt) => opt.value === value)?.label || value
        );
      case "handover":
        return (
          handoverOptions.find((opt) => opt.value === value)?.label || value
        );
      case "lifestyle":
        return (
          lifeStyleOptions.find((opt) => opt.value === value)?.label || value
        );
      case "bedrooms":
        return (
          bedroomOptions.find((opt) => opt.value === value)?.label || value
        );
      case "priceRange":
        return getPriceRangeLabel();
      default:
        return value;
    }
  };

  // Get applied filters as array
  const appliedFilters = useMemo(() => {
    const applied: Array<{ key: string; label: string; value: string }> = [];

    if (filters.propertyRange) {
      applied.push({
        key: "propertyRange",
        label: getFilterLabel("propertyRange", filters.propertyRange),
        value: filters.propertyRange,
      });
    }

    if (filters.minPrice || filters.maxPrice) {
      applied.push({
        key: "priceRange",
        label: getPriceRangeLabel(filters.minPrice, filters.maxPrice),
        value: `${filters.minPrice}-${filters.maxPrice}`,
      });
    }

    if (filters.offeringType) {
      applied.push({
        key: "offeringType",
        label: getFilterLabel("offeringType", filters.offeringType),
        value: filters.offeringType,
      });
    }

    if (filters.area) {
      applied.push({
        key: "area",
        label: getFilterLabel("area", filters.area),
        value: filters.area,
      });
    }

    if (filters.handover) {
      applied.push({
        key: "handover",
        label: getFilterLabel("handover", filters.handover),
        value: filters.handover,
      });
    }

    if (filters.lifestyle) {
      applied.push({
        key: "lifestyle",
        label: getFilterLabel("lifestyle", filters.lifestyle),
        value: filters.lifestyle,
      });
    }

    if (filters.bedrooms) {
      applied.push({
        key: "bedrooms",
        label: getFilterLabel("bedrooms", filters.bedrooms),
        value: filters.bedrooms,
      });
    }

    return applied;
  }, [filters]);

  // Remove a specific filter
  const removeFilter = useCallback(
    (key: string) => {
      setFilters((prev) => {
        const updated = { ...prev };

        if (key === "priceRange") {
          updated.priceRange = "";
          updated.minPrice = "";
          updated.maxPrice = "";
        } else {
          (updated as any)[key] = "";
        }

        setTimeout(() => {
          handleSearchProgrammatically(updated);
        }, 0);

        return updated;
      });
    },
    [handleSearchProgrammatically]
  );

  const appliedFiltersSignature = useMemo(
    () => JSON.stringify(appliedFilters),
    [appliedFilters]
  );
  const lastSignatureRef = useRef<string | null>(null);

  // Expose applied filters to parent component
  useEffect(() => {
    if (!onAppliedFiltersChange) return;
    if (lastSignatureRef.current === appliedFiltersSignature) return;
    lastSignatureRef.current = appliedFiltersSignature;
    onAppliedFiltersChange(appliedFilters, removeFilter);
  }, [
    appliedFilters,
    appliedFiltersSignature,
    onAppliedFiltersChange,
    removeFilter,
  ]);

  return (
    <div className="absolute bottom-1/8 w-full px-4 sm:px-8 md:px-12 z-20 translate-y-1/2 md:bottom-[-40px] lg:bottom-[-40px] md:translate-y-0">
      <div className="mx-auto max-w-[1300px]">
        <div className="border-2 border-gold bg-white rounded shadow-md mx-auto px-3 py-1 sm:py-1.5 lg:px-5 lg:py-3">
          {/* =================== MOBILE SEARCH =================== */}
          <div className="flex flex-col md:gap-3 sm:gap-2 gap-1 lg:hidden">
            {/* Search + Settings Button */}
            <div className="flex items-center w-full">
              <div className="flex items-center bg-white border border-[#afaaaa89] rounded-lg px-2 py-1 sm:py-2 flex-1">
                <Search className="text-gray-500 mr-1 w-4 h-4" />
                <input
                  placeholder={t("searchPlaceholder", { defaultValue: "Search Project Name" })}
                  className="w-full flex-1 outline-none text-gray-600 text-sm"
                  type="text"
                  value={filters.title} // ✅ Now always a string, never undefined
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowMobileFilters((prev) => !prev)}
                className="ml-1 p-1 bg-white border border-[#afaaaa89] text-black rounded-lg hover:bg-gray-100 transition"
              >
                <Settings
                  className={`transition-transform sm:w-6 sm:h-6 w-5 h-5 duration-300 ${
                    showMobileFilters ? "rotate-90 text-gold" : ""
                  }`}
                />
              </button>
            </div>

            {/* Collapsible Dropdowns for Mobile */}
            <div
              className={`transition-all duration-500 overflow-visible ${
                showMobileFilters
                  ? "max-h-[1000px] opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              {showMobileFilters && (
                <div className="grid grid-cols-2 gap-1 mt-2 p-3 border border-[#ddd] rounded-lg bg-gray-50 shadow-sm relative z-9999">
                  <Dropdown
                    width="100%"
                    label={t("offeringType", { defaultValue: "Offering Type" })}
                    options={offeringTypeOptions}
                    value={filters.offeringType}
                    onChange={(value) =>
                      handleInputChange("offeringType", value)
                    }
                  />

                  <Dropdown
                    width="100%"
                    label={t("propertyType", { defaultValue: "Property Type" })}
                    options={propertyTypeOptions}
                    value={filters.propertyRange}
                    onChange={(value) =>
                      handleInputChange("propertyRange", value)
                    }
                  />

                  <Dropdown
                    width="100%"
                    label={t("area", { defaultValue: "Area" })}
                    options={areaOptions}
                    value={filters.area}
                    onChange={(value) => handleInputChange("area", value)}
                  />

                  <Dropdown
                    width="100%"
                    label="Price Range"
                    options={priceRanges}
                    value={filters.priceRange || ""}
                    onChange={handlePriceRangeChange}
                  />

                  <Dropdown
                    width="100%"
                    label="Handover"
                    options={handoverOptions}
                    value={filters.handover}
                    onChange={(value) => handleInputChange("handover", value)}
                  />

                  <Dropdown
                    width="100%"
                    label={t("bedrooms", { defaultValue: "Bedrooms" })}
                    options={bedroomOptions}
                    value={filters.bedrooms}
                    onChange={(value) => handleInputChange("bedrooms", value)}
                  />

                  <Dropdown
                    width="100%"
                    label="Baths"
                    options={lifeStyleOptions}
                    value={filters.lifestyle}
                    onChange={(value) => handleInputChange("lifestyle", value)}
                  />
                </div>
              )}
            </div>

            {/* Search Button Only - No Reset Button */}
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 flex items-center justify-center bg-primary text-white rounded-full px-2 py-1 sm:py-1.5 hover:bg-primary transition text-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                {t("findButton", { defaultValue: "Find" })}
              </button>
            </div>
          </div>

          {/* =================== DESKTOP FILTERS (Always Visible) =================== */}
          <div className="hidden lg:flex lg:justify-between lg:flex-row lg:items-center gap-3 text-sm lg:text-base items-start">
            <Dropdown
              width="170px"
              label={t("propertyType", { defaultValue: "Property Type" })}
              options={propertyTypeOptions}
              value={filters.propertyRange}
              onChange={(value) => handleInputChange("propertyRange", value)}
            />
            <Dropdown
              width="170px"
              label="Price Range"
              options={priceRanges}
              value={filters.priceRange || ""}
              onChange={handlePriceRangeChange}
            />
            <Dropdown
              width="170px"
              label={t("offeringType", { defaultValue: "Offering Type" })}
              options={offeringTypeOptions}
              value={filters.offeringType}
              onChange={(value) => handleInputChange("offeringType", value)}
            />
            <Dropdown
              width="160px"
              label={t("area", { defaultValue: "Area" })}
              options={areaOptions}
              value={filters.area}
              onChange={(value) => handleInputChange("area", value)}
            />
            <Dropdown
              width="160px"
              label="Handover"
              options={handoverOptions}
              value={filters.handover}
              onChange={(value) => handleInputChange("handover", value)}
            />

            <Dropdown
              width="120px"
              label={t("bedrooms", { defaultValue: "Bedrooms" })}
              options={bedroomOptions}
              value={filters.bedrooms}
              onChange={(value) => handleInputChange("bedrooms", value)}
            />

            <Dropdown
              width="170px"
              label="Life style"
              options={lifeStyleOptions}
              value={filters.lifestyle}
              onChange={(value) => handleInputChange("lifestyle", value)}
            />

            {/* <div className="flex items-center border border-[#afaaaa89] rounded-lg px-4 py-2.5 bg-white text-sm transition-all duration-300 lg:w-[60%]">
              <Search className="text-gray-500 mr-2 w-5 h-5 lg:w-6 lg:h-6" />
              <input
                placeholder="Search Property Name"
                className="outline-none w-full text-gray-600 text-sm"
                type="text"
                value={filters.title} // ✅ Now always a string, never undefined
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div> */}

            {/* Search Button Only - No Reset Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSearch}
                className="flex cursor-pointer items-center font-primary justify-center gap-2 sm:gap-3 bg-primary text-white rounded-full px-1 sm:px-2 lg:px-3.5 py-1 sm:py-2 lg:py-3.5 hover:bg-primary/80 transition text-xs sm:text-sm"
              >
                <Search className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Applied Filters Pills - Only show if showAppliedFiltersInside is true */}
          {showAppliedFiltersInside && appliedFilters.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2 items-center">
              {appliedFilters.map((filter) => (
                <div
                  key={filter.key}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-gold rounded-full bg-white text-primary text-sm font-medium"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.key)}
                    className="ml-1 hover:bg-gold/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${filter.label} filter`}
                  >
                    <X className="w-4 h-4 text-primary" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
