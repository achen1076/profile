import React from "react";
import Label from "../atoms/label.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

export default function ExperienceLink({
  setActiveExperience = () => {},
  experienceId = 3,
}: {
  setActiveExperience?: (id: number) => void;
  experienceId?: number;
}) {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex items-center cursor-pointer justify-center pt-2 pb-2 pl-6 pr-6 space-x-4 bg-red-500">
      <div className="w-10 h-10 bg-pink-500"></div>
      <Label
        size={`${isMobile ? "xl" : "2xl"}`}
        className="h-1/12 cursor-pointer hover:border-b-2 hover:border-gray-300 transition-all duration-100"
        bold={true}
        onClick={() => setActiveExperience(experienceId)}
      >
        Experience {experienceId}
      </Label>
    </div>
  );
}
