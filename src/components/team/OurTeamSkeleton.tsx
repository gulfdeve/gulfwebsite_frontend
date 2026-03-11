"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const OurTeamSkeleton = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 animate-in fade-in duration-300">
      {/* Hero */}
      <HeroSection2Skeleton />

      {/* Marquee Skeleton */}
      <div className="overflow-hidden w-full py-4">
        <div className="flex gap-4 sm:gap-6 px-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] bg-gray-300 rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Title Section Skeleton */}
      <div className="flex flex-col text-center mt-6 px-4">
        <div className="max-w-[950px] mx-auto flex flex-col justify-center items-center gap-3">
          <div className="h-7 sm:h-9 w-3/4 max-w-[400px] bg-gray-300 rounded animate-pulse" />
          <div className="h-px w-full max-w-[200px] bg-gray-200 rounded" />
          <div className="h-4 w-full max-w-[600px] bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-[80%] max-w-[500px] bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* CEO Card Skeleton */}
      <div className="relative max-w-[1400px] mx-auto mt-6 px-4">
        <div className="bg-gray-200 rounded-md w-full lg:w-[80%] mx-auto overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Image skeleton */}
            <div className="w-full lg:w-1/3 aspect-[4/4] sm:aspect-[3/4] min-h-[300px] sm:min-h-[400px] bg-gray-300 animate-pulse" />
            {/* Content skeleton */}
            <div className="w-full lg:w-2/3 py-8 lg:px-6 px-4 space-y-4">
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse" />
              <div className="h-6 w-36 bg-gray-300/80 rounded animate-pulse" />
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-gray-300/70 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-300/70 rounded animate-pulse" />
                <div className="h-4 w-[80%] bg-gray-300/70 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-300/70 rounded animate-pulse" />
                <div className="h-4 w-[83%] bg-gray-300/70 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section Skeleton - Department blocks */}
      <div className="container mx-auto my-10 px-4 md:px-8 pb-10">
        {[1, 2].map((dept) => (
          <div key={dept} className="mb-10">
            {/* Department title */}
            <div className="mb-6">
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse" />
              <div className="h-px w-24 mt-2 bg-gray-200 rounded" />
            </div>
            {/* Team cards grid */}
            <div className="grid gap-4 md:gap-10 lg:grid-cols-3 min-[500px]:grid-cols-2 max-[500px]:grid-cols-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#F8F8F8] rounded-lg overflow-hidden h-[280px] sm:h-[320px]"
                >
                  <div className="px-6 pt-6 flex flex-col h-full">
                    <div className="h-7 w-32 bg-gray-300 rounded animate-pulse mb-2" />
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-auto flex justify-end pt-4">
                      <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] bg-gray-300 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeamSkeleton;
