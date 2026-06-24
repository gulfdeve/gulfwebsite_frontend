import DamacOpenHouseLanding from "@/components/landing/DamacOpenHouseLanding";
import { validateLocale } from "@/utils/routeSecurity";

export default async function DamacOpenHousePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  validateLocale(localeParam);

  return <DamacOpenHouseLanding />;
}
