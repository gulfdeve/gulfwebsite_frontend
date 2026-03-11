"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatPrice as formatPriceUtil } from "@/utils/priceFormatter";
import { getSlug } from "@/utils/localization";

interface Property {
  _id: string;
  slug?: string | { en?: string; fr?: string; es?: string };
  title: string;
  location: string;
  developer?: string;
  type: string;
  handover?: string;
  price: number;
  paymentPlan?: string;
  beds?: number;
  baths?: number;
  size?: number;
  image?: string;
}

const FeaturedPropertiesSection = () => {
  const { t } = useTranslation("featuredProperties");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${API_URL}/api/properties?page=1&limit=3&locale=${locale}&excludeContent=true`
        );

        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        console.log("Properties API data:", data);
        if (data.success) {
          // Transform properties to include slug
          const transformedProperties = (data.data.items || []).map((property: Property) => ({
            ...property,
            slug: getSlug(property.slug, locale, property._id),
          }));
          setProperties(transformedProperties);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [locale]);

  const formatPrice = (price: string) => {
    return formatPriceUtil(price);
  };

  if (loading) {
    return (
      <section
        className="lg:py-16 lg:px-4 text-white"
        style={{
          backgroundImage:
            "url('/build/assets/Pattern%20Background-RBGJSCoY.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container -mt-32 md:mt-0 mb-4">
          <div className="text-center mb-8 lg:mb-12 mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold uppercase mb-4 tracking-[1px]">
              {t("headerTitle")}
            </h2>
            <p className="text-base text-gray-200 md:w-[1178px] mx-auto">
              {t("headerDescription")}
            </p>
          </div>
          <hr className="mx-auto pb-6 lg:pb-10 border-white" />
          <div className="text-center text-white">
            <p>Loading featured properties...</p>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  const propertiesList = properties.map((property) => ({
    _id: property._id,
    slug: property.slug || property._id,
    title: property.title,
    location: property.location || "Dubai",
    developer: property.developer || "N/A",
    type: property.type,
    handover: property.handover || "TBA",
    price:
      typeof property.price === "string"
        ? property.price
        : formatPrice(property.price.toString()),
    plan: property.paymentPlan || "N/A",
    beds: property.beds?.toString() || "N/A",
    baths: property.baths?.toString() || "N/A",
    size: property.size ? (typeof property.size === "string" ? property.size : `${property.size.toLocaleString()} SQFT`) : "N/A",
    image: property.image || "/images/featured-prop/default.jpg",
  }));

  return (
    <section
      className="lg:py-16 lg:px-4 text-white"
      style={{
        backgroundImage:
          "url('/build/assets/Pattern%20Background-RBGJSCoY.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container -mt-32 md:mt-0 mb-4">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12 mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold uppercase mb-4 tracking-[1px]">
            {t("headerTitle")}
          </h2>
          <p className="text-base text-gray-200 md:w-[1178px] mx-auto">
            {t("headerDescription")}
          </p>
        </div>

        <hr className="mx-auto pb-6 lg:pb-10 border-white" />

        <h2 className="text-center mb-8 uppercase text-2xl lg:text-4xl font-extrabold leading-tight tracking-[1px]">
          {t("sectionTitle")}
        </h2>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 gap-y-6 justify-center px-4">
          {propertiesList.map((property, index) => (
            <Link
              key={property._id || index}
              href={`/${locale}/properties/${property.slug || property._id}`}
              className="block cursor-pointer"
              data-discover="true"
            >
              <div
                className="bg-white text-black rounded-lg w-full shadow-lg"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.6) -8px 8px 8px",
                }}
              >
                <div className="h-64 rounded-t-lg overflow-hidden bg-gray-200">
                  <Image
                    alt={property?.title}
                    src={property?.image}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3
                    className="text-2xl font-extrabold mb-1 truncate"
                    title={property?.title}
                  >
                    {property?.title}
                  </h3>
                  <p
                    className="text-base mb-1 line-clamp-2 min-h-[3rem] text-gray-700"
                    title={property.location}
                  >
                    {property.location}
                  </p>

                  <p className="text-xl">
                    <span className="font-semibold">{t("developer")}:</span>{" "}
                    {property.developer}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">{t("type")}:</span>{" "}
                    {property.type}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">{t("handoverDate")}:</span>{" "}
                    {property.handover}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">{t("priceFrom")}:</span>{" "}
                    {property.price}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">{t("paymentPlan")}:</span>{" "}
                    {property.plan}
                  </p>

                  <div className="flex flex-wrap items-center text-sm text-gray-700 mt-3 gap-y-2">
                    <div className="flex items-center pe-3">
                      <div className="flex items-center gap-1 border-r-2 pr-3 h-4">
                        <Image
                          alt="bed"
                          src="/images/featured-prop/bed.svg"
                          width={16}
                          height={16}
                        />
                        <p className="text-base">{property.beds}</p>
                      </div>
                    </div>

                    <div className="flex items-center pe-3">
                      <div className="flex items-center gap-1 border-r-2 pr-3 h-4">
                        <Image
                          alt="bath"
                          src="/images/featured-prop/bath-tub.svg"
                          width={16}
                          height={16}
                        />
                        <p className="text-base">{property.baths}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center gap-1 h-5">
                        <Image
                          alt="size"
                          src="/images/featured-prop/size.svg"
                          width={16}
                          height={16}
                        />
                        <p className="text-base">{property.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
