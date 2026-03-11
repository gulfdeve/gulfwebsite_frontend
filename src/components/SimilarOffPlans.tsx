"use client";

import React, { useEffect, useState } from "react";
import OffPlanCard from "./common/OffPlanCard";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import FeaturedOffPlanCard from "./common/FeaturedOffPlanCard";
import { getSlug } from "@/utils/localization";

interface OffPlan {
  _id: string;
  slug?: string | { en?: string; fr?: string; es?: string };
  title: string;
  location?: string;
  developer?: string;
  type?: string;
  handover?: string;
  priceFrom?: string;
  paymentPlan?: string;
  bedRange?: string;
  bathRange?: string;
  sizeRange?: string;
  image?: string;
}

interface SimilarOffPlansProps {
  offPlanId: string;
  limit?: number;
}

const SimilarOffPlans: React.FC<SimilarOffPlansProps> = ({
  offPlanId,
  limit = 3,
}) => {
  const { t } = useTranslation("off-plan");
  const params = useParams() as { locale?: string };
  const locale = params?.locale || "en";

  const [offPlans, setOffPlans] = useState<OffPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarOffPlans = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offplans/${offPlanId}/similar?limit=${limit}&locale=${locale}&excludeContent=true`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch similar off-plan projects: ${res.status}`
          );
        }

        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          // Transform offplans to include slug
          const transformedOffPlans = json.data.map((plan: OffPlan) => ({
            ...plan,
            slug: getSlug(plan.slug, locale, plan._id),
          }));
          setOffPlans(transformedOffPlans);
        } else {
          throw new Error(
            json.message || "Failed to fetch similar off-plan projects"
          );
        }
      } catch (err) {
        console.error("Error fetching similar off-plans:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (offPlanId) {
      fetchSimilarOffPlans();
    }
  }, [offPlanId, limit, locale]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
        <div className="relative z-10 w-full font-semibold text-primary text-xl sm:text-xl my-4">
          <h3 className="uppercase">
            {t("similar.title", "Explore More Luxury Off-Plan Investments")}
          </h3>
          <div className="max-w-[730px] mt-1 underline-gradient" />
        </div>
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2762E]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-600">
        <h3 className="font-bold uppercase mb-4 text-2xl md:text-4xl">
          {t("id.similarOffPlans")}
        </h3>
        <p>{t("id.fetchError")}</p>
      </div>
    );
  }

  if (offPlans.length === 0) return null;

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="relative z-10 w-full font-semibold text-primary text-xl sm:text-2xl my-4">
          <h3 className="uppercase">
            {t("similar.title", "Explore More Luxury Off-Plan Investments")}
          </h3>
          <div className="max-w-[730px] mt-1 underline-gradient" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offPlans.map((plan) => (
            <FeaturedOffPlanCard
              key={plan._id}
              _id={plan._id}
              title={plan.title}
              location={plan.location || t("id.locationUnknown")}
              developer={plan.developer || "N/A"}
              type={plan.type || "N/A"}
              handover={plan.handover || "N/A"}
              priceFrom={plan.priceFrom || t("id.priceOnRequest")}
              paymentPlan={plan.paymentPlan || "N/A"}
              bedRange={plan.bedRange}
              bathRange={plan.bathRange}
              sizeRange={plan.sizeRange}
              image={plan.image || "/images/properties/default.jpg"}
              href={`/${locale}/off-plan/${plan.slug || plan._id}`}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SimilarOffPlans);
