"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import Cookies from "js-cookie";

export default function ClientI18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const normalized = locale?.toLowerCase() || "en";
    if (i18n.language !== normalized) {
      i18n.changeLanguage(normalized);
      Cookies.set("NEXT_LOCALE", normalized, { expires: 365, path: "/" });
    }
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n} key={locale}>
      {children}
    </I18nextProvider>
  );
}
