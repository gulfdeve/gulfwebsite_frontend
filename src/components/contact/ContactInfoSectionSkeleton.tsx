"use client";

import React from "react";

const ContactInfoSectionSkeleton = () => {
  return (
    <section className="animate-in fade-in duration-300">
      <div className="relative w-full lg:px-4 pt-4 mt-8 sm:mt-0">
        <div className="flex flex-col lg:flex-row items-start justify-between md:w-[90%] mx-auto px-2 lg:px-14 lg:pt-10 pt-4 md:gap-10 lg:gap-4 rounded-lg overflow-hidden bg-gray-200/80 min-h-[400px] sm:min-h-[500px]">
          {/* Left - Form Skeleton */}
          <div className="flex-1 w-full">
            <div className="bg-white/90 rounded-lg px-4 sm:px-6 py-4 sm:py-6 mb-6 sm:mb-10">
              <div className="flex flex-col lg:flex-row gap-3 mb-3 sm:mb-4">
                <div className="h-12 sm:h-14 bg-gray-300 rounded-md animate-pulse flex-1" />
                <div className="h-12 sm:h-14 bg-gray-300 rounded-md animate-pulse flex-1" />
              </div>
              <div className="flex gap-2 mb-3 sm:mb-4">
                <div className="h-12 sm:h-14 w-20 sm:w-24 bg-gray-300 rounded-md animate-pulse flex-shrink-0" />
                <div className="h-12 sm:h-14 flex-1 bg-gray-300 rounded-md animate-pulse" />
              </div>
              <div className="h-12 sm:h-14 bg-gray-300 rounded-md animate-pulse mb-3 sm:mb-4" />
              <div className="h-12 sm:h-14 bg-gray-300 rounded-md animate-pulse mb-3 sm:mb-4" />
              <div className="h-24 sm:h-28 bg-gray-300 rounded-md animate-pulse mb-4 sm:mb-5" />
              <div className="h-12 sm:h-14 w-32 sm:w-40 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Right - Info Skeleton */}
          <div className="flex-1 w-full px-4 md:px-6 lg:px-2 space-y-4">
            <div className="space-y-2">
              <div className="h-7 sm:h-8 w-3/4 max-w-[200px] bg-gray-400/70 rounded animate-pulse" />
              <div className="h-4 w-full max-w-[280px] bg-gray-400/60 rounded animate-pulse" />
              <div className="h-4 w-2/3 max-w-[220px] bg-gray-400/60 rounded animate-pulse" />
            </div>
            <div className="space-y-4 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="h-7 w-7 rounded bg-gray-400/70 animate-pulse flex-shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-20 bg-gray-400/60 rounded animate-pulse" />
                    <div className="h-3 w-32 sm:w-40 bg-gray-400/50 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <div className="h-4 w-24 mb-3 bg-gray-400/60 rounded animate-pulse" />
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded bg-gray-400/60 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Skeleton */}
      <div className="mt-6">
        <div className="rounded-lg h-[200px] sm:h-[300px] w-full bg-gray-300 animate-pulse" />
      </div>
    </section>
  );
};

export default ContactInfoSectionSkeleton;
