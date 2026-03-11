"use client";

import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

interface DetailPageContactFormProps {
  propertyName?: string;
}

export default function DetailPageContactForm({ propertyName }: DetailPageContactFormProps) {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error(t("form.errors.nameRequired", "Name is required"));
      return false;
    }
    if (!formData.email.trim()) {
      toast.error(t("form.errors.emailRequired", "Email is required"));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t("form.errors.emailInvalid", "Please enter a valid email address"));
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error(t("form.errors.phoneRequired", "Phone is required"));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(t("form.button.submitting", "Sending..."));

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        throw new Error("API URL is not configured");
      }

      // Append property name to message if provided
      let finalMessage = formData.message.trim();
      if (propertyName) {
        finalMessage = finalMessage 
          ? `${finalMessage}\n\nProperty/Off-Plan: ${propertyName}`
          : `Property/Off-Plan: ${propertyName}`;
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        countryCode: "+971", // Default country code, can be made dynamic if needed
        phone: formData.phone.trim(),
        message: finalMessage,
      };

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(t("form.toast.success", "Message sent successfully!"), { id: toastId });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.message || t("form.toast.error", "Failed to send message. Please try again."), { id: toastId });
      }
    } catch (err) {
      console.error("❌ Error submitting contact form:", err);
      toast.error(t("form.toast.error", "Failed to send message. Please try again."), { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center w-full md:w-[400px] justify-center">
      <div className="w-full bg-white rounded-2xl shadow-xl p-6">
        <div className="space-y-5">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder={t("form.placeholders.firstName", "Name *")}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-0"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder={t("form.placeholders.email", "Email *")}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-0"
            />
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder={t("form.placeholders.phone", "Phone *")}
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-0"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <textarea
              name="message"
              placeholder={t("form.placeholders.message", "Message")}
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-0 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Mail className="text-gold w-5 h-5" />
            {isSubmitting 
              ? t("form.button.submitting", "Sending...") 
              : t("form.button", "Send Message")
            }
          </button>
        </div>
      </div>
    </div>
  );
}
