"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const BlogsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden animate-in fade-in duration-300">
      {/* Hero */}
      <HeroSection2Skeleton />

      {/* Content */}
      <div className="container mx-auto p-4 md:p-2 lg:px-8 text-gray-800 mt-10 sm:mt-0">
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Left - Main content */}
          <div className="lg:w-[82%] w-full">
            {/* Featured Blog Skeleton */}
            <div className="w-full flex md:flex-row flex-col gap-4 lg:gap-0 justify-between">
              {/* Featured image + content */}
              <div className="lg:w-[62%] md:w-[70%] w-full">
                <div className="h-6 w-3/4 max-w-[400px] bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-24 mt-2 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-[250px] sm:h-[350px] bg-gray-300 rounded-xl mt-5 animate-pulse" />
                <div className="mt-6 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-28 mt-4 bg-gray-300 rounded-full animate-pulse" />
              </div>

              {/* Suggested blogs sidebar */}
              <div className="lg:w-[30%] md:w-[32%] w-full hidden md:block">
                <div className="h-5 w-28 bg-gray-300 rounded animate-pulse" />
                <div className="flex flex-col gap-5 mt-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-28 h-20 shrink-0 bg-gray-300 rounded-md animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Articles Section */}
            <div className="mt-12">
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse" />
              <div className="h-px w-full max-w-[200px] mt-2 bg-gray-200 rounded" />
            </div>

            {/* Blog Cards Grid - Desktop */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-gray-200 rounded-sm overflow-hidden">
                  <div className="h-[220px] w-full bg-gray-300 animate-pulse" />
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between">
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Blog Cards - Mobile (single row placeholder) */}
            <div className="block lg:hidden mt-6">
              <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="min-w-[280px] border border-gray-200 rounded-sm overflow-hidden">
                    <div className="h-[220px] w-full bg-gray-300 animate-pulse" />
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between">
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination skeleton */}
            <div className="flex justify-center gap-2 mt-6 mb-6 pb-2">
              <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-7 h-7 bg-gray-300 rounded-lg animate-pulse" />
              <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Right - Filter sidebar */}
          <div className="lg:w-[20%]">
            <div className="h-9 w-28 md:w-32 bg-gray-300 rounded-full animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <div className="flex-1 h-9 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 h-9 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPageSkeleton;
