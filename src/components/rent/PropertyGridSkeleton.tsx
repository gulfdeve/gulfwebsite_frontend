"use client";

import React from "react";

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

export default function PropertyGridSkeleton() {
  return (
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
      <div className="relative z-10 min-w-[200px]">
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
  );
}
