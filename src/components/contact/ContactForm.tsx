"use client";

import React, { useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

// 🌍 Country list (ISO code + dial code)
const countries = [
  { label: "AFG", code: "af", dial_code: "+93" },
  { label: "PAK", code: "pk", dial_code: "+92" },
  { label: "UAE", code: "ae", dial_code: "+971" },
  { label: "USA", code: "us", dial_code: "+1" },
  { label: "UK", code: "gb", dial_code: "+44" },
  { label: "KSA", code: "sa", dial_code: "+966" },
];

// Validation functions
const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") return false;
  if (email.length > 254) return false; // RFC 5321 limit
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const sanitizeInput = (input: string, maxLength: number = 500): string => {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/[<>'"&]/g, "") // Remove dangerous characters
    .trim()
    .substring(0, maxLength);
};

const ContactForm = () => {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+971",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Apply length limits and sanitization based on field type
    if (name === "email") {
      sanitizedValue = value.substring(0, 254); // RFC 5321 limit
    } else if (name === "phone") {
      // Allow only digits, spaces, hyphens, and parentheses for phone
      sanitizedValue = value.replace(/[^\d\s\-()]/g, "").substring(0, 20);
    } else if (name === "firstName" || name === "lastName") {
      sanitizedValue = sanitizeInput(value, 100);
    } else if (name === "subject") {
      sanitizedValue = sanitizeInput(value, 200);
    } else if (name === "message") {
      sanitizedValue = sanitizeInput(value, 2000);
    }

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  // ✅ Submit handler with single toast + button lock
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error(t("form.toast.invalidEmail", "Invalid email address"));
      return;
    }

    // Validate required fields have content after sanitization
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error(t("form.toast.invalidName", "Please enter your full name"));
      return;
    }

    if (!formData.message.trim()) {
      toast.error(t("form.toast.invalidMessage", "Please enter a message"));
      return;
    }

    setIsSubmitting(true);

    const toastId = toast.loading(t("form.toast.sending"));

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!backendUrl) {
        throw new Error("API URL is not configured");
      }

      // Sanitize all inputs before sending
      const sanitizedName = sanitizeInput(
        `${formData.firstName} ${formData.lastName}`.trim(),
        200
      );
      const sanitizedEmail = formData.email.trim().toLowerCase();
      const sanitizedSubject = sanitizeInput(formData.subject, 200);
      const sanitizedMessage = sanitizeInput(formData.message, 2000);

      // Combine firstName and lastName into name, and include subject in message if provided
      const payload = {
        name: sanitizedName,
        email: sanitizedEmail,
        countryCode: formData.countryCode,
        phone: formData.phone.trim(),
        message: sanitizedSubject
          ? `Subject: ${sanitizedSubject}\n\n${sanitizedMessage}`
          : sanitizedMessage,
      };

      const res = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(t("form.toast.success"), { id: toastId });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "+971",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(t("form.toast.error"), { id: toastId });
      }
    } catch (err) {
      console.error("❌ Error submitting contact form:", err);
      toast.error(t("form.toast.error"), { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry =
    countries.find((c) => c.dial_code === formData.countryCode) || countries[0];

  return (
    <section className="bg-white rounded-lg">
      <div className="flex flex-col lg:flex-row h-auto text-black px-6 py-4 mb-10">
        {/* Right Form */}
        <div className="w-full md:min-w-[300px] flex flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:space-y-5 space-y-2 w-full"
          >
            <div className="flex lg:flex-row flex-col gap-3">
              {/* Name */}
              <input
                type="text"
                name="firstName"
                placeholder={t("form.placeholders.firstName")}
                required
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 w-full py-3 border border-gray-400 rounded-md focus:outline-none "
              />
              <input
                type="text"
                name="lastName"
                placeholder={t("form.placeholders.lastName")}
                required
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 w-full py-3 border border-gray-400 rounded-md focus:outline-none "
              />
            </div>
            {/* Country + Phone */}
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="flex items-center border border-gray-400 rounded-md bg-[#F3F3F3] px-2 py-3 sm:w-25">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => {
                    const selected = countries.find(
                      (c) => c.dial_code === e.target.value
                    );
                    setFormData({
                      ...formData,
                      countryCode: selected?.dial_code || "+971",
                    });
                  }}
                  className="w-full bg-transparent text-gray-800 focus:outline-none"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.dial_code}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative flex-1">
                {/* The prefix */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                  {formData.countryCode}
                </span>

                <input
                  type="tel"
                  name="phone"
                  placeholder={t("form.placeholders.phone")}
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-14 py-3 border border-gray-400 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder={t("form.placeholders.email")}
              required
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-400 rounded-md focus:outline-none "
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-400 rounded-md focus:outline-none "
            />

            {/* Message */}
            <textarea
              name="message"
              placeholder={t("form.placeholders.message")}
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-400 rounded-md focus:outline-none "
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-primary/90 text-white px-6 py-3 rounded-full transition ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-primary focus:outline-none"
              }`}
            >
              {isSubmitting ? t("form.toast.sending") : t("form.button")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
