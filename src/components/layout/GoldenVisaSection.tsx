"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import {
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
} from "react-icons/hi";

const BENEFIT_ICONS = [
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
];

const DEFAULT_BENEFITS = [
  "5- or 10-year renewable residence, depending on the category.",
  "No traditional sponsor is required.",
  "Greater flexibility when staying outside the UAE.",
  "Ability to sponsor eligible family members, including spouse and children.",
  "A long-term residency option for investors, professionals, entrepreneurs and exceptional talents.",
];

const GoldenVisaSection = () => {
  const { t } = useTranslation("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const benefitsRaw = t("goldenVisa.benefits", {
    returnObjects: true,
    defaultValue: DEFAULT_BENEFITS,
  });
  const benefits = Array.isArray(benefitsRaw) ? benefitsRaw : DEFAULT_BENEFITS;

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 text-center">
          <h2 className="text-xl lg:text-2xl text-black font-extrabold flex gap-2 items-center justify-center flex-wrap">
            <span className="text-primary block">{t("goldenVisa.title", "UAE")}</span>
            <span className="text-gold block">{t("goldenVisa.highlight", "Golden Visa")}</span>
          </h2>
          <div className="max-w-[630px] mx-auto underline-gradient" />
          <p className="text-gray-500 font-primary my-4 max-w-[820px] mx-auto">
            {t(
              "goldenVisa.description",
              "The UAE Golden Visa is a long-term residence visa for eligible Real Estate investors, entrepreneurs, exceptional talents, outstanding students and graduates, humanitarian pioneers and frontline heroes. It allows eligible residents to live, work or study in the UAE with greater long-term stability."
            )}
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto border border-gold/40 rounded-sm shadow-md p-6 lg:p-10">
          <h3 className="text-primary font-bold text-lg mb-6">
            {t("goldenVisa.benefitsTitle", "Key Benefits")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
              return (
                <div key={`golden-visa-benefit-${index}`} className="flex items-start gap-3">
                  <span className="shrink-0 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-primary">
                    <IconComponent className="text-xl" />
                  </span>
                  <span className="text-black text-sm leading-relaxed">{benefit}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="px-4 lg:px-8 py-2 lg:py-3 border border-black text-black text-base font-normal hover:bg-black hover:text-white transition-all duration-300 cursor-pointer rounded-[3.75px] tracking-wide"
          >
            {t("goldenVisa.button", "ENQUIRE ABOUT ELIGIBILITY")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GoldenVisaSection;
