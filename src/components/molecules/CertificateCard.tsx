import React from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credentialUrl?: string;
  status: "completed" | "in-progress";
  progress?: number;
}

export default function CertificateCard({
  title,
  issuer,
  date,
  imageUrl,
  credentialUrl,
  status,
  progress = 0,
}: CertificateCardProps) {
  const cardAnimation = useScrollAnimation();

  const handleClick = () => {
    if (credentialUrl && status === "completed") {
      window.open(credentialUrl, "_blank");
    }
  };

  return (
    <div
      ref={cardAnimation.ref}
      className={`group relative rounded-xl overflow-hidden bg-[#1E1E1E] border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 ${
        status === "completed" ? "cursor-pointer hover:scale-105" : ""
      } ${cardAnimation.isVisible ? "animate-fadeUp" : "opacity-0"}`}
      onClick={handleClick}
    >
      {/* Certificate Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${title} certificate`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {status === "in-progress" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <Label size="sm" className="text-white mb-2">
                In Progress
              </Label>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <Label size="sm" className="text-gray-300 mt-1">
                {progress}% Complete
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Info */}
      <div className="p-4">
        <Label
          size="lg"
          bold={true}
          className="text-white mb-2 group-hover:text-blue-400 transition-colors duration-300"
        >
          {title}
        </Label>
        <Label size="sm" className="text-gray-400 mb-1">
          {issuer}
        </Label>
        <Label size="sm" className="text-gray-500">
          {status === "completed" ? `Earned: ${date}` : `Started: ${date}`}
        </Label>
      </div>
    </div>
  );
}
