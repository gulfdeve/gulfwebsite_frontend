"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { formatPrice } from "@/utils/priceFormatter";
import { BedIcon, BathIcon, SizeIcon } from "./PropertyStatIcons";

export interface OffPlanCardProps {
  _id: string;
  title: string;
  location: string;
  developer: string;
  type: string;
  handover: string;
  priceFrom: string;
  paymentPlan: string;
  bedRange?: string;
  bathRange?: string;
  sizeRange?: string;
  image: string;
  href: string;
}

function OffPlanCard({
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
}: OffPlanCardProps) {
  const { t } = useTranslation("off-plan");

  return (
    <div className="bg-white text-black rounded-lg w-full shadow-[-8px_8px_8px_rgba(0,0,0,0.6)] hover:shadow-[-12px_12px_12px_rgba(0,0,0,0.7)] transition-all duration-300 max-w-md sm:max-w-none mx-auto">
      {/* Entire content area wrapped in Link */}
      <Link href={href as any} className="cursor-pointer block">
        <div className="h-48 sm:h-64 rounded-t-lg overflow-hidden bg-gray-200">
          <Image
            src={image || "/images/properties/default.jpg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-3 sm:p-4">
          <h6 className="text-xl sm:text-2xl font-bold mb-1 truncate" title={title}>
            {title}
          </h6>

          <p
            className="text-sm sm:text-base font-light font-primary mb-1 line-clamp-2 min-h-10"
            title={location}
          >
            {location}
          </p>

          <div className="space-y-1 sm:space-y-2">
            <p className="text-sm sm:text-lg font-light">
              <span className="font-bold">{t("offPlanList.developer")}:</span> {developer}
            </p>

            <p className="text-sm sm:text-lg font-light">
              <span className="font-bold">{t("offPlanList.type")}:</span> {type}
            </p>

            <p className="text-sm sm:text-lg font-light">
              <span className="font-bold">{t("offPlanList.handoverDate")}:</span> {handover}
            </p>

            <p className="text-sm sm:text-lg font-light">
              <span className="font-bold">{t("offPlanList.priceFrom")}:</span> {formatPrice(priceFrom)}
            </p>

            <p className="text-sm sm:text-lg font-light">
              <span className="font-bold">{t("offPlanList.paymentPlan")}:</span> {paymentPlan}
            </p>
          </div>

          <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-700 mt-3 gap-y-2">
            {bedRange && bedRange !== "N/A" && (
              <div className="flex items-center pe-3">
                <div className="flex items-center gap-1 border-r-2 pr-3 h-4">
                  <BedIcon className="w-4 h-4 opacity-70" />
                  <p>{bedRange}</p>
                </div>
              </div>
            )}

            {bathRange && bathRange !== "N/A" && (
              <div className="flex items-center pe-3">
                <div className="flex items-center gap-1 border-r-2 pr-3 h-4">
                  <BathIcon className="w-4 h-4 opacity-70" />
                  <p>{bathRange}</p>
                </div>
              </div>
            )}

            {sizeRange && sizeRange !== "N/A" && (
              <div className="flex items-center">
                <div className="flex items-center gap-1 h-5">
                  <SizeIcon className="w-4 h-4 opacity-70" />
                  <p>{sizeRange}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Buttons */}
      <div className="px-3 sm:px-4 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            onClick={() => (window.location.href = `tel:+971563645835`)}
            className="text-black bg-white border border-gray-300 rounded-sm text-sm px-3 py-1 flex items-center gap-1 font-primary font-extralight tracking-[0.8px] hover:bg-gray-100 transition"
          >
            <Image
              src="/images/featured-prop/call.svg"
              alt="Call"
              width={16}
              height={16}
            />
            {t("offPlanList.call")}
          </button>

          <button
            onClick={() => (window.location.href = `mailto:info@gulfestates.ae`)}
            className="text-black bg-white border border-gray-300 rounded-sm text-sm px-3 py-1 flex items-center gap-1 font-primary font-extralight tracking-[0.8px] hover:bg-gray-100 transition"
          >
            <Image
              src="/images/featured-prop/email.svg"
              alt="Email"
              width={16}
              height={16}
            />
            {t("offPlanList.email")}
          </button>
        </div>

        <button
          onClick={() =>
            window.open(
              `https://wa.me/971563645835?text=Hi, I'm interested in ${title}`,
              "_blank"
            )
          }
          className="text-black bg-white border border-gray-300 rounded-sm text-sm px-3 py-1 flex items-center gap-1 font-primary font-extralight tracking-[0.8px] hover:bg-gray-100 transition w-full sm:w-auto justify-center"
        >
          <Image
            src="/images/featured-prop/whats-app.svg"
            alt="WhatsApp"
            width={16}
            height={16}
          />
          {t("offPlanList.whatsapp")}
        </button>
      </div>
    </div>
  );
}

export default React.memo(OffPlanCard);
