"use client";
import Image from "next/image";
import Link from "next/link";
import { Share2, Facebook, Twitter } from "lucide-react";
import { useTranslation } from "next-i18next";

interface ContactCardProps {
  phone?: string;
  email?: string;
  whatsapp?: string;
  facebook?: string;
  twitter?: string;
  cardShadow?: string;
  buttonLabel?: string;
  onBookViewing?: () => void;
}

export default function ContactCard({
  phone = "+971 4 352 1833",
  email = "info@gulfestates.ae",
  whatsapp = "97143521833",
  facebook = "https://www.facebook.com/gulfestatesuae/",
  twitter = "https://x.com/gulfestates/",
  cardShadow = "rgba(0, 0, 0, 0.25) -5px 4px 7.5px 4px",
  buttonLabel = "BOOK A VIEWING",
  onBookViewing,
}: ContactCardProps) {
  const { t } = useTranslation("off-plan");
  return (
    <div
      className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden p-4"
      style={{ boxShadow: cardShadow }}
    >
      {/* Contact Buttons */}
      <div className="flex justify-center w-full mt-4">
        <div className="flex gap-3">
          {/* Phone */}
          <Link
            href={`tel:${phone}`}
            className="text-black bg-white border border-gray-300 rounded-sm text-sm py-1 flex gap-1.5 items-center px-3 hover:bg-gray-50"
          >
            <Image
              alt="Call"
              className="w-4 h-4"
              src="/images/featured-prop/call.svg"
              width={16}
              height={16}
            />
            <span>{t("id.call")}</span>
          </Link>

          {/* Email */}
          <Link
            href={`mailto:${email}`}
            className="text-black bg-white border border-gray-300 rounded-sm text-sm py-1 flex gap-1.5 items-center px-3 hover:bg-gray-50"
          >
            <Image
              alt="Email"
              className="w-4 h-4"
              src="/images/featured-prop/email.svg"
              width={16}
              height={16}
            />
            <span>{t("id.email")}</span>
          </Link>

          {/* WhatsApp */}
          <Link
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black bg-white border border-gray-300 rounded-sm text-sm py-1 flex gap-1.5 items-center px-2 hover:bg-gray-50"
          >
            <Image
              alt="WhatsApp"
              className="w-4 h-4"
              src="/images/featured-prop/whats-app.svg"
              width={16}
              height={16}
            />
            <span className="text-sm">{t("id.whatsapp")}</span>
          </Link>
        </div>
      </div>

      {/* Book Viewing Button */}
      <button
        onClick={onBookViewing}
        className="mt-4 w-full bg-black text-white text-sm py-2 rounded hover:opacity-90 transition"
      >
        {buttonLabel}
      </button>

      {/* Share + Social Icons */}
      <div className="flex justify-center mt-5 gap-2">
        {/* Share */}
        <div className="flex items-center gap-1 py-1 h-6 cursor-pointer hover:text-orange-500 transition">
          <Share2 className="w-4 h-4" />
          <span className="text-sm">{t("id.share")}</span>
        </div>

        {/* WhatsApp */}
        <Link
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="rounded-full border border-black/70 bg-white w-6 h-6 flex items-center justify-center hover:text-green-600 transition">
            <Image
              src="/images/featured-prop/whats-app.svg"
              alt="WhatsApp"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </div>
        </Link>

        {/* Facebook */}
        <Link href={facebook as any} target="_blank" rel="noopener noreferrer">
          <div className="rounded-full border border-black/70 bg-white w-6 h-6 flex items-center justify-center hover:text-blue-600 transition">
            <Facebook className="w-4 h-4" />
          </div>
        </Link>

        {/* Twitter (X) */}
        <Link href={twitter as any} target="_blank" rel="noopener noreferrer">
          <div className="rounded-full border border-black/70 bg-white w-6 h-6 flex items-center justify-center hover:text-black transition">
            <Twitter className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}
