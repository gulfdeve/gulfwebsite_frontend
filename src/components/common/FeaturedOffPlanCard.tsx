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

export interface FeaturedOffPlanCardProps {
  _id: string;
  title: string;
  location: string;
  developer?: string;
  type: string;
  handover?: string;
  priceFrom: string;
  paymentPlan?: string;
  bedRange?: string;
  bathRange?: string;
  sizeRange?: string;
  image: string;
  href: string;
  locale?: string;
  OfferingType?: "For Sale" | "For Rent" | string;
  /** Single value for both breakpoints (e.g. "650px"). Ignored if containerClassName is set. */
  minHeight?: string;
  /**
   * Optional Tailwind classes for card size. Use this to set different height/width for mobile vs desktop.
   * Examples:
   * - "h-[480px] sm:h-[640px]" for responsive height
   * - "w-full max-w-[320px] sm:max-w-[380px]" for responsive width
   * - "h-[500px] sm:h-[620px] w-full max-w-[340px]"
   */
  containerClassName?: string;
  /**
   * If true, the contact row is pushed to the bottom of the card (creates a visible gap above it on tall cards).
   * Set to false on pages like Buy/Rent to keep content compact.
   */
  pinContactToBottom?: boolean;
}

function FeaturedOffPlanCard({
  _id,
  title,
  location,
  developer,
  type,
  handover,
  priceFrom,
  paymentPlan,
  bedRange,
  bathRange,
  sizeRange,
  image,
  href,
  locale = "en",
  OfferingType,
  minHeight,
  containerClassName,
  pinContactToBottom = true,
}: FeaturedOffPlanCardProps) {
  const { t } = useTranslation("common");
  const hasDetails = Boolean(paymentPlan || developer || handover);
  const shouldPinContact = pinContactToBottom;

  const sanitizeRange = (value?: string) => {
    if (!value) return value;
    let result = String(value);
    if (/bedrooms?/gi.test(result)) {
      result = result.replace(/bedrooms?/gi, "");
    }
    if (/bathrooms?/gi.test(result)) {
      result = result.replace(/bathrooms?/gi, "");
    }
    return result.trim();
  };
  const cleanBedRange = sanitizeRange(bedRange);
  const cleanBathRange = sanitizeRange(bathRange);

  // Format size range - add "sq ft" if unit doesn't exist
  const formatSizeRange = (value?: string) => {
    if (!value || value === "N/A") return value;
    let result = String(value).trim();
    // Check if any unit already exists (sq ft, sqft, sq.ft, square feet, m², etc.)
    if (
      !/sq\s*ft|sqft|sq\.\s*ft|square\s*feet|m²|m2|sq\s*m|square\s*meters?/gi.test(
        result
      )
    ) {
      result = `${result} sq ft`;
    }
    return result;
  };
  const formattedSizeRange = formatSizeRange(sizeRange);

  const baseClasses =
    "bg-white rounded-xl sm:rounded-lg border border-gold/30 sm:border-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden min-h-0 [contain:layout]";
  const sizeClasses =
    containerClassName ?? "w-full h-[520px] sm:h-[610px]";
  const inlineStyle =
    !containerClassName && minHeight
      ? { minHeight, height: minHeight }
      : undefined;

  return (
    <div
      className={`${baseClasses} ${sizeClasses}`}
      style={inlineStyle}
    >
      {/* Price and Type — mobile: compact */}
      <div className="px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-1 shrink-0">
        <h3 className="text-base sm:text-xl font-bold text-primary leading-tight">
          {formatPrice(priceFrom)}
        </h3>
        {type && type !== "N/A" && (
          <span className="border border-primary text-primary text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
            {type}
          </span>
        )}
      </div>

      {/* Image + tap area */}
      <Link href={href as any} className="cursor-pointer block relative shrink-0">
        <div className="px-2 sm:px-3 relative h-44 sm:h-64 overflow-hidden rounded-lg sm:rounded-xl">
          <Image
            src={image || "/images/properties/default.jpg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
          {OfferingType && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-5 bg-gold text-primary text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
              {OfferingType}
            </div>
          )}
        </div>
      </Link>

      {/* Icons & Stats — mobile: single row, smaller */}
      <div className="px-3 sm:px-5 py-2 sm:py-3 flex items-center  justify-between gap-2 sm:gap-4 flex-wrap shrink-0 border-b border-gray-100 sm:border-0">
        {cleanBedRange && cleanBedRange !== "N/A" && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Image
              src="/images/featured-prop/bed.svg"
              alt="bed"
              width={18}
              height={18}
              className="opacity-70 w-4 h-4 sm:w-[18px] sm:h-[18px]"
            />
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {cleanBedRange}
            </span>
          </div>
        )}
        {cleanBathRange && cleanBathRange !== "N/A" && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Image
              src="/images/featured-prop/bath-tub.svg"
              alt="bath"
              width={18}
              height={18}
              className="opacity-70 w-4 h-4 sm:w-[18px] sm:h-[18px]"
            />
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {cleanBathRange}
            </span>
          </div>
        )}
        {formattedSizeRange && formattedSizeRange !== "N/A" && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Image
              src="/images/featured-prop/size.svg"
              alt="size"
              width={18}
              height={18}
              className="opacity-70 w-4 h-4 sm:w-[18px] sm:h-[18px]"
            />
            <span className="text-xs sm:text-sm text-gray-700 font-medium leading-tight whitespace-normal break-words max-w-[120px] sm:max-w-none sm:whitespace-nowrap">
              {formattedSizeRange}
            </span>
          </div>
        )}
      </div>

      {/* Title & Location — mobile: prominent, less padding */}
      <div
        className={`px-3 sm:px-3 py-2 sm:pt-3 ${
          shouldPinContact ? "flex-1" : ""
        } flex flex-col min-h-0`}
      >
        <div className="flex items-start gap-2 pb-0 sm:pb-2 sm:gap-1.5 shrink-0">
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

        {/* Payment / Developer / Handover — mobile: compact list */}
        {hasDetails && (
          <div
            className={`space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm ${
              shouldPinContact ? "flex-1" : ""
            } mt-2 sm:mt-0`}
          >
            {paymentPlan && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-gray-500 sm:shrink-0 sm:min-w-[110px]">
                  {t("featuredCard.paymentPlan", "Payment Plan")}:
                </span>
                <span className="text-gray-800 font-semibold truncate sm:flex-1 sm:text-right sm:overflow-visible sm:text-clip">
                  {paymentPlan || "N/A"}
                </span>
              </div>
            )}
            {developer && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-gray-500 sm:shrink-0 sm:min-w-[110px]">
                  {t("featuredCard.developer", "Developer")}:
                </span>
                <span className="text-gray-800 font-semibold line-clamp-1 truncate sm:flex-1 sm:text-right sm:line-clamp-none sm:overflow-visible sm:text-clip">
                  {developer}
                </span>
              </div>
            )}
            {handover && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-gray-500 sm:shrink-0 sm:min-w-[110px]">
                  {t("featuredCard.handover", "Handover")}:
                </span>
                <span className="text-gray-800 font-semibold sm:flex-1 sm:text-right">
                  {handover}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact — mobile: small icons + labels; desktop: larger icons + labels */}
      <div
        className={`px-4 pb-3 sm:pb-2 pt-3 sm:pt-4 flex items-center justify-center sm:justify-between sm:gap-4 ${
          shouldPinContact ? "mt-auto" : ""
        } shrink-0 border-t border-gray-100 sm:border-0`}
      >
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

export default React.memo(FeaturedOffPlanCard);
