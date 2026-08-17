import CompanySetupLanding from "@/components/landing/CompanySetupLanding";
import { validateLocale } from "@/utils/routeSecurity";

export default async function CompanySetupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);

  return <CompanySetupLanding locale={locale} />;
}
