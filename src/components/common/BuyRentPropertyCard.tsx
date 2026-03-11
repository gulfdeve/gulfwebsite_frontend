"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { formatPrice } from "@/utils/priceFormatter";
import { BedIcon, BathIcon, SizeIcon } from "./PropertyStatIcons";

export interface BuyRentPropertyCardProps {
  _id: string;
  title: string;
  location: string;
  type: string;
  priceFrom: string;
  bedRange?: string;
  bathRange?: string;
  sizeRange?: string;
  image: string;
  href: string;
  OfferingType?: "For Sale" | "For Rent" | string;
  /** Optional sizing override (Tailwind). */
  containerClassName?: string;
}

function BuyRentPropertyCard({
  _id,
  title,
  location,
  type,
  priceFrom,
  bedRange,
  bathRange,
  sizeRange,
  image,
  href,
  OfferingType,
  containerClassName,
}: BuyRentPropertyCardProps) {
  const { t } = useTranslation("common");

  const sanitizeRange = (value?: string) => {
    if (!value) return value;
    let result = String(value);
    if (/bedrooms?/gi.test(result)) result = result.replace(/bedrooms?/gi, "");
    if (/bathrooms?/gi.test(result))
      result = result.replace(/bathrooms?/gi, "");
    return result.trim();
  };

  const formatSizeRange = (value?: string) => {
    if (!value || value === "N/A") return value;
    const trimmed = String(value).trim();
    if (
      /sq\s*ft|sqft|sq\.\s*ft|square\s*feet|m²|m2|sq\s*m|square\s*meters?/gi.test(
        trimmed
      )
    ) {
      return trimmed;
    }
    return `${trimmed} sq ft`;
  };

  const cleanBedRange = sanitizeRange(bedRange);
  const cleanBathRange = sanitizeRange(bathRange);
  const formattedSizeRange = formatSizeRange(sizeRange);

  const baseClasses =
    "bg-white rounded-xl sm:rounded-lg w-full border border-gold/30 sm:border-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden";
  // Fixed height for Buy/Rent pages; extra space goes to image (not empty gap)
  const sizeClasses =
    containerClassName ?? "h-[390px] sm:h-[540px]";

  return (
    <div className={`${baseClasses} ${sizeClasses}`}>
      {/* Price and Type */}
      <div className="px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3 flex items-center justify-between gap-2 shrink-0">
        <h3 className="text-base sm:text-xl font-bold text-primary leading-tight">
          {formatPrice(priceFrom)}
        </h3>
        {type && type !== "N/A" && (
          <span className="border border-primary text-primary text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
            {type}
          </span>
        )}
      </div>

      {/* Image (flexes to fill height) */}
      <Link
        href={href as any}
        className="block px-2 sm:px-3 flex-1 min-h-[170px] sm:min-h-0"
      >
        <div className="relative h-full overflow-hidden rounded-lg sm:rounded-xl">
          <Image
            src={image || "/images/properties/default.jpg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover"
            priority={false}
          />
          {OfferingType && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-5 bg-gold text-primary text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
              {OfferingType}
            </div>
          )}
        </div>
      </Link>

      {/* Stats */}
      <div className="px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 flex-wrap shrink-0 border-b border-gray-100 sm:border-0">
        {cleanBedRange && cleanBedRange !== "N/A" && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <BedIcon />
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {cleanBedRange}
            </span>
          </div>
        )}
        {cleanBathRange && cleanBathRange !== "N/A" && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <BathIcon />
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {cleanBathRange}
            </span>
          </div>
        )}
        {formattedSizeRange && formattedSizeRange !== "N/A" && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <SizeIcon />
            <span className="text-xs sm:text-sm text-gray-700 font-medium whitespace-nowrap">
              {formattedSizeRange}
            </span>
          </div>
        )}
      </div>

      {/* Title & Location */}
      <div className="px-3 sm:px-3 py-2 sm:pt-3 sm:pb-2 shrink-0">
        <div className="flex items-start gap-2 sm:gap-1.5">
          <CiLocationOn
            className="mt-0.5 text-primary size-4 sm:size-6 flex-shrink-0"
            strokeWidth={0.5}
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-xl font-bold text-primary line-clamp-2 sm:line-clamp-1 sm:mb-1">
              {title}
            </h4>
            <h5 className="text-xs sm:text-sm text-gray-600 line-clamp-1">
              {location}
            </h5>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="px-4 pb-3 sm:pb-2 pt-3 sm:pt-4 flex items-center justify-center sm:justify-between sm:gap-4 shrink-0 border-t border-gray-100 sm:border-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `tel:+971563645835`;
          }}
          className="flex items-center justify-center gap-1 sm:gap-2 group min-w-0 flex-1 sm:flex-initial sm:min-w-[90px]"
          aria-label="Call"
        >
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-md group-hover:shadow-lg shrink-0">
            <FaPhone className="text-gold rotate-90 text-xs sm:text-base" />
          </div>
          <span className="text-[10px] sm:text-[12px] text-gray-700 font-medium truncate sm:overflow-visible sm:text-clip sm:whitespace-nowrap">
            {t("featuredCard.call", "Call")}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `mailto:info@gulfestates.ae`;
          }}
          className="flex items-center sm:pr-0 pr-3 justify-center gap-1 sm:gap-2 group min-w-0 flex-1 sm:flex-initial sm:min-w-[96px]"
          aria-label="Email"
        >
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-md group-hover:shadow-lg shrink-0">
            <MdEmail className="text-gold size-3 sm:size-5" />
          </div>
          <span className="text-[10px] sm:text-[12px] text-gray-700 font-medium truncate sm:overflow-visible sm:text-clip sm:whitespace-nowrap">
            {t("featuredCard.email", "Email")}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open(
              `https://wa.me/971563645835?text=Hi, I'm interested in ${title}`,
              "_blank"
            );
          }}
          className="flex items-center justify-center gap-1 sm:gap-2 group min-w-0 flex-1 sm:flex-initial sm:min-w-[118px]"
          aria-label="WhatsApp"
        >
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-md group-hover:shadow-lg shrink-0">
            <IoLogoWhatsapp className="text-gold size-3 sm:size-5" />
          </div>
          <span className="text-[10px] sm:text-[12px] text-gray-700 font-medium sm:overflow-visible sm:text-clip sm:whitespace-nowrap">
            {t("featuredCard.whatsapp", "WhatsApp")}
          </span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(BuyRentPropertyCard);

