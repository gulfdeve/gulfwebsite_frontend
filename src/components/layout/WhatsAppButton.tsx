"use client";

import { IoLogoWhatsapp } from "react-icons/io";

const WHATSAPP_NUMBER = "971563645835";
const DEFAULT_MESSAGE = "Hi, I'm interested in Gulf Estates properties";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-100 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl animate-bounce-soft"
    >
      <IoLogoWhatsapp className="h-8 w-8" />
    </a>
  );
}
