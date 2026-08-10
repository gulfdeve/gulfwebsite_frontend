"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ContactForm from "./ContactForm";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare, FaLinkedin, FaYoutubeSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Phone, Mail, MapPin, History } from "lucide-react";

const ContactInfoSection = () => {
  const { t } = useTranslation("contact");
  return (
    <section>
      <div className="relative w-full lg:px-4 pt-4 mt-8 sm:mt-0">
        <div className="flex flex-col lg:flex-row items-start justify-between md:w-[90%] mx-auto px-2 lg:px-14 lg:pt-10 pt-4 md:gap-10 lg:gap-4 text-white bg-[url('/images/contact/bg-contact.png')] bg-cover bg-center bg-no-repeat rounded-lg">
          {/* Left Content */}
          <div className="flex-1 w-full">
            <ContactForm />
          </div>
          <div className="flex-1 md:pb-12 relative z-10 px-4 flex flex-col gap-2 md:px-6 lg:px-2 text-white/90">
            {/* Title */}
            <h2 className="lg:text-3xl text-xl font-semibold font-bebas">
              {t("infoSection.title")}
            </h2>
            <p className="">{t("infoSection.desc")}</p>

            {/* Information */}
            <div className="mb-3 lg:mb-2">
              <div className="my-3 flex gap-2 items-center">
                <Phone className="text-gold w-7 h-7" />
                <div className="flex flex-col">
                  <h3 className="font-bebas font-semibold">
                    {t("infoSection.call")}
                  </h3>
                  <p className="text-sm text-gray-200">
                    <Link href="tel:+97148735835" className=" hover:underline">
                      +971 4 873 5835
                    </Link>
                  </p>
                </div>
              </div>
              <div className="my-3 flex gap-2 items-center">
                <Mail className="text-gold w-7 h-7" />
                <div className="flex flex-col">
                  <h3 className=" font-bebas font-semibold">
                    {t("infoSection.email")}
                  </h3>
                  <p className="text-sm text-gray-200">
                    <Link
                      href={`mailto:${t("infoSection.emailLabel")}`}
                      className=" hover:underline"
                    >
                    {t("infoSection.emailLabel")}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="my-3 flex gap-2 items-center">
                <MapPin className="w-7 h-7 text-gold" />
                <div className="flex flex-col">
                  <h3 className=" font-bebas font-semibold">
                    {t("infoSection.addressTitle")}
                  </h3>
                  <p className="text-sm text-gray-200 max-w-[340px]">
                    {t("infoSection.addressValue")}
                  </p>
                </div>
              </div>
              {/* Working Hours */}
              <div className="flex gap-2 items-center">
                <History className="w-7 h-7 text-gold" />
                <div className="flex flex-col">
                  <h3 className="  font-bebas font-semibold  ">
                    {t("infoSection.hoursTitle")}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {t("infoSection.hoursValue")}
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col lg:flex-row gap-16">
              <div>
                <h3 className=" font-bebas font-semibold">
                  {t("infoSection.followTitle")}
                </h3>
                <div className="flex items-center gap-4 pb-5 lg:pb-0 mt-2">
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
                      className="flex items-center hover:text-white transition"
                    >
                      <Icon className="text-gold w-6 h-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pb-1">
        <iframe
          src="https://www.google.com/maps?q=25.0372259,55.1834866&hl=en&z=16&output=embed"
          className="rounded-lg h-[200px] sm:h-[300px] w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactInfoSection;
