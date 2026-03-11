"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

interface RegisterInterestProps {
  projectName?: string;
  onSubmit?: (data: any) => void;
}

// 🌍 Full country + dial codes (keep the same)
const countryCodes = [
  { code: "ae", dial: "+971" },
  { code: "us", dial: "+1" },
  { code: "gb", dial: "+44" },
  { code: "in", dial: "+91" },
  { code: "pk", dial: "+92" },
  { code: "sa", dial: "+966" },
  { code: "qa", dial: "+974" },
  { code: "kw", dial: "+965" },
  { code: "om", dial: "+968" },
  { code: "bh", dial: "+973" },
  { code: "eg", dial: "+20" },
  { code: "fr", dial: "+33" },
  { code: "de", dial: "+49" },
  { code: "cn", dial: "+86" },
  { code: "jp", dial: "+81" },
  { code: "ca", dial: "+1" },
  { code: "au", dial: "+61" },
  { code: "nz", dial: "+64" },
  { code: "br", dial: "+55" },
  { code: "za", dial: "+27" },
  { code: "ng", dial: "+234" },
  { code: "ke", dial: "+254" },
  { code: "sg", dial: "+65" },
  { code: "my", dial: "+60" },
  { code: "ph", dial: "+63" },
  { code: "th", dial: "+66" },
  { code: "id", dial: "+62" },
  { code: "vn", dial: "+84" },
  { code: "bd", dial: "+880" },
  { code: "tr", dial: "+90" },
  { code: "it", dial: "+39" },
  { code: "es", dial: "+34" },
  { code: "se", dial: "+46" },
  { code: "no", dial: "+47" },
  { code: "fi", dial: "+358" },
  { code: "ch", dial: "+41" },
  { code: "nl", dial: "+31" },
  { code: "pl", dial: "+48" },
  { code: "ro", dial: "+40" },
  { code: "ua", dial: "+380" },
  { code: "ir", dial: "+98" },
  { code: "iq", dial: "+964" },
  { code: "jo", dial: "+962" },
  { code: "lb", dial: "+961" },
  { code: "sy", dial: "+963" },
  { code: "ye", dial: "+967" },
  { code: "af", dial: "+93" },
  { code: "np", dial: "+977" },
  { code: "lk", dial: "+94" },
  { code: "mm", dial: "+95" },
  { code: "kh", dial: "+855" },
  { code: "la", dial: "+856" },
  { code: "tw", dial: "+886" },
  { code: "hk", dial: "+852" },
  { code: "mo", dial: "+853" },
  { code: "dz", dial: "+213" },
  { code: "ma", dial: "+212" },
  { code: "tn", dial: "+216" },
  { code: "sd", dial: "+249" },
  { code: "et", dial: "+251" },
  { code: "ug", dial: "+256" },
  { code: "tz", dial: "+255" },
  { code: "gh", dial: "+233" },
  { code: "cm", dial: "+237" },
  { code: "sn", dial: "+221" },
];

export default function RegisterInterest({
  projectName = "Mount 3",
  onSubmit,
}: RegisterInterestProps) {
  const { t } = useTranslation("interest");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+971",
    countryFlag: "ae",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCountry = (code: string, dial: string) => {
    setFormData((prev) => ({ ...prev, countryCode: dial, countryFlag: code }));
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const res = await fetch(`${API_URL}/api/register-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, projectName }),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      toast.success(t("form.successMessage"));
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+971",
        countryFlag: "ae",
      });

      // Call parent callback if provided
      if (onSubmit) onSubmit({ ...formData, projectName });

    } catch (err) {
      console.error(err);
      toast.error(t("form.errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container py-10" id="primeLocation">
      <div
        className="grid lg:grid-cols-2 sm:grid-cols-1 rounded-[10px] transform -translate-y-1 my-15 lg:h-[400px]"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.3) -4px 4px 6px 0px, rgba(0, 0, 0, 0.2) 2px -2px 4px 0px",
        }}
      >
        {/* Left Section */}
        <div className="bg-black text-white p-6 flex items-center justify-start rounded-l-[10px]">
          <div className="text-start">
            <h2 className="text-2xl uppercase font-bold mb-4">
              {t("section.title")}
            </h2>
            <p className="fw5 text-base mb-4">
              {t("section.description", { projectName })}
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-white p-6 rounded-r-[10px] relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              className="w-full p-3 border border-[#999999] rounded-[5px] bg-gray-50 focus:ring-2 focus:ring-black outline-none"
              placeholder={t("form.namePlaceholder")}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <input
              className="w-full p-3 border border-[#999999] rounded-[5px] bg-gray-50 focus:ring-2 focus:ring-black outline-none"
              placeholder={t("form.emailPlaceholder")}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Phone Input with Dropdown */}
            <div className="flex relative">
              <div className="relative w-28 text-sm">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center gap-1 w-full px-2 py-[16px] border border-gray-400 rounded-l-[5px] bg-[#D9D9D9]"
                >
                  <Image
                    src={`https://flagcdn.com/w20/${formData.countryFlag}.png`}
                    alt={formData.countryFlag}
                    width={24}
                    height={16}
                    className="object-cover"
                  />
                  <span className="ms-1 fw7">{formData.countryCode}</span>
                  <ChevronDown className="w-4 h-4 text-gray-600 ml-1" />
                </button>

                {showDropdown && (
                  <div className="absolute top-[110%] left-0 bg-white border rounded shadow-lg max-h-56 overflow-y-scroll z-50 w-full">
                    {countryCodes.map(({ code, dial }) => (
                      <div
                        key={code}
                        onClick={() => handleSelectCountry(code, dial)}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      >
                        <Image
                          src={`https://flagcdn.com/w20/${code}.png`}
                          alt={code}
                          width={20}
                          height={14}
                        />
                        <span className="text-sm">{dial}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                placeholder={t("form.phonePlaceholder")}
                className="flex-1 p-3 border border-gray-400 rounded-r-[5px] outline-none focus:ring-2 focus:ring-black"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Project Name */}
            <input
              className="w-full p-3 border border-[#999999] rounded-[5px] cursor-not-allowed bg-gray-100 text-gray-600"
              disabled
              type="text"
              value={projectName}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="bg-black text-white px-10 py-2 rounded hover:bg-gray-800 transition w-full sm:w-auto"
            >
              {submitting ? t("form.submitting") : t("form.submitButton")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}