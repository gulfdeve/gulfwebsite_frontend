"use client";

import React, { useState } from "react";
import Dropdown from "../common/Dropdown";
import { Search, Settings } from "lucide-react";
import { useTranslation } from "next-i18next";

interface SearchOffPlanProps {
  onSearch: (filters: any) => void;
}

// Off Plan specific options
const propertyTypeOptions = [
  { label: "All Types", value: "" },
  { label: "Apartment", value: "Apartment" },
  { label: "Villa", value: "Villa" },
  { label: "Townhouse", value: "Townhouse" },
  { label: "Penthouse", value: "Penthouse" },
  { label: "Office", value: "Office" }
];

const locationOptions = [
  { label: "All Locations", value: "" },
  { label: "Dubai", value: "Dubai" },
  { label: "Abu Dhabi", value: "Abu dhabi" },
  { label: "Sharjah", value: "Sharjah" },
  { label: "Ajman", value: "Sjman" },
  { label: "Ras Al Khaimah", value: "Ras al khaimah" },
  { label: "Fujairah", value: "Fujairah" }
];

const developerOptions = [
  { label: "All Developers", value: "" },
  { label: "Emaar", value: "Emaar" },
  { label: "Damac", value: "Damac" },
  { label: "Nakheel", value: "Nakheel" },
  { label: "Meraas", value: "Meraas" },
  { label: "Dubai Properties", value: "Dubai properties" },
  { label: "Aldar", value: "Aldar" }
];

