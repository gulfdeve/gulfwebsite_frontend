"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const TermsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-300">
      <HeroSection2Skeleton />

      <section className="px-4 py-12">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3 animate-pulse">
              <div className="h-5 w-48 bg-gray-300 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
              </div>
              <div className="pl-6 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TermsPageSkeleton;
