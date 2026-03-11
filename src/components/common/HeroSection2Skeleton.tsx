"use client";

import React from "react";

interface HeroSection2SkeletonProps {
  height?: string;
}

const HeroSection2Skeleton: React.FC<HeroSection2SkeletonProps> = ({
  height = "h-[200px] sm:h-[330px]",
}) => {
  return (
    <section className="relative mb-3">
      {/* Background Image Skeleton */}
      <div className={`relative w-full ${height} overflow-x-hidden bg-gray-300 animate-pulse`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/60 from-90% to-white z-10"></div>
      </div>

      {/* Title Skeleton */}
      <div className="px-2 absolute mx-auto max-w-[1300px] inset-0 flex items-center z-20">
        <div className="h-6 md:h-8 bg-gray-400/50 rounded w-1/3 ml-[4%] animate-pulse"></div>
      </div>
    </section>
  );
};

export default HeroSection2Skeleton;
