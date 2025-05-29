import React from "react";
import Label from "../atoms/label.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

export default function ExperienceLink({
  setActiveExperience = () => {},
  experienceId = 1,
  experienceTitle = "Experience 1",
  company = "Company",
}: {
  setActiveExperience?: (id: number) => void;
  experienceId?: number;
  experienceTitle?: string;
  company?: string;
}) {
  const { isMobile, isTablet } = useWindowSize();

  return (
    <div className={`w-full h-1/2 flex items-center cursor-pointer  pt-2 pb-2 pl-6 pr-6 space-x-4 border-2 border-purple-500
     rounded-md text-left hover:bg-[#1d1d1d] hover:bg-opacity-50 transition-all duration-100`} 
     onClick={() => setActiveExperience(experienceId)}>
      <div className="h-12 w-12 aspect-square bg-pink-500"></div>
      <div className="flex flex-col space-y-1 ">
      <Label
        size={`${isMobile || isTablet ? "lg" : "xl"}`}
        className="cursor-pointer"
        bold={true}
        
      >
        {experienceTitle}
      </Label>
      <Label size={`${isMobile || isTablet ? "md" : "lg"}`} bold={true} className="cursor-pointer">{company}</Label>
      </div>
    </div>
  );
}
