"use client";

import React from "react";

interface LocationSectionProps {
  title?: string;
  location?: string;
  mapUrl?: string;
  latitude?: string;
  longitude?: string;
  backgroundImage?: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  title = "LOCATION",
  location,
  latitude,
  longitude,
}) => {

  return (
    <section className="py-10">
      {/* Title - Matching Amenities style */}
      <div className="w-[150px] font-semibold text-primary text-3xl my-4">
        <h3>{title}</h3>
        <div className="max-w-[300px] mt-1 mx-auto underline-gradient" />
      </div>

      {/* Location Text */}
      {/* <div className="mb-4">
        <p className="text-base sm:text-lg text-black">
          {location || "Location not specified"}
        </p>
      </div> */}

      {/* Embedded Map */}
      {(latitude && longitude) || location ? (
        <div className="w-full h-[400px] sm:h-[400px] rounded-lg overflow-hidden mb-6 border border-gray-200">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={
              latitude && longitude
                ? `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`
                : location
                  ? `https://maps.google.com/maps?q=${encodeURIComponent(location)}&hl=en&z=14&output=embed`
                  : ''
            }
            title="Location Map"
          />
        </div>
      ) : null}
    </section>
  );
};

export default LocationSection;
