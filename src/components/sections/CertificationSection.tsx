import React from "react";
import Label from "../atoms/label.tsx";
import CertificateGallery from "../organisms/CertificateGallery.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";

export default function CertificationSection() {
  const sectionAnimation = useScrollAnimation();

  const certificates = [
    {
      id: "aws-cloud-practitioner",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "09/02/2025",
      imageUrl: "./media/aws-cloud-practitioner.png",
      credentialUrl:
        "https://www.credly.com/badges/da986a30-fcc8-4246-8aef-f2de7dd0ca17",
      status: "completed" as const,
    },
    {
      id: "aws-developer-associate",
      title: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      date: "09/05/2025",
      imageUrl: "./media/aws-developer-associate.png",
      status: "in-progress" as const,
      progress: 10,
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 pt-32"
      id="certifications"
    >
      <div
        ref={sectionAnimation.ref}
        className={`w-full max-w-6xl transform transition-all duration-700 ${
          sectionAnimation.isVisible ? "animate-fadeUp" : "opacity-0"
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <Label
            size="4xl"
            bold={true}
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
          >
            Certifications
          </Label>
          <Label size="lg" className="text-gray-300 max-w-2xl mx-auto">
            Professional certifications and credentials that validate my
            technical expertise and commitment to continuous learning in cloud
            technologies and software development.
          </Label>
        </div>

        {/* Certificate Gallery */}
        <CertificateGallery certificates={certificates} />
      </div>
    </div>
  );
}
