"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare, FaLinkedin, FaYoutubeSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

interface FooterProps {
  locale: string;
}

const Footer = ({ locale }: FooterProps) => {
  const { t } = useTranslation("common");
  const currentLocale = (locale || "en").toLowerCase();
  const footerPerfStyle = {
    // Helps browsers skip rendering offscreen footer content (can improve LCP/TBT on long pages)
    contentVisibility: "auto",
    containIntrinsicSize: "1px 900px",
  } as any;

  return (
    <footer className="bg-gradient text-white" style={footerPerfStyle}>
      {/* Top Section */}
      <div className="max-w-[1500px] pt-10 mx-auto px-3">
        <div className="flex flex-col lg:flex-row justify-between gap-y-8 lg:gap-y-0 lg:gap-x-4">
          {/* Subscribe Section */}
          <div className="lg:w-2/7">
            <p className="mb-4 font-extralight text-white leading-snug tracking-wide w-[90%]">
              {t("footer.discover","Discover your dream property with our expert guidance and comprehensive property listings.")}
            </p>
          </div>
          <div className="lg:w-2/7 grid grid-cols-2 gap-4 mb-0 sm:mb-10">
            {/* About */}
            <div className="md:w-fit">
              <div className="">
                <span className="font-bold capitalize mb-2 text-gold text-sm tracking-wide">
                  {t("footer.about_us", "ABOUT US")}
                </span>
                <ul className="mt-2 text-white">
                  <Link href={`/${locale}/our-team`}>
                    <li className="font-extralight text-sm w-fit cursor-pointer tracking-wide hover:text-white transition">
                      {t("footer.about_links.team","Meet The Team")}
                    </li>
                  </Link>
                  <Link href={`/${locale}/careers`}>
                    <li className="font-extralight text-sm w-fit mt-1 cursor-pointer tracking-wide hover:text-white transition">
                      {t("footer.about_links.careers","Careers")}
                    </li>
                  </Link>
                  <Link href={`/${locale}/blogs`}>
                    <li className="font-extralight text-sm w-fit mt-1 cursor-pointer tracking-wide hover:text-white transition">
                      {t("footer.about_links.news","Latest News")}
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="md:w-fit">
              <div className="">
                <span className="font-bold mb-2 text-gold text-sm tracking-wide">
                  {t("footer.popular_area","Popular Area")}
                </span>
                <ul className="space-y-2 mt-2 text-white">
                  {[
                    "Downtown Dubai",
                    "Palm Jumeirah",
                    "Dubai Hills Estate",
                    "Dubai Marina",
                    "Business Bay",
                  ].map((area) => (
                    <Link
                      key={area}
                      href={`/${currentLocale}/properties?area=${area
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="font-extralight text-sm tracking-wide leading-snug hover:text-white transition cursor-pointer"
                    >
                      {area}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="md:w-1/4 w-full">
            <ul className="space-y-2 text-white font-extralight tracking-wide leading-snug">
              <Link
                href="tel:04 873 5835"
                className="flex items-start gap-2 hover:text-white transition"
              >
                <Phone className="text-gold w-4 h-4 mt-1 shrink-0" />
                <span>04 873 5835</span>
              </Link>
              <Link
                href="mailto:info@gulfestates.ae"
                className="flex items-start gap-2 hover:text-white transition"
              >
                <Mail className="text-gold w-4 h-4 mt-1 shrink-0" />
                <span>info@gulfestates.ae</span>
              </Link>
              <li className="flex items-start gap-2 hover:text-white transition">
                <MapPin className="text-gold w-4 h-4 mt-1 shrink-0" />
                <span>
                  Office 402, Galadari Bldg. 17 Dubai Production City (IMPZ)
                  P.O. Box 74461, Dubai, U.A.E.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-3 xl:gap-4 pb-5 lg:pb-0 md:mt-10">
            {[
              {
                href: "https://www.facebook.com/gulfestatesdubai/",
                label: "Facebook",
                Icon: ImFacebook2,
              },
              {
                href: "https://www.instagram.com/gulfestates.ae/",
                label: "Instagram",
                Icon: FaInstagramSquare,
              },
              {
                href: "https://www.linkedin.com/company/gulfestatesae/",
                label: "LinkedIn",
                Icon: FaLinkedin,
              },
              {
                href: "https://x.com/gulfestates/",
                label: "X",
                Icon: FaSquareXTwitter,
              },
              {
                href: "https://www.youtube.com/@GulfEstates/",
                label: "YouTube",
                Icon: FaYoutubeSquare,
              },
            ].map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href as any}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-extralight tracking-wide leading-snug hover:text-white transition"
              >
                <Icon className="text-gold w-5 h-5 mr-2" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1500px] mx-auto flex flex-wrap gap-5 sm:gap-10 justify-between items-center border-t border-gold p-3 text-center text-xs text-white">
        <Link href={`/${currentLocale}`} className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={60}
            className="md:w-40 w-32 -ml-2"
          />
        </Link>
        <div className="flex flex-col items-start sm:items-center gap-5">
          <div className="flex items-center gap-5">
            {[
              { href: "/about", label: t("footer.links.about_us","About Us") },
              { href: "/blogs", label: t("footer.links.blogs","Blogs") },
              { href: "/global-investment", label: t("footer.links.global_investment", "Global Investment") },
              { href: "/off-plan", label: t("footer.links.off_plan","Off Plan") },
              { href: "/rent", label: t("footer.links.rent","Rent") },
              { href: "/buy", label: t("footer.links.buy","Buy") },
              { href: "/contact", label: t("footer.links.contact","Contact") },
            ].map((link) => (
              <Link
                key={link.href}
                href={`/${currentLocale}${link?.href || ""}` as any}
                className="hover:text-white transition text-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-white/90 tracking-wide">
            {t("footer.copyright","©2025 Gulf Sea Real Estate LLC, All rights reserved.")}{" "}
          </p>
        </div>
        <div className="w-full lg:w-fit flex items-center flex-col gap-2 sm:gap-4">
          <div>
            <Link
              href={`/${currentLocale}/privacy-policy` as any}
              className="underline text-white/90 hover:text-white transition"
            >
              {t("footer.privacy_policy","Privacy Policy")}
            </Link>
            {" | "}
            <Link
              href={`/${currentLocale}/terms` as any}
              className="underline text-white/90 hover:text-white transition"
            >
              {t("footer.terms","Terms and Conditions")}
            </Link>
          </div>
          <p className="text-white/90 tracking-wide">
            Designed and developed by{" "}
            <Link
              href="https://www.smbdigitalzone.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              SMB Digital Zone
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
