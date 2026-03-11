"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { IoMdSend } from "react-icons/io";
import { toast } from "sonner";

export default function SubscribeNewsLetters() {
  const { t } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error(tCommon("footer.alerts.enter_email"));
      return;
    }

    try {
      setLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!backendUrl) {
        throw new Error("API URL is not configured");
      }

      const res = await fetch(`${backendUrl}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to subscribe" }));
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success(tCommon("footer.alerts.success") || "You have been subscribed to our newsletter");
        setEmail("");
      } else {
        toast.error(
          data.message || tCommon("footer.alerts.failed") || "Failed to subscribe. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error(
        error.message || tCommon("footer.alerts.error") || "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) await handleSubscribe();
  };

  return (
    <section className="px-4 py-10 relative">
      <div className="relative max-w-[1200px] mx-auto rounded-sm shadow-xl">
        <Image
          src="/images/newsletter-bg-image.webp"
          alt="Newsletter background"
          width={1600}
          height={600}
          className="absolute inset-0 h-full w-full rounded-sm object-cover object-center"
        />
        <div className="absolute inset-0 rounded-sm bg-primary/60" />
        <div className="relative z-10 px-6 sm:px-10 py-10 text-center text-white flex flex-col">
          <h2 className="text-2xl sm:text-4xl tracking-[2px] uppercase font-medium">
            {t("newsletter.title","SUBSCRIBE TO OUR")}
          </h2>
          <h3 className="text-2xl sm:text-4xl text-gold tracking-[2px] uppercase font-medium">
            {t("newsletter.highlight","NEWSLETTER")}
            <div className="max-w-[230px] underline-gradient mx-auto my-2" />
          </h3>
          <p className="text-sm sm:text-base text-white max-w-2xl mx-auto">
            {t("newsletter.description","Join our mailing list for expert updates on UAE real estate every week")}
          </p>
          <form
            className="mt-8 flex items-center max-w-2xl mx-auto w-full"
            onSubmit={onSubmit}
          >
            <input
              type="email"
              placeholder={t("newsletter.placeholder","Enter your email address")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-4 bg-white flex-1 rounded-l-sm placeholder:capitalize px-5 w-full py-3 text-gray-900 outline-none text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gold rounded-r-sm px-4 md:px-6 py-2.5 text-primary font-semibold uppercase tracking-[2px] w-auto disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <IoMdSend className="w-6 h-6" />
            </button>
          </form>
        </div>
        <Image
          src="/images/newsletter-dots.svg"
          alt="Newsletter accent"
          width={200}
          height={200}
          className="absolute -z-10 -top-10 -left-16 w-[140px] sm:w-[200px]"
        />
      </div>
    </section>
  );
}
