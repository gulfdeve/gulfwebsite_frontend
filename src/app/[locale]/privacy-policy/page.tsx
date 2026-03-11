"use client";
import { ComponentType, useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { validateLocale } from "@/utils/routeSecurity";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import PrivacyPolicyPageSkeleton from "@/components/privacy/PrivacyPolicyPageSkeleton";
import { BsDatabase } from "react-icons/bs";
import { FiShield } from "react-icons/fi";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import { RiUserFollowLine } from "react-icons/ri";
import { RxGlobe } from "react-icons/rx";
import { TbMail } from "react-icons/tb";
import HeroSection2 from "@/components/common/HeroSection2";

const sectionIconMap: Record<string, ComponentType<any>> = {
  introduction: IoDocumentTextOutline,
  "data-collection": BsDatabase,
  "use-of-data": IoSettingsOutline,
  cookies: RxGlobe,
  "third-party": FiShield,
  rights: RiUserFollowLine,
  contact: TbMail,
};

type NavItem = { id: string; label: string };
type SectionContent = {
  id: string;
  title: string;
  content?: string[];
  bullets?: string[];
  footnote?: string;
};

function PrivacyPolicyPage() {
  const { t } = useTranslation("privacy-policy");
  const params = useParams();
  const locale = validateLocale(params?.locale as string);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const rawNav = t("nav", { returnObjects: true });
  const rawSections = t("sections", { returnObjects: true });

  const navItems: NavItem[] = Array.isArray(rawNav) ? rawNav : [];
  const sections: SectionContent[] = Array.isArray(rawSections)
    ? rawSections
    : [];

  // Fetch page content from API
  useEffect(() => {
    const fetchBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("privacy", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  if (bannerLoading) return <PrivacyPolicyPageSkeleton />;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection2
        title={
          bannerData?.title ||
          t("title", "Privacy Policy")
        }
        imageSrc={
          bannerData?.bannerType === "image" && bannerData?.bannerUrl
            ? bannerData.bannerUrl
            : "/images/blogs/bg-blog.png"
        }
      />
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <nav className="grid gap-6 sm:grid-cols-2 max-w-3xl mb-8 text-sm text-gray-700">
            {navItems.map(({ id, label }) => {
              const Icon = sectionIconMap[id];
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center w-fit gap-3 hover:text-primary transition-colors"
                >
                  {Icon && <Icon size={20} />}
                  <span>{label}</span>
                </a>
              );
            })}
          </nav>
          <hr className="my-8 border-b border-gray-300" />
          <div className="space-y-10">
            {sections.map(({ id, title, content, bullets, footnote }) => {
              const Icon = sectionIconMap[id];
              return (
                <section
                  key={id}
                  id={id}
                  className="space-y-1 text-gray-700 text-sm leading-relaxed"
                >
                  <div className="mb-4 flex items-center gap-2 text-gray-700 font-semibold text-lg">
                    {Icon && <Icon className="text-primary" size={25} />}
                    <h2>{title}</h2>
                  </div>
                  {content?.map((paragraph, idx) => (
                    <p className="text-gray-700" key={idx}>
                      {paragraph}
                    </p>
                  ))}
                  {bullets && (
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
                      {bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {footnote && (
                    <p className="text-sm text-gray-600 mt-2">{footnote}</p>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
