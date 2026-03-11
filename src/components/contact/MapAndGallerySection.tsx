"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

const MapAndGallerySection = () => {
  const { t } = useTranslation("contact");
  const images = [
    {
      src: "/images/contact/anim-1.webp",
      className: "h-[310px] relative top-32",
      animation: { x: [-150, 0], opacity: [0, 1] }, // from left
    },
    {
      src: "/images/contact/anim-2.webp",
      className: "h-[350px] relative right-12",
      animation: { x: [100, 0], opacity: [0, 1] }, // slightly left
    },
    {
      src: "/images/contact/anim-middle.webp",
      className: "h-[340px] w-[250px]",
      animation: { scale: [0.8, 1.4], opacity: [0, 1] }, // scale in
    },
    {
      src: "/images/contact/anim-3.webp",
      className: "h-[270px] relative left-10",
      animation: { x: [-100, 0], opacity: [0, 1] },
    },
    {
      src: "/images/contact/anim-4.webp",
      className: "h-[380px] relative top-20",
      animation: { x: [150, 0], opacity: [0, 1] },
    },
  ];

  return (
    <section className="px-4 sm:px-10 py-12 sm:py-20 bg-white overflow-hidden">
      {/* Google Map */}
      <div className="my-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57815.78218401818!2d55.06543624863282!3d25.085391699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b53c6fe36a1%3A0xb6dc0a807ec56420!2sAl%20Habtoor%20Business%20Tower!5e0!3m2!1sen!2sin!4v1727086897930!5m2!1sen!2sin"
          className="rounded-lg h-[400px] sm:h-[500px] w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Heading */}
      <div className="text-[#024959] text-3xl sm:text-5xl font-gotham font-bold text-center uppercase mt-10 mb-6 sm:mb-16">
        {t("mapSection.headingLine1")}
        <div className="pt-2">{t("mapSection.headingLine2")}</div>
      </div>

      {/* Animated Gallery (Desktop) */}
      <div className="hidden lg:flex gap-6 justify-center items-end my-10">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={img.animation}
            transition={{
              duration: 1,
              delay: index * 0.15,
              ease: "easeOut",
              type: "spring",
              stiffness: 70,
            }}
            viewport={{ once: false, amount: 0.3 }}
            className={`${img.className}`}
          >
            <Image
              src={img.src}
              alt={`Gallery image ${index + 1}`}
              width={300}
              height={300}
              className="object-cover shadow-md"
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile Scroll Gallery */}
      <div className="lg:hidden my-10">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide px-4">
          {images.map((img, index) => (
            <div key={index} className="snap-center flex-shrink-0">
              <Image
                src={img.src}
                alt={`Mobile slide ${index + 1}`}
                width={300}
                height={300}
                className="mx-auto h-[250px] sm:h-[300px] object-cover rounded-xl shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapAndGallerySection;
