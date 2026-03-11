"use client";

import React from "react";

const FeaturedOffPlanCardSkeleton = () => (
  <div className="bg-white rounded-lg w-full overflow-hidden border border-gray-200 shadow-lg animate-pulse flex flex-col h-full min-h-[610px]">
    <div className="px-5 pt-5 pb-3 flex items-center justify-between">
      <div className="h-6 bg-gray-300 rounded w-24" />
      <div className="h-6 bg-gray-300 rounded w-16" />
    </div>
    <div className="px-3">
      <div className="bg-gray-300 rounded-xl h-56 sm:h-64 w-full" />
    </div>
    <div className="px-5 py-3 flex items-center gap-4 flex-wrap">
      <div className="h-4 bg-gray-200 rounded w-12" />
      <div className="h-4 bg-gray-200 rounded w-12" />
      <div className="h-4 bg-gray-200 rounded w-16" />
    </div>
    <div className="px-5 pb-3 space-y-2">
      <div className="h-5 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
    <div className="px-5 pb-3">
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
    <div className="px-5 pb-5 mt-auto flex gap-2">
      <div className="h-9 bg-gray-200 rounded flex-1" />
      <div className="h-9 bg-gray-200 rounded flex-1" />
    </div>
  </div>
);

const FeaturedOffPlansSectionSkeleton = () => {
  return (
    <section className="text-black">
      <div className="-mt-32 md:mt-0 mb-4">
        {/* Header */}
        <div className="p-2 md:mt-0 mt-20 container max-w-[1200px] text-center mb-8 lg:mb-12 mx-auto">
          <div className="h-8 w-64 sm:w-80 bg-gray-300 rounded animate-pulse mx-auto mb-4" />
          <div className="h-px w-32 bg-gray-200 rounded mx-auto mb-2" />
          <div className="h-4 w-full max-w-[600px] bg-gray-200 rounded animate-pulse mx-auto" />
        </div>
        {/* Property Cards Skeleton */}
        <div className="bg-primary py-[20px]">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start justify-between mb-4 gap-4">
              <div className="h-8 w-56 sm:w-72 bg-gray-400 rounded animate-pulse" />
              <div className="hidden md:flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-400 rounded-full animate-pulse shrink-0" />
                <div className="h-10 w-10 bg-gray-400 rounded-full animate-pulse shrink-0" />
              </div>
            </div>
          </div>
          <div className="p-4 max-w-[1400px] mx-auto">
            <div className="flex gap-4 sm:gap-6 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[380px] flex-shrink-0"
                >
                  <FeaturedOffPlanCardSkeleton />
                </div>
              ))}
            </div>
            <div className="hidden max-md:flex items-center justify-end gap-3 mt-6">
              <div className="h-10 w-10 bg-gray-400 rounded-full animate-pulse shrink-0" />
              <div className="h-10 w-10 bg-gray-400 rounded-full animate-pulse shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffPlansSectionSkeleton;
