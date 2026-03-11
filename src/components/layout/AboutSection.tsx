"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";

const AboutSection = () => {
  const { t } = useTranslation("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <section className="bg-white py-5 lg:py-16">
      {/* Centered container */}
      <div className="container max-w-[1200px] mx-auto flex flex-col px-4 md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 mb-7 lg:mb-10 md:mb-0 md:mx-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-6">
            {t("about.title")}
          </h2>

          <p className="text-black mb-10 leading-[20px] lg:leading-relaxed text-base font-extralight">
            {t("about.description")}
          </p>

          {/* Link with locale */}
          <Link
            href={`/${locale}/about`}
            className="lg:mt-4 px-4 lg:px-8 py-2 lg:py-3 border border-black text-black text-base font-normal hover:bg-black hover:text-white transition-all duration-300 cursor-pointer rounded-[3.75px] tracking-wide"
          >
            {t("about.button")}
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-end">
          <Image
            src="/images/about-us/team.jpg"
            alt="Gulf Estates Team"
            width={600}
            height={400}
            className="w-full max-w-xl rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
