"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { types } from "node:util";
import { formatPrice } from "@/utils/priceFormatter";

export interface PropertyCardProps {
  _id: string;
  title: string;
  price: string;
  location: string;
  type?: string;
  beds?: number;
  baths?: number;
  size?: string;
  image?: string;
  href?: string;
  agent?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = React.memo(({
  _id,
  title,
  price,
  location,
  type,
  beds,
  baths,
  size,
  image,
  href,
  agent,
}) => {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const { t } = useTranslation("common");
  const [imageError, setImageError] = useState(false);

  const linkPath = href || `/${locale}/properties/${_id}`;

  const handleContactClick = (
    e: React.MouseEvent,
    contactType: "call" | "email" | "whatsapp"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!agent) return;
    if (contactType === "call" && agent.phone)
      window.open(`tel:${agent.phone}`, "_self");
    if (contactType === "email" && agent.email)
      window.open(`mailto:${agent.email}`, "_self");
    if (contactType === "whatsapp" && agent.whatsapp)
      window.open(`https://wa.me/${agent.whatsapp}`, "_blank");
  };

  return (
    <div className="bg-white rounded-lg w-full overflow-hidden border border-gold shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Price + Type */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-3">
        <h4 className="text-lg sm:text-xl font-bold text-primary">{formatPrice(price)}</h4>
        {type && (
          <span className="border border-primary text-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
            {type}
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={linkPath as any} className="cursor-pointer block relative">
        <div className="px-3 relative h-56 sm:h-64 overflow-hidden">
          {!imageError && image ? (
            <Image
              src={image}
              alt={title}
              width={400}
              height={250}
              className="w-full h-full object-cover rounded-xl"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Beds – Baths – Size */}
        <div className="px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
          {beds !== undefined && (
            <div className="flex items-center gap-2">
              <Image
                src="/images/featured-prop/bed.svg"
                alt="bed"
                width={18}
                height={18}
              />
              <span className="text-sm text-gray-700 font-medium">{beds}</span>
            </div>
          )}

          {baths !== undefined && (
            <div className="flex items-center gap-2">
              <Image
                src="/images/featured-prop/bath-tub.svg"
                alt="bath"
                width={18}
                height={18}
              />
              <span className="text-sm text-gray-700 font-medium">{baths}</span>
            </div>
          )}

          {size && (
            <div className="flex items-center gap-2">
              <Image
                src="/images/featured-prop/size.svg"
                alt="size"
                width={18}
                height={18}
              />
              <span className="text-sm text-gray-700 font-medium">{size}</span>
            </div>
          )}
        </div>

        {/* Title + Location */}
        <div className="px-3 py-4 flex-1">
          <div className="flex items-start gap-2">
            <CiLocationOn
              className="mt-1 text-primary size-6 flex-nowrap"
              strokeWidth={0.5}
            />
            <div>
              <h5 className="text-xl font-bold text-primary mb-2 line-clamp-1">
                {title}
              </h5>
              <p className="text-sm text-gray-600 mb-4 line-clamp-1">
                {location}
              </p>
            </div>
          </div>
          <div className="space-y-2.5 text-sm">
            {price && (
              <div className="flex sm:flex-row flex-col sm:items-center items-start gap-4">
                <span className="text-gray-500">{t("price", "Price")}:</span>
                <span className="text-gray-800 font-semibold">{formatPrice(price)}</span>
              </div>
            )}
            {type && (
              <div className="flex sm:flex-row flex-col sm:items-center items-start gap-4">
                <span className="text-gray-500">{t("type", "type")}:</span>
                <span className="text-gray-800 font-semibold line-clamp-1 text-right">
                  {type}
                </span>
              </div>
            )}
            {location && (
              <div className="flex sm:flex-row flex-col sm:items-center items-start gap-4">
                <span className="text-gray-500">
                  {t("location", "Location")}:
                </span>
                <span className="text-gray-800 font-semibold">{location}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Contact Buttons */}
      {agent && (
        <div className="px-3 pb-5 flex-wrap pt-2 flex items-center justify-between gap-3">
          {agent.phone && (
            <button
              onClick={(e) => handleContactClick(e, "call")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-md group-hover:shadow-lg">
                <FaPhone className="text-gold rotate-90" />
              </div>
              <span className="text-[12px] text-gray-700 font-medium">
                {t("call", "Call")}
              </span>
            </button>
          )}

          {agent.email && (
            <button
              onClick={(e) => handleContactClick(e, "email")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-110 shadow-md group-hover:shadow-lg">
                <MdEmail className="text-gold size-5" />
              </div>
              <span className="text-[12px] text-gray-700 font-medium">
                {t("email", "Email")}
              </span>
            </button>
          )}

          {agent.whatsapp && (
            <button
              onClick={(e) => handleContactClick(e, "whatsapp")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-110 shadow-md group-hover:shadow-lg">
                <IoLogoWhatsapp className="text-gold size-5" />
              </div>
              <span className="text-[12px] text-gray-700 font-medium">
                {t("whatsapp", "WhatsApp")}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
});

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
