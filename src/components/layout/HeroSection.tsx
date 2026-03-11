"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  mediaType?: "video" | "image";
  mediaSrc?: string;
  height?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Dubai Luxury Real Estate Agency for Premium & Off-Plan Properties",
  subtitle = "Explore elite listings, off-plan investments and exclusive developments in Dubai's top locations.",
  mediaType = "video",
  mediaSrc = "/videos/hero-video.mp4",
  height = "h-screen",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isVideo = mediaType === "video";

  // Ensure title is always a string
  const safeTitle = typeof title === "string" ? title : String(title);

  // Validate and sanitize mediaSrc for Image component
  const safeMediaSrc = React.useMemo(() => {
    if (!mediaSrc || typeof mediaSrc !== "string" || mediaSrc.trim() === "") {
      // Return a default fallback image if mediaSrc is invalid
      return "/images/hero-default.jpg";
    }
    const trimmedSrc = mediaSrc.trim();
    // Check if it's a valid URL (starts with / or http:// or https://)
    if (
      trimmedSrc.startsWith("/") ||
      trimmedSrc.startsWith("http://") ||
      trimmedSrc.startsWith("https://")
    ) {
      return trimmedSrc;
    }
    // If it doesn't start with /, assume it's a relative path and add /
    return `/${trimmedSrc}`;
  }, [mediaSrc]);

  // Show skeleton during SSR
  if (!isMounted) {
    return (
      <section
        className={`relative w-full ${height} bg-gray-300 animate-pulse`}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center z-20">
          <div className="flex lg:items-center justify-center px-4 text-center mt-28 md:mt-0 h-full">
            <div className="text-white transition-all duration-1000 transform opacity-100 translate-y-0">
              <div className="h-8 md:h-12 bg-gray-400 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-400 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative w-full ${height}`}>
      {/* Media container */}
      {isVideo ? (
        // 🎥 VIDEO LOGIC
        <div className="relative w-full h-[350px] md:h-[550px] lg:h-full">
          <video
            src={mediaSrc}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            playsInline
            muted
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
      ) : (
        // 🖼️ IMAGE LOGIC
        <div className="relative w-full h-[400px]">
          <div className="absolute inset-0 mt-10">
            {safeMediaSrc ? (
              <Image
                src={safeMediaSrc}
                alt="Hero Background"
                fill
                priority
                className="object-top object-fill brightness-[0.80]"
                onError={(e) => {
                  // Fallback to a default image if the image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/hero-default.jpg";
                }}
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-blue-900 to-blue-700" />
            )}
          </div>
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center z-20">
        {/* Heading + Subtitle */}
        <div className="flex lg:items-center justify-center px-4 text-center mt-22 sm:mt-20 md:-mt-24 lg:mt-0 h-full md:h-fit">
          <div className="text-white transition-all duration-1000 transform opacity-100">
            <h1 className="text-2xl md:text-4xl mb-2 sm:mb-4 font-hero font-black">
              {safeTitle}
            </h1>
            <p className="text-sm sm:text-base font-primary">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
