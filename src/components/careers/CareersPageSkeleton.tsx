"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const JobCardSkeleton = () => (
  <div className="border-b border-gray-200 pb-8 animate-pulse">
    <div className="h-8 w-3/4 bg-gray-300 rounded mb-4" />
    <div className="space-y-2 mb-4 max-w-[900px]">
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-4/5 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-wrap gap-3 mt-4">
      <div className="h-8 w-24 bg-gray-200 rounded-full" />
      <div className="h-8 w-28 bg-gray-200 rounded-full" />
      <div className="h-8 w-20 bg-gray-200 rounded-full" />
      <div className="h-8 w-16 bg-gray-200 rounded-full" />
    </div>
  </div>
);

const CareersPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white text-black animate-in fade-in duration-300">
      <HeroSection2Skeleton />

      {/* Second Image Section Skeleton */}
      <div className="relative w-full h-[450px] md:h-[380px] bg-gray-300 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
          <div className="w-[1136px] max-w-full mx-auto">
            <div className="rounded-[12px] py-[14px] px-[17px] h-[142px] flex flex-col gap-[10px] bg-gray-400/50 animate-pulse">
              <div className="h-8 w-3/4 bg-gray-300 rounded mx-auto" />
              <div className="h-4 w-full bg-gray-300/80 rounded" />
              <div className="h-4 w-full bg-gray-300/80 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Be Part of our Mission Section Skeleton */}
      <section className="py-8 md:py-8 px-4">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-6">
            <div className="h-8 w-64 bg-gray-300 rounded animate-pulse mb-2" />
            <div className="h-px w-[200px] bg-gray-200" />
          </div>
          <div className="space-y-2 max-w-[900px]">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="border-b border-gray-200 w-full max-w-[1300px] mt-8" />
        </div>
      </section>

      {/* Job Listings Skeleton */}
      <section className="px-4 md:px-8 md:py-8 pb-8">
        <div className="max-w-[1300px] mx-auto space-y-8">
          {[1, 2, 3].map((i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="my-12 md:my-16 px-4">
        <div className="max-w-[1300px] mx-auto flex justify-center">
          <div className="relative w-full max-w-[900px] h-[300px] md:h-[400px] bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </section>
    </div>
  );
};

export default CareersPageSkeleton;
