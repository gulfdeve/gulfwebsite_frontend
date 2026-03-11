// src/lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const languages = ["en", "fr", "es"];
const namespaces = [
  "common",
  "home",
  "search",
  "featuredProperties",
  "off-plan",
  "properties",
  "buy-rent",
  "blogs",
  "team",
  "contact",
  "about",
  "interest",
  "property",
  "careers",
];

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: languages,
      ns: namespaces,
      defaultNS: "common",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json", // load from public/locales
      },
      detection: {
        order: ["cookie", "path", "localStorage", "navigator"],
        caches: ["cookie"],
        lookupCookie: "NEXT_LOCALE",
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
