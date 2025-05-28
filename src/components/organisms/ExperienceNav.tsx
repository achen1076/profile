import React from "react";
import Label from "../atoms/label.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import ExperienceLink from "../molecules/ExperienceLink.tsx";

interface ExperienceNavProps {
  activeExperience: number;
  setActiveExperience: React.Dispatch<React.SetStateAction<number>>;
}

export default function ExperienceNav({
  activeExperience,
  setActiveExperience,
}: ExperienceNavProps) {
  const { isMobile } = useWindowSize();

  const experienceAnimation = useScrollAnimation();

  return (
    <div
      ref={experienceAnimation.ref}
      className={`flex items-center justify-center w-1/4 h-full ${
        isMobile ? "space-x-4" : "space-y-12"
      } min-w-fit ${isMobile ? "flex-row" : "flex-col"} ${
        experienceAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
      } `}
    >
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={1}
      />
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={2}
      />
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={3}
      />
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={4}
      />
    </div>
  );
}
