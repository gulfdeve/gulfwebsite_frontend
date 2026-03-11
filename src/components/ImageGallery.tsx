"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  mainImage: string;
  sideImages: string[];
  title: string;
}

export default function ImageGallery({
  mainImage,
  sideImages,
  title,
}: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ All images for the slider (main + all sides)
  const allImages = [mainImage, ...sideImages];

  // ✅ Only show first two side images in the grid
  const visibleSideImages = sideImages.slice(0, 2);

  const openSlider = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeSlider = () => setIsOpen(false);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % allImages.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeSlider();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [allImages.length]);

  return (
    <>
      {/* === Image Grid (main + 2 side images only) === */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mb-8">
        {/* Main image */}
        <div
          className="relative w-full h-[250px] lg:col-span-7 lg:h-[500px] overflow-hidden rounded-md cursor-pointer"
          onClick={() => openSlider(0)}
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-6 left-10 px-2 py-1 bg-white/70 backdrop-blur-sm rounded-md flex justify-center items-center gap-2">
            <Camera strokeWidth={1} />
            <p className="mt-0.5">{sideImages.length + 1}</p>
          </div>
        </div>

        {/* Only 2 side images */}
        <div className="hidden md:flex flex-col gap-4 lg:col-span-3">
          {visibleSideImages.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-[240px] overflow-hidden rounded-md cursor-pointer"
              onClick={() => openSlider(i + 1)} // Still points to correct index in allImages
            >
              <Image
                src={img}
                alt={`Side ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* === Fullscreen Slider Modal === */}
      {isOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-[3px] bg-white/60 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeSlider}
            className="absolute top-6 right-6 text-black hover:text-gray-600 transition cursor-pointer"
          >
            <X size={32} />
          </button>

          {/* Image Container (relative for arrow positioning) */}
          <div className="relative w-[90vw] h-[80vh] flex items-center justify-center">
            {/* Image */}
            <Image
              src={allImages[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="object-contain rounded-md"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-1/6 text-black cursor-pointer"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-1/6 text-black cursor-pointer"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-3 text-black text-sm bg-white/70 px-3 py-1 rounded-md backdrop-blur-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
