"use client";

import React from "react";

const BlogCardSkeleton = () => (
  <div className="flex flex-col h-full w-full border border-gray-200 rounded-sm animate-pulse overflow-hidden">
    <div className="h-[220px] w-full bg-gray-300 shrink-0" />
    <div className="p-4 space-y-2">
      <div className="flex justify-between items-center">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-5 w-full bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
    </div>
  </div>
);

const BlogSectionSkeleton = () => {
  const buttonPlaceholder = (
    <>
      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse shrink-0" />
      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse shrink-0" />
    </>
  );

  return (
    <section className="py-10 text-black">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-4">
        {/* Header: title + desktop-only buttons (same as BlogSection) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="h-8 w-72 sm:w-96 bg-gray-300 rounded animate-pulse" />
          <div className="hidden md:flex items-center gap-3">
            {buttonPlaceholder}
          </div>
        </div>

        {/* Cards row */}
        <div className="flex gap-4 sm:gap-6 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] flex-shrink-0 h-full"
            >
              <BlogCardSkeleton />
            </div>
          ))}
        </div>

        {/* Mobile-only: buttons below cards, right-aligned */}
        <div className="hidden max-md:flex items-center justify-end gap-3 mt-6">
          {buttonPlaceholder}
        </div>
      </div>
    </section>
  );
};

export default BlogSectionSkeleton;
