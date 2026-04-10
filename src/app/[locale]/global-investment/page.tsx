import GlobalInvestmentLanding from "@/components/landing/GlobalInvestmentLanding";
import { validateLocale } from "@/utils/routeSecurity";

export default async function GlobalInvestmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);

  return <GlobalInvestmentLanding locale={locale} />;
}
