"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import JobApplicationModal from "@/components/JobApplicationModal";
import HeroSection2 from "@/components/common/HeroSection2";
import CareersPageSkeleton from "@/components/careers/CareersPageSkeleton";
import { cleanHtmlForDisplay } from "@/utils/htmlCleaner";
import { fetchPageContentByType, type PageContentData } from "@/utils/pageContent";
import { validateLocale } from "@/utils/routeSecurity";

interface Job {
  _id: string;
  id?: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: string;
  department?: string;
  experience?: string;
  salary?: string;
  languages?: {
    es?: {
      title?: string;
      description?: string;
    };
    fr?: {
      title?: string;
      description?: string;
    };
  };
  createdAt?: string;
}

function Careers() {
  const { t } = useTranslation("careers");
  const params = useParams();
  const locale = validateLocale(params?.locale as string);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerData, setBannerData] = useState<PageContentData | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        // Only fetch jobs that have content in the current locale
        const response = await fetch(
          `${API_URL}/api/jobs?page=1&limit=100&locale=${locale}&status=Open`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();

        if (data.success && data.data?.items) {
          // Filter jobs to only show those with content in current locale
          // This is a strict filter to ensure jobs only appear in their language
          const filteredJobs = data.data.items.filter((job: Job) => {
            if (locale === "en") {
              // For English: must have English title AND it should not be empty
              // Also check that it's not a French/Spanish-only job
              const hasEnglishTitle = job.title && job.title.trim() !== "";
              const hasOnlyFrench = job.languages?.fr?.title && !hasEnglishTitle;
              const hasOnlySpanish = job.languages?.es?.title && !hasEnglishTitle;

              // Only show if it has English title and is not French/Spanish only
              return hasEnglishTitle && !hasOnlyFrench && !hasOnlySpanish;
            } else if (locale === "es") {
              // For Spanish: must have Spanish title, and should not show if only English exists
              return job.languages?.es?.title && job.languages.es.title.trim() !== "";
            } else if (locale === "fr") {
              // For French: must have French title, and should not show if only English exists
              return job.languages?.fr?.title && job.languages.fr.title.trim() !== "";
            }
            return false;
          });
          setJobs(filteredJobs);
        } else {
          setJobs([]);
        }
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError(err.message || "Failed to load jobs");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [locale]);

  // Fetch page content from API
  useEffect(() => {
    const fetchBanner = async () => {
      setBannerLoading(true);
      const data = await fetchPageContentByType("careers", locale);
      setBannerData(data);
      setBannerLoading(false);
    };
    fetchBanner();
  }, [locale]);

  const getLocalizedTitle = (job: Job): string => {
    if (locale === "fr" && job.languages?.fr?.title) {
      return job.languages.fr.title;
    }
    if (locale === "es" && job.languages?.es?.title) {
      return job.languages.es.title;
    }
    return job.title;
  };

  const getLocalizedDescription = (job: Job): string => {
    if (locale === "fr" && job.languages?.fr?.description) {
      return job.languages.fr.description;
    }
    if (locale === "es" && job.languages?.es?.description) {
      return job.languages.es.description;
    }
    return job.description;
  };

  const getLocationLabel = (location: string): string => {
    const locationMap: { [key: string]: { en: string; es: string; fr: string } } = {
      "On-site": { en: "On-site", es: "Presencial", fr: "Sur site" },
      "Remote": { en: "Remote", es: "Remoto", fr: "À distance" },
      "Hybrid": { en: "Hybrid", es: "Híbrido", fr: "Hybride" },
    };
    return locationMap[location]?.[locale as "en" | "es" | "fr"] || location;
  };

  const getTypeLabel = (type: string): string => {
    const typeMap: { [key: string]: { en: string; es: string; fr: string } } = {
      "Full Time": { en: "Full Time", es: "Tiempo Completo", fr: "Temps plein" },
      "Part Time": { en: "Part Time", es: "Medio Tiempo", fr: "Temps partiel" },
      "Contract": { en: "Contract", es: "Contrato", fr: "Contrat" },
    };
    return typeMap[type]?.[locale as "en" | "es" | "fr"] || type;
  };

  if (bannerLoading || loading) return <CareersPageSkeleton />;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative">
        <HeroSection2
            title={
              bannerData?.title ||
              t("hero.label","Careers at Gulf Estates | Join Our Real Estate Team in UAE")
            }
            imageSrc={
              bannerData?.bannerType === "image" && bannerData?.bannerUrl
                ? bannerData.bannerUrl
                : "/images/blogs/bg-blog.png"
            }
          />
        {/* Second Image - bg-careers.jpg */}
        <div className="relative w-full h-[450px] md:h-[380px] overflow-hidden">
          <Image
            src="/images/bg-careers.jpg"
            fill
            alt="background"
            className="object-cover"
          />
          {/* Main Content - Centered with semi-transparent box */}
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <div className="w-[1136px] max-w-full mx-auto">
              <div className="backdrop-blur-sm rounded-[12px] py-[14px] px-[17px] h-[142px] flex flex-col gap-[10px]" style={{ background: 'linear-gradient(90.83deg, rgba(0, 0, 0, 0.7) 20.16%, rgba(102, 102, 102, 0.7) 101.56%)' }}>
                <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold text-white pb-3 border-b-2 border-gold text-center">
                  {t("hero.title","Build the Future of Property in the Gulf Region.")}
                </h2>
                <p className="text-white/90 font-extralight text-base md:text-lg leading-relaxed">
                  {t("hero.desc","Join Gulf Estate, a dynamic leader shaping the landscape of luxury and commercial property across the GCC. We offer unparalleled growth opportunities in a high-impact, technologically advanced environment.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Be Part of our Mission Section */}
      <section className="py-8 md:py-8 px-4">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-6">
            <h2 className="text-primary text-2xl md:text-3xl font-semibold mb-2">
              {t("be-part.title","Be Part of our Mission")}
            </h2>
            <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px w-full max-w-[200px]"></div>
          </div>
          <p className="text-gray-600 font-extralight text-base md:text-lg max-w-[900px]">
            {t("be-part.desc","We are looking for passionate individuals to join our mission. We value clear communication, and full ownership and responsibility.")}
          </p>
          {/* Horizontal line with controlled width */}
          <div className="border-b border-gray-300 w-full max-w-[1300px] mt-8"></div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="px-4 md:px-8 md:py-8 pb-8">
      <h2 className="sr-only">Current Openings</h2>
        <div className="max-w-[1300px] mx-auto space-y-8">
          {error ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600">{t("noJobs") || "No job openings available at the moment."}</p>
            </div>
          ) : (
            jobs.map((job, index) => (
              <div
                key={job._id || job.id || index}
                className={index < jobs.length - 1 ? "border-b border-gray-300 pb-8" : "pb-8"}
              >
                <h3 className="text-primary text-2xl md:text-3xl font-semibold mb-3">
                  {getLocalizedTitle(job)}
                </h3>
                <div
                  className="text-gray-600 font-extralight text-base mb-4 max-w-[900px] prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: cleanHtmlForDisplay(getLocalizedDescription(job)) }}
                />
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="px-4 py-1.5 rounded-full border border-gray-600 bg-white text-gray-700 flex items-center justify-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    {getLocationLabel(job.location)}
                  </div>
                  <div className="px-4 py-1.5 rounded-full border border-gray-600 bg-white text-gray-700 flex items-center justify-center gap-2 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    {getTypeLabel(job.type)}
                  </div>
                  {job.department && (
                    <div className="px-4 py-1.5 rounded-full border border-gray-600 bg-white text-gray-700 text-sm font-medium">
                      {job.department}
                    </div>
                  )}
                  {job.experience && (
                    <div className="px-4 py-1.5 rounded-full border border-gray-600 bg-white text-gray-700 text-sm font-medium">
                      {job.experience}
                    </div>
                  )}
                  {job.salary && (
                    <div className="px-4 py-1.5 rounded-full border border-gray-600 bg-white text-gray-700 text-sm font-medium">
                      {job.salary}
                    </div>
                  )}
                  {job.status === "Open" && (
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setIsModalOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-full border border-gold-600 text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors cursor-pointer"
                    >
                      {t("jobs.tags.open") || "Open"}
                    </button>
                  )}
                  {job.status !== "Open" && (
                    <div className="px-4 py-1.5 rounded-full border border-gold-600 text-gold text-sm font-medium">
                      {job.status}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Contact Section - taller image on mobile, smaller text on mobile */}
      <section className="my-12 md:my-16 px-4">
      <h2 className="sr-only">Contact Our Recruitment Team</h2>
        <div className="max-w-[1300px] mx-auto flex justify-center">
          <div className="relative w-full max-w-[900px] min-h-[320px] md:aspect-[3/2] overflow-hidden rounded-lg">
            <Image
              src="/images/pic-careers.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              alt="careers contact"
              className="object-cover rounded-lg"
            />
            {/* Dark overlay on image */}
            <div className="absolute inset-0 bg-black/40 rounded-lg"></div>

            {/* Contact Info - Absolute positioned, smaller text on mobile */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto flex flex-col z-10 min-w-0">
              <div>
                <p className="text-gold text-sm md:text-xl font-semibold mb-1 md:mb-2">
                  {t("contact.contact-us","Contact us at")}
                </p>
                <div className="flex items-center gap-2 text-white">
                  <Phone className="text-gold w-4 h-4 md:w-5 md:h-5 shrink-0" />
                  <span className="text-sm md:text-lg">04 873 5835</span>
                </div>
              </div>

              <div className="mt-1 md:mt-2">
                <p className="text-gold text-sm md:text-xl font-semibold mb-1 md:mb-2">
                  {t("contact.email-us","Or Email us at")}
                </p>
                <div className="flex items-center gap-2 text-white">
                  <Mail className="text-gold w-4 h-4 md:w-5 md:h-5 shrink-0" />
                  <Link href="mailto:admin@gulfestates.ae" className="text-sm md:text-lg hover:underline break-all">
                    {t("contact.emailAddress","admin@gulfestates.ae")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          isOpen={isModalOpen}
          onCloseAction={() => {
            setIsModalOpen(false);
            setSelectedJob(null);
          }}
          jobId={selectedJob._id || selectedJob.id || ""}
          jobTitle={getLocalizedTitle(selectedJob)}
        />
      )}
    </div>
  );
}

export default Careers;
