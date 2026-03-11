"use client";

import React, { useEffect, useState } from "react";
import PropertyCard from "./common/PropertyCard";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { formatPrice as formatPriceUtil } from "@/utils/priceFormatter";
import { getSlug } from "@/utils/localization";

interface Property {
  _id: string;
  slug?: string | { en?: string; fr?: string; es?: string };
  title: any; // Changed to any to handle objects
  price: number;
  location: any; // Changed to any to handle objects
  type: string;
  beds: number;
  baths: number;
  size: number;
  image: string;
  agent?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

interface SimilarPropertiesProps {
  propertyId: string;
  limit?: number;
}

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({
  propertyId,
  limit = 3,
}) => {
  const { t } = useTranslation("property");
  const params = useParams() as { locale?: string };
  const locale = params?.locale || "en";

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to extract text from objects
  const extractText = (data: any): string => {
    if (typeof data === "string") return data;

    if (data && typeof data === "object") {
      // Handle {text: "value", image: "url"} structure
      if (data.text && typeof data.text === "string") {
        return data.text;
      }
      // Handle multilingual objects {en: "text", fr: "text"}
      if (data.en && typeof data.en === "string") {
        return data.en;
      }
      // Handle current locale
      if (data[locale] && typeof data[locale] === "string") {
        return data[locale];
      }
      // Try to find any string value in the object
      for (const key in data) {
        if (typeof data[key] === "string") {
          return data[key];
        }
      }
      // If object has no string values, return empty string
      return "";
    }

    return String(data || "");
  };

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${propertyId}/similar?limit=${limit}&locale=${locale}&excludeContent=true`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch similar properties: ${res.status}`);
        }

        const json = await res.json();

        if (json.success) {
          // Transform properties to include slug
          const transformedProperties = json.data.map((property: Property) => ({
            ...property,
            slug: getSlug(property.slug, locale, property._id),
          }));
          setProperties(transformedProperties);
        } else {
          throw new Error(json.message || "Failed to fetch similar properties");
        }
      } catch (err) {
        console.error("Error fetching similar properties:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchSimilarProperties();
    }
  }, [propertyId, limit, locale]);

  // Format price based on property type
  const formatPrice = (price: number) => {
    return formatPriceUtil(price.toString());
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="fw7 uppercase mb-8 font-primary lg:text-4xl text-black/80 text-xl text-center">
            {t("sections.similarProperties", "Similar Properties")}
          </h3>
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2762E]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="fw7 uppercase mb-8 font-primary lg:text-4xl text-xl text-center">
            {t("sections.similarProperties", "Similar Properties")}
          </h3>
          <div className="text-center text-red-600 py-10">
            <p>
              {t("errors.loadingSimilar", "Error loading similar properties")}:{" "}
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="relative z-10 w-[330px] font-semibold text-primary text-2xl sm:text-3xl my-4">
          <h3 className="uppercase">
            You May also <span className="text-gold">Like</span>
          </h3>
          <div className="max-w-[330px] mt-1 mx-auto underline-gradient" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            // ✅ FIX: Extract text from title and location objects
            const propertyTitle =
              extractText(property.title) || "Property Title";
            const propertyLocation =
              extractText(property.location) || "Location not specified";

            return (
              <PropertyCard
                key={property._id}
                _id={property._id}
                title={propertyTitle} // ✅ Now always a string
                price={formatPrice(property.price)}
                location={propertyLocation} // ✅ Now always a string
                type={property.type}
                beds={property.beds}
                baths={property.baths}
                size={typeof property.size === "string" ? `${property.size} sq ft` : `${property.size?.toLocaleString?.() ?? ""} sq ft`}
                image={property.image}
                agent={property.agent}
                href={`/${locale}/properties/${property.slug || property._id}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SimilarProperties);
