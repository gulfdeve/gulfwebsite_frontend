"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  alt?: string;
  className?: string; // ✅ Added
}

export default function ImageSlider({
  images,
  alt = "Property",
  className = "",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-[#D9D9D9] py-6 text-center text-gray-600">
        No images available
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={`bg-[#D9D9D9] py-6 ${className}`}>  {/* ✅ ClassName applied */}
      <div className="container relative w-full overflow-hidden px-2">
        {/* Main Image */}
        <div className="relative w-full">
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            width={1000}
            height={500}
            className="w-full h-[350px] object-cover rounded-[10px]"
            priority={currentIndex === 0}
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-[1px] cursor-pointer -translate-y-1/2 z-20 bg-white text-black p-2 rounded-full shadow w-9 h-9 flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-[1px] cursor-pointer -translate-y-1/2 z-20 bg-white text-black p-2 rounded-full shadow w-9 h-9 flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-6 right-6 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
