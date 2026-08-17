"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import HeroSection2 from "@/components/common/HeroSection2";
import {
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineOfficeBuilding,
  HiOutlineDesktopComputer,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const WHY_START_ICONS = [
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineOfficeBuilding,
  HiOutlineDesktopComputer,
  HiOutlineLightningBolt,
];

const DEFAULT_WHY_START = [
  "Investors of all nationalities can establish and fully own companies, subject to applicable laws and activity-specific requirements.",
  "More than 2,000 economic activities are available across the UAE.",
  "The UAE has more than 40 free zones offering different business setup options.",
  "Businesses can apply through digital platforms or government service centres.",
  "Basher can enable eligible investors to establish a business online in a very short time.",
];

type Step = { title: string; text: string };

const DEFAULT_STEPS: Step[] = [
  { title: "Choose your business activity", text: "Select from the UAE's wide range of economic activities and identify the appropriate licence." },
  { title: "Choose the legal structure", text: "Options may include LLC, sole establishment, civil company, branches and joint-stock companies, depending on the activity." },
  { title: "Reserve a trade name", text: "The name must meet UAE requirements and be available for registration." },
  { title: "Obtain initial approval", text: "This confirms there is no objection to proceeding with the company setup; it does not itself authorise business operations." },
  { title: "Prepare company documents", text: "A Memorandum of Association or other documents may be required depending on the legal structure." },
  { title: "Choose your business location", text: "Companies generally need a physical address that meets local requirements." },
  { title: "Obtain additional approvals", text: "Certain regulated activities require approval from the relevant government authority." },
  { title: "Submit documents", text: "Provide the required application, approvals, lease documents and company documents." },
  { title: "Pay fees and receive your license", text: "Once requirements are completed, the commercial licence can be issued through the relevant authority." },
  { title: "Chamber registration", text: "Where applicable, register with the Chamber of Commerce in the emirate where the company is established." },
];

const DEFAULT_STRUCTURES = [
  "Free Zone Limited Liability Company (FZ LLC)",
  "Free Zone Company (FZ Co.)",
  "Free Zone Establishment (FZE)",
];

interface CompanySetupLandingProps {
  locale: string;
}

export default function CompanySetupLanding({ locale }: CompanySetupLandingProps) {
  const { t } = useTranslation("company-setup");

  const whyStartRaw = t("whyStart.items", { returnObjects: true, defaultValue: DEFAULT_WHY_START });
  const whyStart = Array.isArray(whyStartRaw) ? whyStartRaw : DEFAULT_WHY_START;

  const stepsRaw = t("mainland.steps", { returnObjects: true, defaultValue: DEFAULT_STEPS });
  const steps: Step[] = Array.isArray(stepsRaw) ? stepsRaw : DEFAULT_STEPS;

  const structuresRaw = t("freeZone.structures", { returnObjects: true, defaultValue: DEFAULT_STRUCTURES });
  const structures = Array.isArray(structuresRaw) ? structuresRaw : DEFAULT_STRUCTURES;

  return (
    <div className="bg-white text-black">
      <HeroSection2 title={t("hero.title", "Establish a Company in the UAE")} />

      {/* Intro */}
      <section className="bg-white pt-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-400 max-w-[700px] mx-auto mb-4 italic">
            {t(
              "intro.eyebrow",
              "A concise, website-ready summary based on the UAE Ministry of Economy & Tourism's official guidance on establishing businesses in the UAE."
            )}
          </p>
          <h1 className="text-xl lg:text-2xl text-black font-extrabold flex gap-2 items-center justify-center flex-wrap">
            <span className="text-primary block">{t("intro.title", "Start Your")}</span>
            <span className="text-gold block">{t("intro.highlight", "Business in the UAE")}</span>
          </h1>
          <div className="max-w-[630px] mx-auto underline-gradient" />
          <p className="text-gray-500 font-primary my-4 max-w-[820px] mx-auto">
            {t(
              "intro.description",
              "The UAE offers a streamlined process for establishing businesses across all seven emirates. Investors can set up a company through mainland economic departments, free zones, or online services such as the Basher platform."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link
              href={`/${locale}/contact`}
              className="px-4 lg:px-8 py-2 lg:py-3 bg-primary text-white text-base font-normal hover:bg-primary/90 transition-all duration-300 cursor-pointer rounded-[3.75px] tracking-wide"
            >
              {t("intro.ctaPrimary", "Start Your UAE Business")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-4 lg:px-8 py-2 lg:py-3 border border-black text-black text-base font-normal hover:bg-black hover:text-white transition-all duration-300 cursor-pointer rounded-[3.75px] tracking-wide"
            >
              {t("intro.ctaSecondary", "Check Your Business Setup Options")}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Start a Business */}
      <section className="py-10 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl lg:text-2xl text-primary font-extrabold text-center mb-8">
            {t("whyStart.title", "Why Start a Business in the UAE?")}
          </h2>
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyStart.map((item, index) => {
              const IconComponent = WHY_START_ICONS[index % WHY_START_ICONS.length];
              return (
                <div key={`why-start-${index}`} className="flex items-start gap-3">
                  <span className="shrink-0 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-primary">
                    <IconComponent className="text-xl" />
                  </span>
                  <span className="text-black text-sm leading-relaxed">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mainland Company Setup */}
      <section id="mainland" className="py-10">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div>
            <h2 className="min-w-[160px] tracking-wide uppercase text-2xl text-primary">
              {t("mainland.title", "Mainland Company Setup")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full" />
          </div>
          <p className="font-primary tracking-wide text-gray-600">
            {t(
              "mainland.text",
              "For a mainland company, the process generally includes selecting the business activity, choosing the legal structure, reserving a trade name, obtaining initial approval, preparing the required company documents, selecting a business location, obtaining any additional approvals, submitting documents, paying fees and receiving the commercial licence."
            )}
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="rounded-2xl bg-primary px-6 py-8 text-white md:px-8 md:py-10">
            <h3 className="font-secondary text-2xl md:text-3xl">{t("mainland.stepsTitle", "Step-by-Step Process")}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={`mainland-step-${index}`} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <h4 className="mt-3 text-base font-semibold">{step.title}</h4>
                  <p className="mt-2 text-sm text-white/90">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Zone Company Setup */}
      <section id="free-zone" className="py-10">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div>
            <h2 className="min-w-[160px] tracking-wide uppercase text-2xl text-primary">
              {t("freeZone.title", "Free Zone Company Setup")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full" />
          </div>
          <p className="font-primary tracking-wide text-gray-600">
            {t(
              "freeZone.text",
              "Free zones offer specialised setup options for investors and entrepreneurs. Depending on the free zone and business activity, available licences can include commercial, consultancy, industrial, educational, media, eCommerce, freelancer, warehousing, manufacturing and innovation licences."
            )}
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <h3 className="text-lg font-semibold text-primary mb-4">
            {t("freeZone.structuresTitle", "Free Zone Legal Structures")}
          </h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {structures.map((structure, index) => (
              <span
                key={`fz-structure-${index}`}
                className="px-4 py-2 rounded-full border border-gold/60 text-primary text-sm font-medium bg-gold/10"
              >
                {structure}
              </span>
            ))}
          </div>

          <div className="rounded-2xl border border-primary/10 bg-[#f8fbff] p-6 md:p-8">
            <h3 className="text-lg font-semibold text-primary mb-2">
              {t("freeZone.requirementsTitle", "Common Free Zone Requirements")}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t(
                "freeZone.requirementsText",
                "Investors may be asked for an application form, business plan, passport copies, manager/shareholder documents and other supporting documents. Requirements vary by free zone, business activity and company structure."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Choose the Right Setup */}
      <section className="py-10">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div>
            <h2 className="min-w-[160px] tracking-wide uppercase text-2xl text-primary">
              {t("chooseRight.title", "Choose the Right Setup")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full" />
          </div>
          <p className="font-primary tracking-wide text-gray-600">
            {t(
              "chooseRight.text",
              "The best structure depends on your business activity, preferred location, office requirements and long-term plans. Mainland and free zone businesses have different licensing, location and regulatory requirements."
            )}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-[1200px] mx-auto rounded-sm shadow-xl bg-primary">
            <div className="px-6 sm:px-10 py-10 text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-bold">
                {t("cta.title", "Need Help Setting Up")}{" "}
                <span className="text-gold">{t("cta.highlight", "Your UAE Company?")}</span>
              </h3>
              <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/90">
                {t(
                  "cta.description",
                  "Our team can help you understand the available company setup options, identify a suitable business structure and guide you through the next steps."
                )}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-6 inline-block bg-gold text-primary px-6 lg:px-8 py-2.5 lg:py-3 rounded-[3.75px] font-semibold uppercase tracking-wide hover:bg-white transition-all duration-300"
              >
                {t("cta.button", "Talk to a Business Setup Advisor")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-gray-200 rounded-sm p-5 bg-gray-50">
            <h4 className="text-sm font-semibold text-[#606060] mb-1">
              {t("disclaimer.title", "Important Disclaimer")}
            </h4>
            <p className="text-sm text-[#606060] leading-relaxed">
              {t(
                "disclaimer.text",
                "Business setup requirements, fees, approvals and licensing conditions can vary by emirate, free zone, legal structure and business activity. Applicants should confirm the latest requirements with the relevant UAE authorities before proceeding."
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
