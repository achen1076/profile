import React from "react";
import Label from "../atoms/label.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

export default function ExperienceLink({
  setActiveExperience = () => {},
  experienceId = 1,
  experienceTitle = "Experience 1",
  company = "Company",
  companyLogo = "",
}: {
  setActiveExperience?: (id: number) => void;
  experienceId?: number;
  experienceTitle?: string;
  company?: string;
  companyLogo?: string;
}) {
  const { isMobile, isTablet } = useWindowSize();

  return (
    <div
      className={`w-full h-1/2 flex items-center cursor-pointer pt-3 pb-3 pl-6 pr-6 space-x-4 
        border border-gray-700 rounded-lg text-left 
        bg-gradient-to-r from-transparent to-transparent hover:from-indigo-900/10 hover:to-purple-900/10 
        backdrop-filter backdrop-blur-sm shadow-md hover:shadow-lg
        transition-all duration-300 relative overflow-hidden group`}
      onClick={() => setActiveExperience(experienceId)}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

      <div className="h-12 w-12 aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-md flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-[2px] rounded-[5px] bg-[#1E1E1E] flex items-center justify-center">
          <div className="h-10 w-10 rounded-sm group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-white transition-all duration-300">
            <img
              src={companyLogo}
              alt={company}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <Label
          size={`${isMobile || isTablet ? "lg" : "xl"}`}
          className="cursor-pointer group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300"
          bold={true}
        >
          {experienceTitle}
        </Label>
        <Label
          size={`${isMobile || isTablet ? "md" : "lg"}`}
          bold={true}
          className="cursor-pointer text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
        >
          {company}
        </Label>
      </div>
    </div>
  );
}
