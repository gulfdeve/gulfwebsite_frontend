"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

interface DldPermitCardProps {
  permitNumber?: string;
  qrImage?: string;
  verifiedText?: string;
  className?: string;
}

const DldPermitCard: React.FC<DldPermitCardProps> = ({
  permitNumber,
  qrImage,
  verifiedText = "This property listing has been reviewed and verified by Dubai Land Department",
  className = "",
}) => {
  const { t } = useTranslation("off-plan");
  const [imageError, setImageError] = useState(false);
  const hasQrImage = qrImage && !imageError;
  const hasPermitNumber = permitNumber && permitNumber.trim() !== "";

  // Don't render if neither permit number nor QR image is provided
  if (!hasPermitNumber && !hasQrImage) {
    return null;
  }

  return (
    <div
      className={`max-w-[400px] md:w-[400px] lg:w-[300px] mx-auto bg-white rounded-lg overflow-hidden p-4 shadow-[rgba(0,0,0,0.25)_-5px_4px_7.5px_4px] ${className}`}
      style={{ boxShadow: "rgba(0, 0, 0, 0.25) -5px 4px 7.5px 4px" }}
    >
      {/* Header */}
      <h4 className="text-gray-900 font-semibold text-base">
        {t("id.dldNumber") || "DLD Permit Number:"}
      </h4>

      {/* QR Image */}
      <div className="flex justify-center items-center my-3 min-h-[144px]">
        {hasQrImage ? (
          <div className="relative w-40 h-36">
            <Image
              src={qrImage}
              alt="DLD QR Code"
              fill
              sizes="(max-width: 768px) 100px, 150px"
              className="object-contain"
              priority
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-36 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-sm text-center px-4">
              {t("id.noDldQr", "DLD QR not provided")}
            </p>
          </div>
        )}
      </div>

      {/* Permit Info */}
      {hasPermitNumber && (
        <div className="text-center">
          <p className="text-gray-800 text-sm font-medium">
            {t("id.dldNumber") || "DLD Permit Number"}:
          </p>
          <p className="text-lg font-bold text-gray-900">{permitNumber}</p>
        </div>
      )}

      {/* Verification Note */}
      {verifiedText && (
        <p className="text-sm text-gray-600 leading-relaxed mt-2">{verifiedText}</p>
      )}
    </div>
  );
};

export default DldPermitCard;
