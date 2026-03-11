"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { HiOutlineHome, HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineElectricBolt } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

// Stable defaults so server and client render the same initial output (avoids hydration mismatch)
const DEFAULT_FEATURES = ["SMART HOME DESIGNS", "PRIME LOCATIONS", "SUSTAINABLE LIVING SOLUTIONS", "BEST INVESTMENT PLANS"];

const OffPlanSection = () => {
  const { t } = useTranslation("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuresRaw = mounted ? t("off-plan.features", { returnObjects: true, defaultValue: DEFAULT_FEATURES }) : DEFAULT_FEATURES;
  const features = Array.isArray(featuresRaw) ? featuresRaw : DEFAULT_FEATURES;

  const featureIcons = [
    HiOutlineHome,
    HiOutlineLocationMarker,
    MdOutlineElectricBolt,
    RiMoneyDollarCircleLine,
  ];

  return (
    <div className="p-2">
      <h3 className="text-xl lg:text-2xl text-primary font-extrabold flex gap-2 items-center justify-center flex-wrap ">
        {t("off-plan.sectionTitle1","Leading UAE")}{" "}
        <span className="text-gold">{t("off-plan.sectionTitle2","Property Developers")}</span>{" "}
        {t("off-plan.sectionTitle3","& Master Communities")}
      </h3>
      <div className="max-w-[650px] mt-1 w-full mx-auto underline-gradient" />
      <section className="relative w-full p-4">
        <div className="relative bg-white max-w-[1200px] mx-auto flex flex-col md:flex-row gap-4">
          <Image
            src="/images/newsletter-dots.svg"
            alt="dots"
            width={200}
            height={200}
            className="md:block hidden absolute -top-14 -left-14 -z-10 w-[130px]"
          />
          <div className="md:w-1/2 w-full">
            <Image
              src="/images/leading-real-estate.webp"
              alt="Dubai Skyline with Off-Plan Properties"
              width={800}
              height={600}
              className="w-full h-[350px] object-cover rounded-sm border-3 border-gold"
              priority
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-2">
            <p className="text-gray-600 text-[14px] leading-relaxed">
              {t("off-plan.p1","Dubai’s real estate market continues to thrive, with off-plan properties offering some of the most rewarding investment opportunities. Buying under-construction real estate not only allows you to secure premium units at launch prices, but also opens the door to flexible payment plans and strong capital appreciation.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {features.slice(0, 4).map((feature, index) => {
                const IconComponent = featureIcons[index % featureIcons.length];
                return (
                  <div
                    key={`feature-${index}`}
                    className="flex items-center gap-3 rounded-full py-2"
                  >
                    <span className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-primary">
                      <IconComponent className="text-xl" />
                    </span>
                    <span className="max-w-[200px] text-primary font-medium text-sm">
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <Link
                href={`/${locale}/off-plan`}
                className="inline-flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors duration-300"
              >
                {t("off-plan.button","Explore More")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffPlanSection;
