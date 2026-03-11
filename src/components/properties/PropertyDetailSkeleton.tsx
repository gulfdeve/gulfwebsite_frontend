"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const PropertyDetailSkeleton = () => {
  return (
    <div className="relative bg-white text-black animate-in fade-in duration-300">
      <HeroSection2Skeleton />

      <div className="absolute w-full z-20 md:mt-[-55px] -mt-[40px] px-4 left-0">
        <div className="max-w-[1200px] mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 px-2 md:px-4 max-w-6xl mx-auto my-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full sm:w-[250px] h-24 sm:h-28 bg-gray-200 rounded-lg animate-pulse mx-auto"
          />
        ))}
      </div>

      {/* Description + Image row */}
      <div className="flex lg:flex-row flex-col mx-auto px-4 gap-8 justify-center my-14 max-w-[1300px]">
        <div className="flex flex-col gap-4 lg:w-1/2">
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-[95%] bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="w-full h-[250px] sm:h-[400px] lg:w-[550px] lg:h-[350px] bg-gray-300 rounded-lg animate-pulse shrink-0" />
      </div>

      {/* Gallery Section */}
      <div className="mt-6 max-w-[1300px] mx-auto">
        <div className="w-full flex justify-between items-center mb-4 px-8">
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="w-full p-3 flex gap-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[250px] sm:h-[300px] min-w-[200px] sm:min-w-[300px] bg-gray-300 rounded-lg animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Property Details + Amenities + Landmarks */}
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mb-4" />
            <div className="grid md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-gray-200" />
          <div>
            <div className="h-8 w-36 bg-gray-300 rounded animate-pulse mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-gray-200" />
          <div>
            <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mb-4" />
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full sm:w-[300px]">
                  <div className="h-[200px] bg-gray-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full h-[400px] lg:h-[500px] rounded bg-gray-200 animate-pulse" />
          <div className="h-[300px] w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="mt-8">
          <div className="h-8 w-56 bg-gray-300 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-[220px] bg-gray-300 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailSkeleton;
