"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const CardSkeleton = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`bg-white rounded-lg w-full overflow-hidden border border-gray-200 shadow-lg animate-pulse flex flex-col ${
      compact ? "w-[92%] shrink-0 sm:w-full" : "h-full"
    }`}
  >
    <div className="px-5 pt-5 pb-3 flex items-center justify-between">
      <div className="h-6 bg-gray-300 rounded w-24" />
      <div className="h-6 bg-gray-300 rounded w-16" />
    </div>
    <div className="px-3">
      <div
        className={`bg-gray-300 rounded-xl ${compact ? "h-56" : "h-56 sm:h-64"}`}
      />
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

const BuyRentPageSkeleton = () => {
  return (
    <div className="bg-white relative min-h-screen overflow-hidden animate-in fade-in duration-300">
      <HeroSection2Skeleton />

      <div className="absolute w-full z-20 sm:mt-[-55px] mt-[-20px] px-4">
        <div className="max-w-[1200px] mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 animate-pulse">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
            <div className="flex gap-2 flex-wrap">
              <div className="h-12 w-24 sm:w-32 bg-gray-200 rounded-lg" />
              <div className="h-12 w-24 sm:w-32 bg-gray-200 rounded-lg" />
              <div className="h-12 w-24 sm:w-32 bg-gray-200 rounded-lg" />
              <div className="h-12 w-20 sm:w-28 bg-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-12 sm:mt-10">
        <div className="text-center">
          <div className="h-8 w-64 sm:w-80 bg-gray-300 rounded animate-pulse mx-auto" />
          <div className="h-px w-32 bg-gray-200 rounded mt-2 mx-auto" />
        </div>
      </div>

      <div className="px-4 mb-10 mt-6">
        <div className="relative flex xl:flex-row flex-col-reverse gap-4 max-w-[1500px] mx-auto mb-10">
          <div className="relative z-10 w-full">
            <div className="flex gap-3 overflow-hidden sm:hidden">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} compact />
              ))}
            </div>
            <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
          <div className="relative z-50 min-w-[200px]">
            <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-20 mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyRentPageSkeleton;
