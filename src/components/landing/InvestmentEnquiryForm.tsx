"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

interface InvestmentEnquiryFormProps {
  locale: string;
}

interface FormData {
  fullName: string;
  email: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  budget: string;
  propertyType: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  budget?: string;
  propertyType?: string;
  consent?: string;
}

const COUNTRIES = [
  { label: "United Arab Emirates", code: "+971" },
  { label: "United Kingdom", code: "+44" },
  { label: "United States", code: "+1" },
  { label: "France", code: "+33" },
  { label: "Germany", code: "+49" },
  { label: "Saudi Arabia", code: "+966" },
  { label: "Pakistan", code: "+92" },
  { label: "India", code: "+91" },
];

const BUDGET_OPTIONS = ["500k - 1M", "1M - 2M", "2M - 4M", "4M+"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Townhouse", "Commercial"];

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  country: "United Arab Emirates",
  countryCode: "+971",
  phoneNumber: "",
  budget: "",
  propertyType: "",
  consent: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeName = (value: string): string =>
  value.replace(/[^a-zA-Z\s'-]/g, "").substring(0, 120);

const sanitizePhone = (value: string): string =>
  value.replace(/[^\d\s()-]/g, "").substring(0, 20);

const getInternationalNumber = (countryCode: string, phoneNumber: string): string => {
  const digits = phoneNumber.replace(/\D/g, "");
  return `${countryCode}${digits}`;
};

export default function InvestmentEnquiryForm({ locale }: InvestmentEnquiryFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const normalizedPhoneLength = useMemo(() => {
    return formData.phoneNumber.replace(/\D/g, "").length;
  }, [formData.phoneNumber]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = "Phone number is required.";
    } else if (normalizedPhoneLength < 7 || normalizedPhoneLength > 15) {
      nextErrors.phoneNumber = "Phone number should be between 7 and 15 digits.";
    }

    if (!formData.budget) {
      nextErrors.budget = "Please select your budget.";
    }

    if (!formData.propertyType) {
      nextErrors.propertyType = "Please select a property type.";
    }

    if (!formData.consent) {
      nextErrors.consent = "Please confirm your consent before submitting.";
    }

    return nextErrors;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (submissionMessage) {
      setSubmissionMessage("");
      setSubmitSuccess(false);
    }
  };

  const handleCountryChange = (countryLabel: string) => {
    const selectedCountry = COUNTRIES.find((country) => country.label === countryLabel);

    setFormData((prev) => ({
      ...prev,
      country: countryLabel,
      countryCode: selectedCountry?.code || prev.countryCode,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitSuccess(false);
      setSubmissionMessage("Please review the highlighted fields and try again.");
      return;
    }

    if (!backendUrl) {
      setSubmitSuccess(false);
      setSubmissionMessage("Service is temporarily unavailable. Please try again shortly.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      const response = await fetch(`${backendUrl}/api/home-page-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phoneNumber: getInternationalNumber(formData.countryCode, formData.phoneNumber),
          country: formData.country,
          countryCode: formData.countryCode,
          budget: formData.budget,
          propertyType: formData.propertyType,
          consent: formData.consent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit your enquiry right now.");
      }

      setSubmitSuccess(true);
      setSubmissionMessage(data?.message || "Thanks, your enquiry has been received.");
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit enquiry.";
      setSubmitSuccess(false);
      setSubmissionMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="investment-enquiry-form"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-primary/15 bg-white p-5 shadow-lg shadow-primary/10 md:p-7"
      noValidate
    >
      <h2 className="font-secondary text-2xl text-primary md:text-3xl">
        Speak With An Investment Advisor
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Share your investment goals and get curated opportunities in Dubai, London, and New York.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(event) => handleInputChange("fullName", sanitizeName(event.target.value))}
            placeholder="Your full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            required
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-xs text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleInputChange("email", event.target.value.substring(0, 254))}
            placeholder="name@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(event) => handleCountryChange(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary"
            >
              {COUNTRIES.map((country) => (
                <option key={country.label} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
              Phone number
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                {formData.countryCode}
              </span>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(event) =>
                  handleInputChange("phoneNumber", sanitizePhone(event.target.value))
                }
                placeholder="50 123 4567"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 text-sm text-gray-900 outline-none transition focus:border-primary"
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                required
              />
            </div>
            {errors.phoneNumber && (
              <p id="phone-error" className="mt-1 text-xs text-red-600">
                {errors.phoneNumber}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="budget">
              Budget range
            </label>
            <select
              id="budget"
              value={formData.budget}
              onChange={(event) => handleInputChange("budget", event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary"
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? "budget-error" : undefined}
              required
            >
              <option value="">Select budget</option>
              {BUDGET_OPTIONS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            {errors.budget && (
              <p id="budget-error" className="mt-1 text-xs text-red-600">
                {errors.budget}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="propertyType">
              Property type
            </label>
            <select
              id="propertyType"
              value={formData.propertyType}
              onChange={(event) => handleInputChange("propertyType", event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary"
              aria-invalid={Boolean(errors.propertyType)}
              aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
              required
            >
              <option value="">Select property type</option>
              {PROPERTY_TYPES.map((propertyType) => (
                <option key={propertyType} value={propertyType}>
                  {propertyType}
                </option>
              ))}
            </select>
            {errors.propertyType && (
              <p id="propertyType-error" className="mt-1 text-xs text-red-600">
                {errors.propertyType}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="inline-flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              checked={formData.consent}
              onChange={(event) => handleInputChange("consent", event.target.checked)}
              required
            />
            <span>
              I agree to be contacted about investment opportunities and accept the
              <span> </span>
              <Link href={`/${locale}/privacy-policy`} className="font-medium text-primary underline">
                privacy policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-xs text-red-600">{errors.consent}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting your enquiry..." : "Get Investment Options"}
      </button>

      <p
        aria-live="polite"
        className={`mt-3 text-sm ${submitSuccess ? "text-green-700" : "text-red-600"}`}
      >
        {submissionMessage}
      </p>
    </form>
  );
}
