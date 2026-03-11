"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const DeveloperSection = () => {
  const { t } = useTranslation("home");
  const developers = [
    { src: "/images/developers/azizi.svg", alt: "Azizi logo", width: 80 },
    {
      src: "/images/developers/binghati.svg",
      alt: "Binghatti logo",
      width: 130,
    },
    { src: "/images/developers/aldar.svg", alt: "Aldar logo", width: 110 },
    { src: "/images/developers/damac.svg", alt: "Damac logo", width: 115 },
    {
      src: "/images/developers/danube.svg",
      alt: "Danube Properties logo",
      width: 105,
    },
    {
      src: "/images/developers/ellington.svg",
      alt: "Ellington Properties logo",
      width: 105,
    },
    { src: "/images/developers/emaar.svg", alt: "Emaar logo", width: 80 },
    {
      src: "/images/developers/dubai-holding.svg",
      alt: "Dubai Holding logo",
      width: 70,
    },
    { src: "/images/developers/omniyat.svg", alt: "Omniyat logo", width: 110 },
    {
      src: "/images/developers/sobha.svg",
      alt: "Sobha Realty logo",
      width: 85,
    },
  ];

  return (
    <section>
      <div className="pt-10 relative overflow-visible">
        <div className="relative z-10 mb-10 text-center">
          <div className="inline-block">
            <h2 className="text-primary text-lg lg:text-2xl font-extrabold">
              {t("developer.title","Our Real Estate Development Partners in Dubai")}
            </h2>
            <div className="max-w-[700px] mt-1 mx-auto underline-gradient" />
          </div>

          <div className="bg-gradient mt-5 py-6 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center">
            <div className="max-w-[1400px] mx-auto w-full overflow-hidden">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                loop={true}
                speed={1000}
                breakpoints={{
                  0: { 
                    slidesPerView: 2, 
                    spaceBetween: 15,
                  },
                  480: { 
                    slidesPerView: 3, 
                    spaceBetween: 20,
                  },
                  768: { 
                    slidesPerView: 4, 
                    spaceBetween: 25,
                  },
                  1024: { 
                    slidesPerView: 5, 
                    spaceBetween: 30,
                  },
                  1440: { 
                    slidesPerView: 6, 
                    spaceBetween: 30,
                  },
                }}
                className="overflow-visible!"
                style={{ paddingLeft: '20px', paddingRight: '20px' }}
              >
              {developers.map((dev, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center h-[70px] px-2">
                    <Image
                      src={dev.src}
                      alt={dev.alt}
                      width={dev.width}
                      height={100}
                      className="object-contain max-h-[50px] w-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