const handoverOptions = [
  { label: "Any Handover", value: "" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028+", value: "2028" }
];

const bedsOptions = [
  { label: "Any Beds", value: "" },
  { label: "Studio", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5+", value: "5" }
];

const priceRanges = [
  { label: "Any Price", value: "" },
  { label: "Under 500,000 AED", value: "0-500000" },
  { label: "500,000 - 1M AED", value: "500000-1000000" },
  { label: "1M - 2M AED", value: "1000000-2000000" },
  { label: "2M - 5M AED", value: "2000000-5000000" },
  { label: "Over 5M AED", value: "5000000-10000000" }
];

const statusOptions = [
  { label: "Any Status", value: "" },
  { label: "Available", value: "available" },
  { label: "Coming Soon", value: "coming soon" },
  { label: "Sold Out", value: "sold out" }
];

function SearchOffPlan({ onSearch }: SearchOffPlanProps) {
  const { t } = useTranslation("search");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    developer: "",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    handover: "",
    status: "",
    title: "",
  });

  const handleInputChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Auto-search when filters change
    const hasActiveFilters = Object.values(newFilters).some(val => val !== "");
    if (hasActiveFilters) {
      const timer = setTimeout(() => {
        handleSearchProgrammatically(newFilters);
      }, 800);
      return () => clearTimeout(timer);
    }
  };

  const handlePriceRangeChange = (value: string) => {
    if (value === "") {
      setFilters(prev => ({ ...prev, minPrice: "", maxPrice: "" }));
      return;
    }
    
    const [min, max] = value.split('-').map(Number);
    setFilters(prev => ({ 
      ...prev, 
      minPrice: min.toString(), 
      maxPrice: max.toString() 
    }));
  };

  const handleSearchProgrammatically = (searchFilters = filters) => {
    // Clean the filters - remove empty values
    const cleanFilters: any = {};
    
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        // Convert numeric values to numbers for API
        if (['minPrice', 'maxPrice', 'minBeds'].includes(key)) {
          cleanFilters[key] = parseInt(value) || value;
        } else {
          cleanFilters[key] = value;
        }
      }
    });

    console.log("Searching off-plan with filters:", cleanFilters);
    onSearch(cleanFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchProgrammatically();
  };

  return (
    <div className="absolute bottom-1/3 w-full px-4 z-20 translate-y-1/2 md:bottom-[-40px] md:translate-y-0">
      <div className="mx-auto">
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-md lg:max-w-[1000px] mx-auto p-3 lg:p-5">
          {/* =================== MOBILE SEARCH =================== */}
          <div className="flex flex-col gap-3 lg:hidden">
            {/* Search + Settings Button */}
            <div className="flex items-center w-full">
              <div className="flex items-center bg-white border border-[#afaaaa89] rounded-lg px-3 py-2 flex-1">
                <Search className="text-gray-500 mr-2 w-5 h-5" />
                <input
                  placeholder={t("searchPlaceholder") || "Search off-plan projects..."}
                  className="flex-1 outline-none text-gray-600 text-sm"
                  type="text"
                  value={filters.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowMobileFilters((prev) => !prev)}
                className="ml-2 p-2 bg-white border border-[#afaaaa89] text-black rounded-lg hover:bg-gray-100 transition"
              >
                <Settings
                  className={`transition-transform duration-300 ${
                    showMobileFilters ? "rotate-90 text-[#F2762E]" : ""
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
              <div className="flex flex-col gap-3 mt-2 p-3 border border-[#ddd] rounded-lg bg-gray-50 shadow-sm relative z-[9999]">
                <Dropdown
                  width="100%"
                  label={t("area") || "Location"}
                  options={locationOptions}
                  value={filters.location}
                  onChange={(value) => handleInputChange("location", value)}
                />

                <Dropdown
                  width="100%"
                  label={t("propertyType") || "Property Type"}
                  options={propertyTypeOptions}
                  value={filters.type}
                  onChange={(value) => handleInputChange("type", value)}
                />

                <Dropdown
                  width="100%"
                  label={t("developer") || "Developer"}
                  options={developerOptions}
                  value={filters.developer}
                  onChange={(value) => handleInputChange("developer", value)}
                />

                <Dropdown 
                  width="100%" 
                  label="Price Range" 
                  options={priceRanges}
                  value={`${filters.minPrice}-${filters.maxPrice}`}
                  onChange={handlePriceRangeChange}
                />

                <Dropdown
                  width="100%"
                  label="Bedrooms"
                  options={bedsOptions}
                  value={filters.minBeds}
                  onChange={(value) => handleInputChange("minBeds", value)}
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
                  label="Status"
                  options={statusOptions}
                  value={filters.status}
                  onChange={(value) => handleInputChange("status", value)}
                />
              </div>
            </div>

            {/* Search Button Only - No Reset Button */}
            <div className="flex gap-2 mt-2">
              <button 
                onClick={handleSearch}
                className="flex-1 flex items-center justify-center bg-blue-500 text-white rounded-lg px-6 py-2.5 hover:bg-blue-600 transition text-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                {t("findButton") || "Search"}
              </button>
            </div>
          </div>

          {/* =================== DESKTOP FILTERS (Always Visible) =================== */}
          <div className="hidden lg:flex lg:flex-row lg:flex-wrap gap-3 text-sm lg:text-base items-start">
            <Dropdown
              width="180px"
              label={t("area") || "Location"}
              options={locationOptions}
              value={filters.location}
              onChange={(value) => handleInputChange("location", value)}
            />

            <Dropdown
              width="180px"
              label={t("propertyType") || "Property Type"}
              options={propertyTypeOptions}
              value={filters.type}
              onChange={(value) => handleInputChange("type", value)}
            />

            <Dropdown
              width="180px"
              label={t("developer") || "Developer"}
              options={developerOptions}
              value={filters.developer}
              onChange={(value) => handleInputChange("developer", value)}
            />

            <Dropdown
              width="200px"
              label="Price Range"
              options={priceRanges}
              value={`${filters.minPrice}-${filters.maxPrice}`}
              onChange={handlePriceRangeChange}
            />

            <Dropdown
              width="150px"
              label="Bedrooms"
              options={bedsOptions}
              value={filters.minBeds}
              onChange={(value) => handleInputChange("minBeds", value)}
            />

            <Dropdown
              width="150px"
              label="Handover"
              options={handoverOptions}
              value={filters.handover}
              onChange={(value) => handleInputChange("handover", value)}
            />

            <Dropdown
              width="150px"
              label="Status"
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleInputChange("status", value)}
            />

            <div className="flex items-center border border-[#afaaaa89] rounded-lg px-4 py-2.5 bg-white text-sm transition-all duration-300 lg:w-[47%]">
              <Search className="text-gray-500 mr-2 w-5 h-5 lg:w-6 lg:h-6" />
              <input
                placeholder={t("searchPlaceholder") || "Search project name"}
                className="outline-none w-full text-gray-600 text-sm"
                type="text"
                value={filters.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            {/* Search Button Only - No Reset Button */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSearch}
                className="flex cursor-pointer items-center font-primary justify-center gap-2 sm:gap-3 bg-blue-500 text-white rounded-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 hover:bg-blue-600 transition w-full lg:w-38 text-xs sm:text-sm"
              >
                <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                {t("findButton") || "Search"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchOffPlan;