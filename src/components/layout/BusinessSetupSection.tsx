"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";

const BusinessSetupSection = () => {
  const { t } = useTranslation("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 text-center">
          <h2 className="text-xl lg:text-2xl text-black font-extrabold flex gap-2 items-center justify-center flex-wrap">
            <span className="text-primary block">{t("businessSetup.title", "Start Your")}</span>
            <span className="text-gold block">{t("businessSetup.highlight", "Business in the UAE")}</span>
          </h2>
          <div className="max-w-[630px] mx-auto underline-gradient" />
          <p className="text-gray-500 font-primary my-4 max-w-[820px] mx-auto">
            {t(
              "businessSetup.description",
              "The UAE offers a streamlined process for establishing businesses across all seven emirates. Investors can set up a company through mainland economic departments, free zones, or online services such as the Basher platform."
            )}
          </p>
        </div>

        <div className="relative max-w-[1200px] mx-auto rounded-sm shadow-xl bg-primary">
          <div className="px-6 sm:px-10 py-10 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold">
              {t("businessSetup.helpTitle", "Need Help Setting Up")}{" "}
              <span className="text-gold">{t("businessSetup.helpHighlight", "Your UAE Company?")}</span>
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/90">
              {t(
                "businessSetup.helpDescription",
                "Our team can help you understand the available company setup options, identify a suitable business structure and guide you through the next steps."
              )}
            </p>
            <Link
              href={`/${locale}/investors-business-setup-uae`}
              className="mt-6 inline-block bg-gold text-primary px-6 lg:px-8 py-2.5 lg:py-3 rounded-[3.75px] font-semibold uppercase tracking-wide hover:bg-white transition-all duration-300"
            >
              {t("businessSetup.button", "Learn More")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSetupSection;
