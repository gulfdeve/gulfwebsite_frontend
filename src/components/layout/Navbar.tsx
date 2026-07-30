"use client";
import React, { useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import i18n from "@/lib/i18n";
interface NavbarProps {
  locale: string;
}

const Navbar = ({ locale }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!locale) return;
    i18n.changeLanguage(locale.toLowerCase());
    setSelectedLanguage(locale.toUpperCase());
  }, [locale]);

  // Use useMemo to ensure consistent translations between server and client
  const navLinks = React.useMemo(
    () => [
      { key: "home", label: t("home", { defaultValue: "Home" }), href: "/" },
      {
        key: "offplan",
        label: t("offplan", { defaultValue: "Off Plan" }),
        href: "/off-plan-properties-uae",
      },
      { key: "buy", label: t("buy", { defaultValue: "Buy" }), href: "/property-for-sale-uae" },
      {
        key: "rent",
        label: t("rent", { defaultValue: "Rent" }),
        href: "/property-for-rent-uae",
      },
      {
        key: "blogs",
        label: t("blogs", { defaultValue: "Blogs" }),
        href: "/blogs",
      },
      {
        key: "about",
        label: t("about", { defaultValue: "About Us" }),
        href: "/about",
      },
      {
        key: "ourteam",
        label: t("ourTeam", { defaultValue: "Our Team" }),
        href: "/our-team",
      },
    ],
    [t]
  );

  const languages = [
    {
      label: "English",
      short: "en",
      flag: `https://hatscripts.github.io/circle-flags/flags/us.svg`,
    },
    {
      label: "French",
      short: "fr",
      flag: `https://hatscripts.github.io/circle-flags/flags/fr.svg`,
    },
    {
      label: "Spanish",
      short: "es",
      flag: `https://hatscripts.github.io/circle-flags/flags/es.svg`,
    },
  ];

  const pathSegment = pathname?.split("/")[1]?.toLowerCase();
  const currentLocale = ["en", "fr", "es"].includes(pathSegment)
    ? pathSegment
    : "en";

  const handlePrefetch = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href) router.prefetch(href as any);
  }, [router]);

  const handleLanguageChange = useCallback((newLocale: string) => {
    // Validate and sanitize locale to prevent injection
    const validLocales = ['en', 'fr', 'es'] as const;
    const sanitizedLocale = validLocales.includes(newLocale.toLowerCase() as typeof validLocales[number])
      ? newLocale.toLowerCase()
      : 'en';

    i18n.changeLanguage(sanitizedLocale);
    Cookies.set("NEXT_LOCALE", sanitizedLocale, { expires: 365 });

    // Sanitize pathname segments to prevent path traversal
    const segments = pathname
      .split("/")
      .filter(Boolean)
      .filter(segment => {
        // Only allow alphanumeric, hyphens, underscores, and dots
        // Prevent path traversal (..) and double slashes (//)
        return /^[a-zA-Z0-9._-]+$/.test(segment) && 
               !segment.includes('..') && 
               segment.length <= 200;
      });

    // Check if we're on blog or property pages
    const isBlogPage = segments.some(
      (segment) => segment.toLowerCase() === "blogs"
    );
    const isPropertyPage = segments.some((segment) =>
      ["properties", "off-plan", "buy", "rent"].includes(segment.toLowerCase())
    );

    // If on blog or property pages, redirect to home with new locale
    if (isBlogPage || isPropertyPage) {
      router.replace(`/${sanitizedLocale}` as any);
      return;
    }

    // For other pages, preserve the path structure
    // Ensure first segment is a valid locale
    if (validLocales.includes(segments[0]?.toLowerCase() as typeof validLocales[number])) {
      segments[0] = sanitizedLocale;
    } else {
      segments.unshift(sanitizedLocale);
    }

    // Build safe path
    const newPath = "/" + segments.join("/");
    router.replace(newPath as any);
  }, [pathname, router]);

  const mobileNavLinks = useMemo(() => [
    ...navLinks,
    { key: "contact", label: t("contact", { defaultValue: "Contact Us" }), href: "/contact" },
  ], [navLinks, t]);

  return (
    <nav className="w-full bg-gradient fixed top-0 left-0 z-50">
      <div className="max-w-[1500px] mx-auto flex justify-between items-center px-6 py-2 xl:px-12">
        {/* Logo */}
        <Link href={`/${locale}` as any} className="flex items-center">
          <div className="relative w-28 sm:w-32 md:w-36 h-auto">
            <Image
              src="/images/logo.png"
              alt="Gulf Estates Logo"
              width={160}
              height={100}
              sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
              className="w-full h-auto object-contain"
              priority
              fetchPriority="high"
            />
          </div>
        </Link>
        <div className="hidden xl:flex gap-6 tracking-wider items-center">
          {navLinks?.map((link: any) => {
            const href = `/${locale}${link.href}` as any;
            const isActive =
              link.href === "/"
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={link.label}
                href={href}
                prefetch={true}
                onMouseEnter={handlePrefetch}
                className={`text-nowrap hover:text-primary px-2 py-1 hover:bg-white rounded-full transition-colors ${
                  isActive ? "text-primary bg-white" : "text-white"
                }`}
              >
                {link?.label}
              </Link>
            );
          })}
        </div>
        {/* Center Links (Desktop) */}
        <div className="hidden xl:flex gap-6 tracking-wider items-center relative">
          <Link
            href={`/${locale}/contact` as any}
            prefetch={true}
            onMouseEnter={handlePrefetch}
            className="text-primary px-2 py-1.5 bg-white rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-2"
            >
              <path
                d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                fill="#01366F"
                stroke="#01366F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
            <span className="text-nowrap">
              {t("contact", { defaultValue: "Contact Us" })}
            </span>
          </Link>
          {/* Language Selector (Desktop) */}
          <div className="relative text-white">
            <div
              className="flex items-center gap-1 text-white cursor-pointer"
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            >
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${
                  currentLocale === "en"
                    ? "us"
                    : currentLocale === "fr"
                    ? "fr"
                    : "es"
                }.svg`}
                alt={currentLocale}
                className="w-5 h-5"
              />
              <span>{currentLocale?.toUpperCase()}</span>
            </div>

            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-primary shadow-lg rounded-md flex flex-col">
                {languages.map((lang) => (
                  <button
                    key={lang.short}
                    onClick={() => {
                      handleLanguageChange(lang.short);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`px-4 py-2 gap-2 text-left hover:bg-primary flex items-center cursor-pointer hover:text-white ${
                      currentLocale === lang.short ? "font-semibold" : ""
                    }`}
                  >
                    <img
                      src={lang?.flag}
                      alt={lang.label}
                      className="w-5 h-5"
                    />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Language Selector (Mobile) */}
        <div className="xl:hidden flex gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          >
            <img
              src={`https://hatscripts.github.io/circle-flags/flags/${
                currentLocale === "en"
                  ? "us"
                  : currentLocale === "fr"
                  ? "fr"
                  : "es"
              }.svg`}
              alt={currentLocale}
              className="w-5 h-5"
            />
            <span className="text-white">{currentLocale.toUpperCase()}</span>
          </div>

          {languageDropdownOpen && (
            <div className="absolute top-16 right-12 bg-white text-primary shadow-lg rounded-md flex flex-col">
              {languages.map((lang) => (
                <button
                  key={lang.short}
                  onClick={() => {
                    handleLanguageChange(lang.short);
                    setSelectedLanguage(lang.short);
                    setLanguageDropdownOpen(false);
                  }}
                  className={`px-4 py-2 gap-2 text-left hover:bg-primary flex items-center cursor-pointer hover:text-white ${
                    selectedLanguage === lang.short ? "font-semibold" : ""
                  }`}
                >
                  <img src={lang?.flag} alt={lang.label} className="w-5 h-5" />
                  {lang.label}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden p-2 hover:text-gray-300"
          >
            <Menu size={26} className="text-white" />
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-primary rounded-tr-4xl text-white transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 xl:hidden`}
        >
          {/* Header with Close Icon */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
            <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={80}
                className="w-28 object-contain"
              />
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-1">
              <X size={26} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 px-6 py-6">
            {mobileNavLinks.map((link: { key?: string; label: string; href: string }) => {
              const href = `/${locale}${link.href}` as any;
              return (
                <Link
                  key={link.key ?? link.label}
                  href={href}
                  prefetch={true}
                  onTouchStart={() => router.prefetch(href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm lowercase hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
