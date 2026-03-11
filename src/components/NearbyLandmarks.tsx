"use client";

import Image from "next/image";
import { useTranslation } from "next-i18next";

export interface Landmark {
  title: string;
  time?: string;
  image: string;
}

interface NearbyLandmarksProps {
  title?: string;
  landmarks: Landmark[];
  bgColor?: string;
  textColor?: string;
  columns?: number;
}

export default function NearbyLandmarks({
  title,
  landmarks,
  bgColor = "#000000",
  textColor = "#FFFFFF",
  columns = 4,
}: NearbyLandmarksProps) {
  const { t } = useTranslation("off-plan"); // ✅ use same namespace for consistency

  const columnClass =
    columns === 2
      ? "lg:grid-cols-2"
      : columns === 3
      ? "lg:grid-cols-3"
      : columns === 4
      ? "lg:grid-cols-4"
      : "lg:grid-cols-4";

  return (
    <section className="py-10" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl lg:text-4xl font-bold uppercase mb-6"
          style={{ color: textColor }}
        >
          {/* ✅ Translated title, with fallback */}
          {title || t("sections.nearbyLandmarks", "Nearby Landmarks")}
        </h2>

        <div className={`grid gap-4 sm:grid-cols-2 ${columnClass}`}>
          {landmarks.map((landmark, index) => (
            <div key={index}>
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <Image
                  src={landmark.image || "/images/landmark-placeholder.jpg"}
                  alt={landmark.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3
                className="text-xl font-bold mt-2"
                style={{ color: textColor }}
              >
                {/* ✅ If the title matches a translation key, use it */}
                {t(`landmarks.${landmark.title}`, landmark.title)}
              </h3>
              <p
                className="text-base font-medium mt-1"
                style={{ color: textColor }}
              >
                {landmark.time || t("timeUnknown", "N/A")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
