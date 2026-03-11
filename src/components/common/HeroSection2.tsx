"use client";

import Image from "next/image";
import React from "react";

interface HeroSection2Props {
  imageSrc?: string;
  title: string;
  height?: string; // optional (default height)
  titleClassName?: string; // allow styling override
}

const HeroSection2: React.FC<HeroSection2Props> = ({
  imageSrc = "/images/banner-image.webp",
  title,
  height = "h-[200px] sm:h-[330px]",
  titleClassName = "",
}) => {
  return (
    <section className="relative mb-3">
      {/* Background Image */}
      <div className={`relative w-full ${height} overflow-x-hidden`}>
        <Image
          src={"/images/banner-image.webp"}
          fill
          alt="background"
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/60 from-90% to-white z-10"></div>
      </div>

      {/* Title */}
      <div className="px-2 absolute mx-auto max-w-[1300px] inset-0 flex items-center z-20">
        <h1
          className={`text-gold text-lg -mt-5 md:mt-4 lg:mt-7 sm:text-2xl font-semibold ml-[4%] ${titleClassName}`}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};

export default HeroSection2;
