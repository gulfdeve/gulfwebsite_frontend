"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { BsSliders } from "react-icons/bs";

export interface SortFilterProps {
  sortOption: string;
  onSortChange: (option: string) => void;
  options?: { key: string; label: string }[];
}

const SortFilter: React.FC<SortFilterProps> = React.memo(({
  sortOption,
  onSortChange,
  options,
}) => {
  const { t, i18n } = useTranslation("off-plan");
  const [isOpen, setIsOpen] = useState(true);

  const sortOptions = useMemo(
    () =>
      options || [
        { key: "default", label: t("sort.default") || "Default" },
        { key: "newest", label: t("sort.newest") || "Newest" },
        { key: "oldest", label: t("sort.oldest") || "Oldest" },
        { key: "lowestPrice", label: t("sort.lowestPrice") || "Lowest Price" },
        {
          key: "highestPrice",
          label: t("sort.highestPrice") || "Highest Price",
        },
      ],
    [i18n.language, options, t]
  );

  return (
    <div className="space-y-2 sm:space-y-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex-nowrap gap-2 w-fit text-nowrap inline-flex items-center justify-between bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase"
      >
        <>{t("sort.sortBy") || "Sort by"}</>
        <BsSliders className={`transition-transform duration-200`} />
      </button>
      {isOpen && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:grid md:gap-y-2 sm:gap-y-2 sm:items-start sm:gap-x-0 sm:space-x-2.5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-1">
          {sortOptions.map((option) => (
            <label
              key={option.key}
              className="flex items-center gap-1.5 text-[11px] text-primary cursor-pointer select-none whitespace-nowrap sm:gap-2 sm:text-sm sm:whitespace-normal"
            >
              <input
                type="radio"
                name="sort-option"
                value={option.key}
                checked={sortOption === option.key}
                onChange={() => onSortChange(option.key)}
                className="w-3 h-3 sm:w-4 sm:h-4 accent-gold"
              />
              <span className="whitespace-nowrap sm:whitespace-normal">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
});

SortFilter.displayName = "SortFilter";

export default SortFilter;
