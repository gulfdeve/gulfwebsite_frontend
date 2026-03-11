"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { usePathname } from "next/navigation";
import HeroSection2 from "@/components/common/HeroSection2";
import AboutPageSkeleton from "@/components/about/AboutPageSkeleton";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";

function AboutPage() {
  const { t } = useTranslation("about");
  const pathname = usePathname();
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  const getCurrentLocale = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments[0] && ["en", "fr", "es"].includes(segments[0])
      ? segments[0]
      : "en";
  };

  const currentLocale = getCurrentLocale();

  useEffect(() => {
    setBannerLoading(true);
    fetchPageContentByType("about", currentLocale).then((data) => {
      setBannerData(data);
      setBannerLoading(false);
    });
  }, [currentLocale]);

  if (bannerLoading) {
    return <AboutPageSkeleton />;
  }

  return (
    <div className="bg-white text-black">
      <HeroSection2
          title={
            bannerData?.title ||
            t("hero.title", "About Gulf Estates - Dubai Luxury Real Estate Experts")
          }
          imageSrc={
            bannerData?.bannerType === "image" && bannerData?.bannerUrl
              ? bannerData.bannerUrl
              : "/images/blogs/bg-blog.png"
          }
        />
      {/* <div className="relative -mt-18 sm:h-18 bg-gradient-to-b from-[#2F4D5F] to-white z-20"></div> */}

      {/* Intro Section */}
      <section className="bg-white mt-6 sm:mt-0">
        <div className="container mx-auto px-4 md:px-8">
          <div className="py-8 flex flex-col justify-center lg:max-w-[1300px] mx-auto">
            <h2 className="font-semibold text-primary text-center font-primary text-2xl lg:text-3xl mb-6">
              {t("intro.heading","Welcome to Gulf Estates - Where Luxury Meets Expertise")}
            </h2>
            <p className="mb-2 text-gray-600 font-primary">
              {t("intro.paragraph1","At Gulf Estates, we don't just sell property; we craft futures. As an esteemed entity within the Centaurus Group, a global force in luxury sectors from yachts to e-commerce, we bring unmatched expertise to Dubai's dynamic real estate market. Our focus: connecting local and international clients with luxury residences that perfectly align with their aspirations, whether for a dream home, robust investment, or advantageous residency. Experience a property journey defined by insight, personalized service, and effortless success.")}
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="meet-the-team" className="py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:px-8 px-4">
          {/* Left Image */}
          <div className="w-full md:w-1/2 relative">
            <Image
              src="/images/about/team.webp"
              alt="Legacy"
              width={800}
              height={600}
              className="rounded-[10px] w-full h-auto object-cover z-40 relative"
            />
            <Image
              src="/images/bg-dots.png"
              width={200}
              height={200}
              alt="background"
              className="absolute -top-8 -left-10 z-0"
            />
            <Link
              href={`/${currentLocale}/our-team`}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-2 sm:px-4 cursor-pointer py-1.5 border border-white text-white/90 text-base font-medium hover:bg-white hover:text-black transition-all rounded-full duration-300 z-50"
            >
              {t("legacySection1.buttonText","MEET THE TEAM")}
            </Link>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 flex flex-wrap">
            <div className="w-1/2 px-2 space-y-2 border-l-8 border-[#DEB66A]">
              <p className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-primary">
                20+
              </p>
              <p className="text-gray-600 text-lg">{t("statistics.yearsOfExperience", "Years of Experience")}</p>
            </div>
            <div className="w-1/2 px-2 space-y-2 border-l-8 border-[#DEB66A]">
              <p className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-primary">
                300+
              </p>
              <p className="text-gray-600 text-lg">{t("statistics.satisfiedClients", "Satisfied Clients")}</p>
            </div>
            <div className="w-1/2 px-2 mt-12 space-y-2 border-l-8 border-[#DEB66A]">
              <p className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-primary">
                20+
              </p>
              <p className="text-gray-600 text-lg">{t("statistics.certifiedAwards", "Certified Awards")}</p>
            </div>
            <div className="w-1/2 px-2 mt-12 space-y-2 border-l-8 border-[#DEB66A]">
              <p className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-primary">
                1000+
              </p>
              <p className="text-gray-600 text-lg">{t("statistics.projectsDone", "Projects Done")}</p>
            </div>
          </div>
        </div>
      </section>
      {/* legacy */}
      <section className="bg-[linear-gradient(92.08deg,#01366F_2.92%,#0E4076_35.89%,#214F81_60.44%,#6786A9_92.09%)] py-12 text-white/90">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div>
            <h2 className="min-w-[160px] tracking-wide uppercase text-2xl">
              {t("legacySection1.title","Our Legacy")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full" />
          </div>
          <p className="font-primary tracking-wide">
            {t("legacySection1.paragraph","Established in 2007, the Centaurus Group stands as a beacon of excellence across diverse luxury sectors. From elevating premium drinks retail through Centaurus International to crafting bespoke voyages with Centaurus Charter, our journey is defined by unwavering quality, innovation, and client devotion. As a proud extension of this distinguished heritage, Gulf Estates reimagines the Dubai real estate landscape, granting clients unparalleled access to the city's most prestigious properties and opportunities.")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-12">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div className="">
            <h2 className="min-w-[160px] tracking-wide uppercase text-2xl text-primary">
              {t("missionVision.mission.title","Our Mission")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full" />
          </div>
          <p className="font-primary tracking-wide text-gray-600">
            {t("missionVision.mission.text","Our mission is clear: to simplify and elevate the real estate journey for buyers, sellers, and investors alike. We are driven by a client-first philosophy, ensuring that every transaction is seamless, transparent, and tailored to meet your specific needs. Whether you’re investing in your dream property or seeking high-return investments, Gulf Estates is here to guide you every step of the way.")}
          </p>
        </div>
      </section>
      {/* Vision */}
      <section
        id="vision"
        className="bg-[url('/images/about-us/bg-vision.png')] bg-cover bg-center bg-no-repeat py-12 text-white"
      >
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-11 justify-between">
          <div>
            <h2 className="min-w-[160px] tracking-wide uppercase text-2xl">
              {t("missionVision.vision.title","Our Vision")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full" />
          </div>
          <p className="tracking-wide">{t("missionVision.vision.text","We envision a future where Gulf Estates is synonymous with refined living, strategic investment, and exceptional client experiences. As a bridge between global aspirations and iconic Dubai properties, we strive to create a seamless path from desire to ownership. Through cutting-edge digital tools, enduring partnerships, and an unwavering commitment to excellence, we aim to shape Dubai’s skyline—not just with buildings, but with trust, legacy, and distinction.")}</p>
        </div>
      </section>
      {/* dreamssection */}
      <section id="mission" className="py-12">
        <div className="w-[90%] max-w-[1400px] mx-auto flex md:flex-row flex-col gap-8 justify-between">
          <div className="">
            <h2 className="min-w-[180px] text-primary tracking-wide uppercase text-2xl">
              {t("dream.title","Your Dubai Dream Starts Here.")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full" />
          </div>
          <p className="tracking-wide text-gray-600">{t("dream.desc","Whether you're a first-time homebuyer, a seasoned investor expanding your portfolio, or seeking long-term residency, Gulf Estates is your trusted guide. We specialize in transforming aspirations into reality, connecting you with the perfect address within Dubai's vibrant luxury real estate market.")}</p>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
