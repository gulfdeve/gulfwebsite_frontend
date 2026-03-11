"use client";

import React from "react";

interface HeroSectionSkeletonProps {
  height?: string;
}

const HeroSectionSkeleton: React.FC<HeroSectionSkeletonProps> = ({
  height = "md:h-[700px] lg:h-[800px] h-[450px]",
}) => {
  return (
    <section className={`relative w-full ${height} bg-gray-300 animate-pulse`}>
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="absolute inset-0 flex flex-col justify-center z-20">
        <div className="flex lg:items-center justify-center px-4 text-center mt-22 sm:mt-20 md:-mt-24 lg:mt-0 h-full md:h-fit">
          <div className="text-white w-full max-w-4xl mx-auto">
            <div className="h-8 md:h-12 bg-gray-400/50 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-400/50 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;
