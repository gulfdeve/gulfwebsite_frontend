"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface PropertyCardProps {
  id: string | number;
  title: string;
  price: string;
  location: string;
  type?: string;
  beds?: number;
  baths?: number;
  size?: string;
  image?: string;
  slug?: string;
  locale?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  location,
  type = "N/A",
  beds = 0,
  baths = 0,
  size = "N/A",
  image,
  slug,
  locale = "en",
}) => {
  // ✅ Correct href for App Router
  const href:any = `/${locale}/properties/${slug || id}`;

  return (
    <Link href={href as any} className="block">
      <div className="bg-white text-black rounded-2xl w-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <div className="h-[338px] lg:h-[370px] bg-gray-200 relative">
          <Image
            src={image || "/images/properties/home-1.jpeg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        <div className="px-4 pt-4 pb-3">
          <h4 className="text-xl lg:text-2xl font-semibold text-gray-900">{price}</h4>
          <h5 className="mt-1 text-lg lg:text-xl font-semibold line-clamp-2 text-gray-800 min-h-[3.5rem]">
            {title}
          </h5>
          <p className="text-sm text-gray-600 mt-1">{location}</p>

          <div className="flex flex-wrap items-center text-sm text-gray-700 mt-3 gap-x-4 gap-y-2">
            <span className="flex items-center border-r border-gray-300 pr-3">{type}</span>
            <span className="flex items-center border-r border-gray-300 pr-3">
              <Image src="/images/featured-prop/bed.svg" alt="bed" width={16} height={16} />
              <p className="ml-1">{beds}</p>
            </span>
            <span className="flex items-center border-r border-gray-300 pr-3">
              <Image src="/images/featured-prop/bath-tub.svg" alt="bath" width={16} height={16} />
              <p className="ml-1">{baths}</p>
            </span>
            <span className="flex items-center">
              <Image src="/images/featured-prop/size.svg" alt="size" width={16} height={16} />
              <p className="ml-1">{size}</p>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
