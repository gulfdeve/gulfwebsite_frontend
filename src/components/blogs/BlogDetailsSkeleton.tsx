"use client";

import React from "react";
import HeroSection2Skeleton from "@/components/common/HeroSection2Skeleton";

const BlogDetailsSkeleton = () => {
  return (
    <main className="bg-white text-black animate-in fade-in duration-300">
      {/* Hero */}
      <HeroSection2Skeleton />

      {/* Blog Content */}
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col gap-6 mt-12 mb-6 sm:mt-3 sm:mb-3 max-w-4xl mx-auto w-full">
          <div className="space-y-4 w-full">
            {/* Title */}
            <div className="h-8 sm:h-9 w-full max-w-[600px] bg-gray-300 rounded animate-pulse" />
            {/* Date */}
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            {/* Main Image */}
            <div className="relative w-full h-[250px] lg:h-[500px] rounded-lg bg-gray-300 animate-pulse" />
            {/* Excerpt */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
                />
              ))}
            </div>
            {/* Article Content */}
            <div className="mt-6 space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-[92%] bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mt-4" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Comment Form Skeleton */}
        <div className="max-w-4xl mx-auto w-full mb-12">
          <div className="h-8 w-40 bg-gray-300 rounded animate-pulse mb-6" />
          <div className="space-y-4">
            <div className="h-24 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-12 flex-1 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-12 flex-1 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Related Blogs Skeleton */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-sm overflow-hidden"
              >
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
        </div>
      </div>
    </main>
  );
};

export default BlogDetailsSkeleton;
