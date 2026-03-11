"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const AboutPageSkeleton = () => {
  return (
    <div className="bg-white text-black animate-in fade-in duration-300">
      {/* Hero */}
      <HeroSection2Skeleton />

      {/* Intro Section Skeleton */}
      <section className="bg-white mt-6 sm:mt-0">
        <div className="container mx-auto px-4 md:px-8">
          <div className="py-8 flex flex-col justify-center lg:max-w-[1300px] mx-auto">
            <div className="h-8 sm:h-9 w-full max-w-[500px] mx-auto bg-gray-300 rounded animate-pulse mb-6" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-[95%] bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section Skeleton */}
      <section className="py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:px-8 px-4">
          {/* Left Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="rounded-[10px] w-full aspect-[4/3] bg-gray-300 animate-pulse" />
          </div>
          {/* Right Stats Grid */}
          <div className="w-full md:w-1/2 flex flex-wrap gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.5rem)]">
                <div className="h-10 sm:h-12 w-20 bg-gray-300 rounded animate-pulse mb-2" />
                <div className="h-5 w-28 sm:w-36 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section Skeleton */}
      <section className="bg-gray-200 py-12">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div className="space-y-2">
            <div className="h-8 w-40 bg-gray-300 rounded animate-pulse" />
            <div className="h-px w-24 bg-gray-400 rounded" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-full bg-gray-300/80 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-300/80 rounded animate-pulse" />
            <div className="h-4 w-[90%] bg-gray-300/80 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section Skeleton */}
      <section className="py-12">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div className="space-y-2">
            <div className="h-8 w-36 bg-gray-300 rounded animate-pulse" />
            <div className="h-px w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Vision Section Skeleton */}
      <section className="bg-gray-300 py-12">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div className="space-y-2">
            <div className="h-8 w-36 bg-gray-400 rounded animate-pulse" />
            <div className="h-px w-24 bg-gray-500 rounded" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-full bg-gray-400/80 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-400/80 rounded animate-pulse" />
            <div className="h-4 w-[85%] bg-gray-400/80 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Dream Section Skeleton */}
      <section className="py-12">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-8 justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 sm:w-56 bg-gray-300 rounded animate-pulse" />
            <div className="h-px w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageSkeleton;
