"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { CiCircleChevRight } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const FindHomeSection = () => {
  const { t } = useTranslation("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const cards = [
    {
      src: "/images/find-home/luxury.webp",
      title: t("findHome.card2","LUXURY LIVING COMMUNITIES"),
      link: `/${locale}/properties?type=luxury`,
    },
    {
      src: "/images/find-home/waterfront.webp",
      title: t("findHome.card1","WATERFRONT & BEACHFRONT COMMUNITIES"),
      link: `/${locale}/properties?type=waterfront`,
    },
    {
      src: "/images/find-home/green.webp",
      title: t("findHome.card3","GREEN COMMUNITIES"),
      link: `/${locale}/properties?type=green`,
    },
    {
      src: "/images/find-home/building.webp",
      title: t("findHome.card4","BRANDED RESIDENTIAL COMMUNITIES"),
      link: `/${locale}/properties?type=apartment`,
    },
  ];

  return (
    <section className="bg-white py-8">
      {/* Centered container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="pb-8 text-center">
          <h2 className="text-xl lg:text-2xl text-black font-extrabold flex gap-2 items-center justify-center flex-wrap ">
            <span className="text-primary block">{t("findHome.title","Explore High-Demand")}</span>
            <span className="text-gold block">{t("findHome.highlight","Residential Communities")}</span>
            <span className="text-primary block">{t("findHome.title2","in Dubai")}</span>
          </h2>
          <div className="max-w-[630px] mx-auto underline-gradient" />
          <p className="text-gray-500 font-primary my-4">
            {t("findHome.subTitle","Explore Dubai's most exclusive communities, curated for your unique way of living.")}
          </p>
        </div>

        {/* Grid of clickable images */}
        <div className="hidden lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-10">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link as any}
              className="relative group rounded-sm overflow-hidden shadow-md block"
            >
              <Image
                src={card.src}
                alt={card.title}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute flex-col justify-between inset-0 bg-linear-to-b from-transparent to-[#01366fa8] flex items-center transition-opacity duration-300">
                <br />
                <p className="text-white text-sm text-center font-medium max-w-[200px] cursor-pointer py-2">
                  {card.title}
                </p>
                <div className="text-white text-sm flex items-center justify-center gap-2 p-5 text-center font-medium max-w-[200px] cursor-pointer">
                  <span>
                    View <br />
                    Listings
                  </span>
                  <span>
                    <CiCircleChevRight className="text-gold text-2xl" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="lg:hidden mb-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              0: { slidesPerView: 1 },
              420: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".findhome-next",
              prevEl: ".findhome-prev",
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={cards.length > 2}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={card.link as any}
                  className="max-h-[400px] relative group rounded-sm overflow-hidden shadow-md block"
                >
                  <Image
                    src={card.src}
                    alt={card.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute flex-col justify-between inset-0 bg-gradient-to-b from-transparent to-[#01366fa8] flex items-center transition-opacity duration-300">
                    <br />
                    <p className="text-white text-sm text-center font-medium max-w-[200px] cursor-pointer py-2">
                      {card.title}
                    </p>
                    <div className="text-white text-[14px] flex items-center justify-center gap-2 p-5 text-center font-medium max-w-[200px] cursor-pointer">
                      <span>
                        View <br />
                        Listings
                      </span>
                      <span>
                        <CiCircleChevRight className="text-gold text-2xl" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom banner */}
        {/* <div className="flex flex-col md:flex-row bg-gray-200 rounded-2xl overflow-hidden shadow-md mx-auto">
          <div className="flex flex-col justify-center p-6 md:p-10 md:w-1/2">
            <h3 className="font-medium text-gray-700 mb-2 text-xl">
              {t("findHome.list.subTitle")}
            </h3>
            <h4 className="text-black mb-4 leading-tight lg:text-3xl text-2xl font-bold">
              {t("findHome.list.title")}
            </h4>
            <p className="text-gray-700 mb-6">{t("findHome.list.desc")}</p>
            <Link
              href={`/${locale}/off-plan`}
              className="self-start px-4 lg:px-8 lg:py-3 py-2 bg-white text-black font-medium rounded-md border border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              {t("findHome.list.button")}
            </Link>
          </div>
          <div className="md:max-w-[694px] w-full h-64 md:h-auto">
            <Image
              src="/images/find-home/home.png"
              alt="List Property"
              width={694}
              height={400}
              className="w-full h-full object-cover md:rounded-none rounded-b-2xl md:rounded-r-2xl"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FindHomeSection;
