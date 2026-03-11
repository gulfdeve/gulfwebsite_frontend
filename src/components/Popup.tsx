"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

const budgets = ["500k - 1M", "1M - 2M", "2M - 4M", "4M+"];
const propertyTypes = ["Apartment", "Villa", "Townhouse", "Off plan"];
/** Country dropdown width (px) - change this to control list and trigger width */
const COUNTRY_DROPDOWN_WIDTH = 260;
const countries = [
  { name: "UAE", code: "+971" },
  { name: "KSA", code: "+966" },
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" },
  { name: "Canada", code: "+1" },
  { name: "Cape Verde", code: "+238" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" },
  { name: "Denmark", code: "+45" },
  { name: "Dominican Republic", code: "+1" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "Estonia", code: "+372" },
  { name: "Ethiopia", code: "+251" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Georgia", code: "+995" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "Guatemala", code: "+502" },
  { name: "Hong Kong", code: "+852" },
  { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Jamaica", code: "+1" },
  { name: "Japan", code: "+81" },
  { name: "Jordan", code: "+962" },
  { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" },
  { name: "Kuwait", code: "+965" },
  { name: "Kyrgyzstan", code: "+996" },
  { name: "Laos", code: "+856" },
  { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" },
  { name: "Libya", code: "+218" },
  { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" },
  { name: "Macau", code: "+853" },
  { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" },
  { name: "Malta", code: "+356" },
  { name: "Mauritius", code: "+230" },
  { name: "Mexico", code: "+52" },
  { name: "Moldova", code: "+373" },
  { name: "Monaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" },
  { name: "Morocco", code: "+212" },
  { name: "Mozambique", code: "+258" },
  { name: "Myanmar", code: "+95" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nigeria", code: "+234" },
  { name: "North Macedonia", code: "+389" },
  { name: "Norway", code: "+47" },
  { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" },
  { name: "Palestine", code: "+970" },
  { name: "Panama", code: "+507" },
  { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" },
  { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" },
  { name: "San Marino", code: "+378" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Singapore", code: "+65" },
  { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudan", code: "+249" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" },
  { name: "Tajikistan", code: "+992" },
  { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" },
  { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" },
  { name: "Turkmenistan", code: "+993" },
  { name: "Uganda", code: "+256" },
  { name: "Ukraine", code: "+380" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" },
];

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EnquiryData {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
  budget: string;
  propertyType: string;
  consent?: boolean;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState<EnquiryData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "UAE",
    countryCode: "+971",
    budget: t("popup.selectBudget", "Select Budget"),
    propertyType: t("popup.propertyType", "Property Type"),
  });
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend.gulf.smbdigitalzone.com";

  const toggleCountryOpen = () => {
    setIsCountryOpen(!isCountryOpen);
    setIsBudgetOpen(false);
    setIsPropertyTypeOpen(false);
  };

  const toggleBudgetOpen = () => {
    setIsBudgetOpen(!isBudgetOpen);
    setIsCountryOpen(false);
    setIsPropertyTypeOpen(false);
  };

  const togglePropertyTypeOpen = () => {
    setIsPropertyTypeOpen(!isPropertyTypeOpen);
    setIsCountryOpen(false);
    setIsBudgetOpen(false);
  };

  const handleInputChange = (field: keyof EnquiryData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      toast.error(t("popup.errors.fillRequired", "Please fill in all required fields"));
      setIsSubmitting(false);
      return;
    }

    // Validate budget and property type
    if (formData.budget === t("popup.selectBudget", "Select Budget")) {
      toast.error(t("popup.errors.selectBudget", "Please select a budget"));
      setIsSubmitting(false);
      return;
    }

    if (formData.propertyType === t("popup.propertyType", "Property Type")) {
      toast.error(t("popup.errors.selectPropertyType", "Please select a property type"));
      setIsSubmitting(false);
      return;
    }

    const toastId = toast.loading(t("popup.submitting", "Submitting..."));

    try {
      const response = await fetch(`${API_URL}/api/home-page-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          countryCode: formData.countryCode,
          budget: formData.budget,
          propertyType: formData.propertyType,
          consent: consent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      // Success
      toast.success(data.message || t("popup.success", "Enquiry submitted successfully!"), { id: toastId });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        country: "UAE",
        countryCode: "+971",
        budget: t("popup.selectBudget", "Select Budget"),
        propertyType: t("popup.propertyType", "Property Type"),
      });
      setConsent(false);

      // Close popup after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting enquiry:", error);
      toast.error(
        error.message || t("popup.errors.submitFailed", "Failed to submit enquiry. Please try again."),
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white text-black rounded-2xl p-6 w-full max-w-sm relative shadow-xl flex flex-col md:h-[500px] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-black transition-colors cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          {/* Content Scrollable */}
          <div className="overflow-y-auto pr-1 space-y-2 flex-1">
            <h2 className="text-2xl font-bold text-center text-primary mb-4">
              {t("popup.title", "Submit an Enquiry")}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-2 pb-3 px-1"
              id="popup-form"
            >
              <div className="">
                <input
                  type="text"
                  placeholder={t("popup.placeholders.fullName", "Full name") + "*"}
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  required
                  className="w-full py-2.5 px-3 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2a37]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Country Dropdown - width controlled by COUNTRY_DROPDOWN_WIDTH at top of file */}
                <div className="relative col-span-1 w-full">
                  <button
                    type="button"
                    onClick={toggleCountryOpen}
                    className="w-full py-2.5 px-3 border text-sm border-gray-300 rounded-lg text-left flex justify-between items-center gap-2 bg-white"
                  >
                    <span className="truncate">{formData.country}</span>
                    <Image
                      src="/icons/down.svg"
                      alt="Dropdown icon"
                      width={12}
                      height={12}
                      className={`shrink-0 transition-transform ${isCountryOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isCountryOpen && (
                    <div
                      className="absolute left-0 top-full z-20 mt-1 max-h-[280px] overflow-y-auto overflow-x-hidden bg-white border border-gray-200 rounded-lg shadow-lg py-1  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                      style={{ width: "100px" }}
                    >
                      {countries.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            handleInputChange("country", c.name);
                            handleInputChange("countryCode", c.code);
                            setIsCountryOpen(false);
                          }}
                          className={`block w-full text-left px-2 py-2.5 text-sm rounded-md cursor-pointer break-words whitespace-normal ${formData.country === c.name
                            ? "bg-gray-100 text-[#0f2a37] font-medium"
                            : "hover:bg-gray-100 text-gray-800"
                            }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#0f2a37] transition-all min-w-0">
                  <span className="py-2.5 px-3 text-sm text-gray-600 bg-gray-50 rounded-l-lg border-r border-gray-300">
                    {formData.countryCode}
                  </span>
                  <input
                    type="tel"
                    placeholder={t("popup.placeholders.phoneNumber", "Your number")}
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    required
                    className="w-full text-sm px-3 py-2.5 border-none rounded-r-lg focus:outline-none text-black"
                  />
                </div>
              </div>

              <input
                type="email"
                placeholder={t("form.placeholders.email", "Email Address") + "*"}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="w-full py-2.5 px-3 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2a37]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Budget Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleBudgetOpen}
                    className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg text-left flex justify-between items-center bg-white"
                  >
                    <span className="text-gray-600">{formData.budget}</span>
                    <Image
                      src="/icons/down.svg"
                      alt="Dropdown icon"
                      width={12}
                      height={12}
                      className={`transition-transform ${isBudgetOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isBudgetOpen && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 p-2 space-y-1">
                      {budgets.map((b) => (
                        <div
                          key={b}
                          onClick={() => {
                            handleInputChange("budget", b);
                            setIsBudgetOpen(false);
                          }}
                          className={`px-3 py-2.5 text-sm rounded-lg cursor-pointer ${formData.budget === b
                            ? "bg-gray-100 text-[#0f2a37] font-medium"
                            : "hover:bg-gray-100"
                            }`}
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Type Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={togglePropertyTypeOpen}
                    className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg text-left flex justify-between items-center bg-white"
                  >
                    <span className="text-gray-600">
                      {formData.propertyType}
                    </span>
                    <Image
                      src="/icons/down.svg"
                      alt="Dropdown icon"
                      width={12}
                      height={12}
                      className={`transition-transform ${isPropertyTypeOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isPropertyTypeOpen && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 p-2 space-y-1">
                      {propertyTypes.map((p) => (
                        <div
                          key={p}
                          onClick={() => {
                            handleInputChange("propertyType", p);
                            setIsPropertyTypeOpen(false);
                          }}
                          className={`px-3 py-2.5 text-sm rounded-lg cursor-pointer ${formData.propertyType === p
                            ? "bg-gray-100 text-[#0f2a37] font-medium"
                            : "hover:bg-gray-100"
                            }`}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-600 text-center pt-2">
                {t("popup.consentText", "By submitting this form, you consent to receive tailored property recommendations and updates from our team. We value your privacy and will contact you only with information relevant to your stated preferences.")}
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <label htmlFor="consent" className="text-sm cursor-pointer">
                  {t("popup.keepUpdated", "Keep me updated on news and offers")}
                </label>
              </div>
            </form>
          </div>

          {/* Submit button fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 rounded-b-2xl">
            <button
              type="submit"
              form="popup-form"
              disabled={isSubmitting}
              className="w-full py-2 bg-primary hover:bg-primary/90 cursor-pointer text-white rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("popup.submitting", "Submitting...") : t("popup.submit", "Submit")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
