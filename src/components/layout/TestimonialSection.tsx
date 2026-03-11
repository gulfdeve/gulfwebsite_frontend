"use client";

import { useState, useEffect, memo } from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { TestimonialBackgroundIcon } from "@/utils/svgs";
import TestimonialsSectionSkeleton from "./TestimonialsSectionSkeleton";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

/** Inline star icon to avoid Lucide overhead per card (better INP) */
const StarIcon = () => (
  <svg
    className="w-4 h-4 fill-gold text-gold shrink-0"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
  </svg>
);

const TestimonialCard = memo(function TestimonialCard({ data }: { data: Testimonial }) {
  const rating = Math.min(5, Math.max(0, Number(data.rating) || 0));
  return (
    <div className="flex border border-white flex-col relative backdrop-blur-sm bg-white/20 rounded-lg p-4 sm:p-5 lg:p-6 shadow-sm h-full min-h-[200px] w-full [contain:layout]">
      <span className="absolute top-4 right-4 -z-20" aria-hidden>
        <TestimonialBackgroundIcon className="w-14 h-14" />
      </span>
      <div>
        <h3 className="font-extrabold text-primary text-lg">{data.name}</h3>
      </div>
      <div className="flex items-center gap-1 mb-4 text-gold [contain:layout]">
        <span className="text-sm text-gray-500">{rating}</span>
        {Array.from({ length: rating }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="grow text-primary [contain:layout]">&quot;{data.text}&quot;</p>
    </div>
  );
});

const TestimonialsSection = () => {
  const { t } = useTranslation("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${API_URL}/api/testimonials?locale=${locale}&limit=6`
        );

        if (!res.ok) throw new Error("Failed to fetch testimonials");

        const data = await res.json();
        if (data.success && data.data) {
          const formattedTestimonials = data.data.map((testimonial: any) => ({
            id: testimonial.id || testimonial._id,
            name: testimonial.name,
            role: testimonial.role,
            text: testimonial.text,
            rating: testimonial.rating,
          }));
          setTestimonials(formattedTestimonials);
        }
      } catch (err: any) {
        console.error("Error fetching testimonials:", err);
        setError(err.message || "Failed to load testimonials");
        // Fallback to empty array on error
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [locale]);

  return (
    <section className="text-black">
      <div>
        {/* Title with navigation */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex max-w-[1440px] mx-auto flex-col items-start justify-between gap-6 md:mb-6 mb-3">
          <div className="flex items-center w-full justify-between gap-4 sm:gap-6">
            <h2 className="text-base sm:text-xl md:text-2xl text-primary font-medium text-center md:text-left">
              {t("testimonial.title", "")}{" "}
              <span className="text-gold">{t("testimonial.highlight", "Client Reviews")}</span>{" "}
              {t("testimonial.title2", "& Real Estate Experiences in Dubai")}
              <div className="mt-1 max-w-[750px] mx-auto underline-gradient" />
            </h2>
            <div className="hidden md:flex items-center gap-3">
              <button
                className="testimonial-prev bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="testimonial-next bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonials Grid */}
          {loading ? (
            <TestimonialsSectionSkeleton />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No testimonials available at the moment.</p>
            </div>
          ) : (
            <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-primary/10">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                navigation={{
                  nextEl: ".testimonial-next",
                  prevEl: ".testimonial-prev",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={testimonials.length > 3}
                className="pb-2!"
              >
                {testimonials.map((item) => (
                  <SwiperSlide key={item.id} className="h-auto!">
                    <TestimonialCard data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="hidden max-md:flex items-center justify-end gap-3 mt-6">
                <button
                  className="testimonial-prev bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="testimonial-next bg-gold rounded-full p-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

          )}

        </div>
        {/* <p className="text-center text-gray-800 font-primary mb-12">
          {t("testimonial.desc")}
        </p> */}

        {/* Testimonials Carousel */}
      </div>
    </section>
  );
};

export default TestimonialsSection;
