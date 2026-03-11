import React from "react";
import { AreaChartIcon, Check, Scan } from "lucide-react";

interface FloorPlan {
  title: string;
  area: number;
  available: boolean;
  images: {
    src: string;
    label: string;
  }[];
  areaRange: string;
}

interface FloorPlanCardProps {
  floorPlan: FloorPlan;
}

const FloorPlanCard: React.FC<FloorPlanCardProps> = ({ floorPlan }) => {
  return (
    <div className="border border-gold rounded-lg p-6 bg-white">
      {/* Header */}
      <div className="border-b-[2px] border-gold pb-4 mb-6">
        <h3 className="text-2xl font-medium text-primary text-center">
          {floorPlan.title}
        </h3>
      </div>

      {/* Area and Availability */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-1 md:gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Scan color="#DEB66A" strokeWidth={3} className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg text-gray-800 font-semibold">Area</div>
            <div className="text-sm text-gray-600">
              {floorPlan.area.toLocaleString()} SQ.FT.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 md:gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-[#DEB66A]" strokeWidth={3} />
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {floorPlan.available ? "Available" : "Not Available"}
          </div>
        </div>
      </div>

      {/* Floor Plan Images */}
      <div className="space-y-6">
        {floorPlan.images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* <div className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              {image.label}
            </div> */}
            <div className="relative w-[80%] aspect-[4/3] bg-gray-100 rounded overflow-hidden">
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}

        {/* Area Range */}
        {/* <div className="text-center pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-1">
            {floorPlan.areaRange}
          </div>
          <div className="text-sm font-bold text-gray-800">
            {floorPlan.areaRange.split(" — ").join(" sqft — ")} sqft
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default FloorPlanCard;
