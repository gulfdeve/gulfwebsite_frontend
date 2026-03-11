"use client";

import React from "react";

const TestimonialCardSkeleton = () => (
  <div className="flex flex-col border border-gray-200 bg-white/20 rounded-lg p-4 sm:p-5 lg:p-6 shadow-sm h-full min-h-[200px] w-full animate-pulse">
    <div className="flex items-center gap-2 mb-4">
      <div className="h-6 w-32 bg-gray-300 rounded" />
    </div>
    <div className="flex items-center gap-1 mb-4">
      <div className="h-4 w-16 bg-gray-200 rounded" />
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
    <div className="space-y-2 grow">
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-4/5 bg-gray-200 rounded" />
    </div>
  </div>
);

const TestimonialsSectionSkeleton = () => {
  const buttonPlaceholder = (
    <>
      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse shrink-0" />
      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse shrink-0" />
    </>
  );

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-primary/10">
      <div className="flex gap-4 sm:gap-6 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="min-w-[280px] sm:min-w-[320px] lg:min-w-[380px] flex-shrink-0"
          >
            <TestimonialCardSkeleton />
          </div>
        ))}
      </div>
      <div className="hidden max-md:flex items-center justify-end gap-3 mt-6">
        {buttonPlaceholder}
      </div>
    </div>
  );
};

export default TestimonialsSectionSkeleton;
