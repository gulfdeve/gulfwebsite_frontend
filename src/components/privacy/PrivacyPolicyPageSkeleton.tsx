"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const PrivacyPolicyPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-300">
      <HeroSection2Skeleton />

      <section className="px-4 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Nav skeleton */}
          <nav className="grid gap-6 sm:grid-cols-2 max-w-3xl mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 animate-pulse"
              >
                <div className="h-5 w-5 rounded bg-gray-200" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </nav>
          <hr className="my-8 border-b border-gray-200" />

          {/* Content sections skeleton */}
          <div className="space-y-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded bg-gray-200" />
                  <div className="h-6 w-48 bg-gray-300 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded" />
                </div>
                <div className="pl-5 space-y-2 mt-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPageSkeleton;
