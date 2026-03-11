"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as string)?.toLowerCase() || "en";
  const { t } = useTranslation("common");

  // Validate locale - if invalid, use 'en'
  const validLocale = ["en", "es", "fr"].includes(locale) ? locale : "en";

  return (
    <>
      <Navbar locale={validLocale} />
      <div className="min-h-screen bg-white text-white flex flex-col items-center justify-center">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-2 py-4 mt-28">
          <h1 className="text-[100px] md:text-[150px] lg:text-[200px] font-bold text-primary leading-none mb-4 font-bebas">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-primary font-bebas">
            {t("notFound.title", "Page Not Found")}
          </h2>
          <p className="text-sm md:text-lg text-primary mb-8 font-primary max-w-2xl mx-auto">
            {t("notFound.description", "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${validLocale}`}
              className="bg-primary text-white font-bold px-8 py-3 rounded-md min-w-[200px] text-center"
            >
              {t("notFound.goToHome", "Go to Home")}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-3 rounded-md min-w-[200px]"
            >
              {t("notFound.goBack", "Go Back")}
            </button>
          </div>
        </div>
      </div>
      <Footer locale={validLocale} />
    </>
  );
}
