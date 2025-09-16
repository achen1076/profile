import React from "react";
import Label from "../atoms/label.tsx";
import CertificateCard from "../molecules/CertificateCard.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credentialUrl?: string;
  status: "completed" | "in-progress";
  progress?: number;
}

interface CertificateGalleryProps {
  certificates: Certificate[];
}

export default function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const galleryAnimation = useScrollAnimation();
  const { isTablet, isMobile } = useWindowSize();

  const completedCertificates = certificates.filter(cert => cert.status === "completed");
  const inProgressCertificates = certificates.filter(cert => cert.status === "in-progress");

  const getGridCols = () => {
    if (isMobile) return "grid-cols-1";
    if (isTablet) return "grid-cols-2";
    return "grid-cols-3";
  };

  return (
    <div
      ref={galleryAnimation.ref}
      className={`w-full transform transition-all duration-700 ${
        galleryAnimation.isVisible ? "animate-fadeUp" : "opacity-0"
      }`}
    >
      {/* Completed Certificates Section */}
      {completedCertificates.length > 0 && (
        <div className="mb-12">
          <div className="text-center mb-8">
            <Label
              size="2xl"
              bold={true}
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"
            >
              Earned Certificates
            </Label>
            <div className="h-0.5 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mt-2"></div>
          </div>
          <div className={`grid ${getGridCols()} gap-6 md:gap-8`}>
            {completedCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                title={certificate.title}
                issuer={certificate.issuer}
                date={certificate.date}
                imageUrl={certificate.imageUrl}
                credentialUrl={certificate.credentialUrl}
                status={certificate.status}
              />
            ))}
          </div>
        </div>
      )}

      {/* In Progress Certificates Section */}
      {inProgressCertificates.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <Label
              size="2xl"
              bold={true}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"
            >
              Currently Working Towards
            </Label>
            <div className="h-0.5 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mt-2"></div>
          </div>
          <div className={`grid ${getGridCols()} gap-6 md:gap-8`}>
            {inProgressCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                title={certificate.title}
                issuer={certificate.issuer}
                date={certificate.date}
                imageUrl={certificate.imageUrl}
                status={certificate.status}
                progress={certificate.progress}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="text-center py-16">
          <Label size="xl" className="text-gray-400 mb-4">
            No certificates to display
          </Label>
          <Label size="sm" className="text-gray-500">
            Check back soon for updates on my certification journey!
          </Label>
        </div>
      )}
    </div>
  );
}
