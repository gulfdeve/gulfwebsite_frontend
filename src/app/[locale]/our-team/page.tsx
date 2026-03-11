// app/[locale]/our-team/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TeamSection from "@/components/team/TeamSection";
import OurTeamSkeleton from "@/components/team/OurTeamSkeleton";
import { useTranslation } from "next-i18next";
import HeroSection2 from "@/components/common/HeroSection2";
import { useParams } from "next/navigation";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import { validateLocale } from "@/utils/routeSecurity";
import "swiper/css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend.gulfestates.ae";

export default function OurTeamPage() {
  const { t } = useTranslation("team");
  const params = useParams();
  const locale = validateLocale(params?.locale as string);
  const [teamData, setTeamData] = useState<any>(null);
  const [teamImage, setTeamImage] = useState<any[]>([]);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/api/team?locale=${locale}`).then((r) => r.json()),
      fetchPageContentByType("ourteam", locale),
    ]).then(([teamRes, banner]) => {
      if (teamRes?.success) {
        setTeamData(teamRes.data || {});
        setTeamImage(teamRes.data?.teamslider || []);
      }
      setBannerData(banner);
      setLoading(false);
    });
  }, [locale]);

  if (loading) {
    return <OurTeamSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroSection2
        title={
          bannerData?.title ||
          t("title", "Our Team - Experts Behind Gulf Estates")
        }
        imageSrc={
          bannerData?.bannerType === "image" && bannerData?.bannerUrl
            ? bannerData.bannerUrl
            : "/images/blogs/bg-blog.png"
        }
      />
      <div className="overflow-hidden w-full">
        <div className="marquee flex gap-6">
          {(teamImage || [])?.map((img: any, index: number) => (
            <div key={index} className="shrink-0">
              <Image
                src={img?.image || ""}
                width={150}
                height={150}
                alt={img?.name || "Team Members Image"}
                className="rounded-md object-contain saturate-0 sm:w-[150px] w-[120px]"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          display: flex;
          width: max-content;
          animation: scroll 85s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="flex flex-col text-center mt-6">
        <div className="max-w-[950px] mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col mb-1 sm:mb-4">
            {teamData?.title?.[locale || "en"] && (
              <h2 className="sm:text-3xl text-primary text-lg font-semibold">
                {teamData?.title?.[locale || "en"] ||
                  "Meet the Visionaries Behind Gulf Estates"}
              </h2>
            )}
            <div className="underline-gradient h-px w-full" />
          </div>
          {teamData?.description?.[locale || "en"] && (
            <p className="font-primary text-center sm:text-base font-extralight text-base leading-relaxed">
              {teamData?.description?.[locale || "en"] || ""}
            </p>
          )}
        </div>
      </div>
      {/* CEO Card */}
      {!teamData?.owner?.image &&
        !teamData?.owner?.name &&
        !teamData?.owner?.role ? null : (
          <div className="relative max-w-[1400px] mx-auto">
            <div className="bg-[linear-gradient(90deg,#01366F_42.13%,#0D4077_71.07%,#2A5E95_100%)] rounded-md mt-6 w-full lg:w-[80%] mx-auto text-white">
              <div className="mx-auto">
                <div className="flex flex-col sm:flex-row items-center sm:gap-4 lg:gap-12">
                  <div className="w-full lg:w-1/3">
                    <div className="relative w-full aspect-4/4 sm:aspect-3/4 max-[1280px]:min-h-[500px] max-[1280px]:aspect-auto mask-image overflow-hidden">
                      <Image
                        src={teamData?.owner?.image || "/images/team/ceo.webp"}
                        alt={teamData?.owner?.name || "CEO Image"}
                        fill
                        className="sm:object-cover object-contain rounded-l-md"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-2/3 py-8 lg:px-4 px-2">
                    <h2 className="text-2xl lg:text-3xl font-bold">
                      {teamData?.owner?.name || ""}
                    </h2>
                    <h3 className="text-lg lg:text-2xl mb-2 font-semibold">
                      {teamData?.owner?.role || ""}
                    </h3>
                    <div className="text-sm md:text-base leading-relaxed text-gray-200 pr-6 font-primary space-y-4">
                      {teamData?.owner?.description?.[locale || "en"] || ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Team Section */}
      <TeamSection />
    </div>
  );
}
