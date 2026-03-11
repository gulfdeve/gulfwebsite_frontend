"use client";

import { getIconForAmenity } from "@/utils/amenityIcons";

interface AmenitiesProps {
  features: string[];
  title?: string;
}

const Amenities: React.FC<AmenitiesProps> = ({ features, title }) => {
  if (!features || features.length === 0) return null;

  return (
    <section className="my-10">
      <div className="w-[150px] font-semibold text-primary text-3xl my-4">
        <h3>{title || "Amenities"}</h3>
        <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 font-primary">
        {features.map((feature, index) => {
          const Icon = getIconForAmenity(feature);

          return (
            <div
              key={index}
              className="flex items-center gap-3 py-2 rounded-full group"
            >
              <span className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-full bg-primary">
                <Icon className="w-4 h-4 md:w-5 md:h-5 rounded-full" color="#DEB66A" />
              </span>
              <span className="text-gray-700 text-sm font-medium group-hover:text-[#024959] transition-colors">
                {feature}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Amenities;
