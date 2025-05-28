import React, { useState } from "react";
import Label from "../atoms/label.tsx";
import ExperienceNav from "../organisms/ExperienceNav.tsx";
import ExperienceCard from "../organisms/ExperienceCard.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";

export default function ExperienceSection() {
  const { isMobile } = useWindowSize();
  const experienceAnimation = useScrollAnimation();
  const [activeExperience, setActiveExperience] = useState(1);

  return (
    <React.Fragment>
      <div
        className="h-screen bg-[#2D2D2D] w-full flex items-center justify-center text-center overflow-hidden absolute top-[450vh] left-0 z-[-1]"
        id="experiences"
      >
        <div className={`w-4/5 text-center space-y-16`}>
          <div
            ref={experienceAnimation.ref}
            className={`transform transition-all duration-700 ${
              experienceAnimation.isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          >
            <Label size="4xl" bold={true}>
              Experiences
            </Label>
          </div>
          <div
            className={`w-full h-fit flex ${
              isMobile ? "flex-col" : ""
            } items-center justify-center ${
              isMobile ? "space-y-8" : "space-x-8"
            }`}
          >
            <ExperienceNav
              activeExperience={activeExperience}
              setActiveExperience={setActiveExperience}
            />
            <ExperienceCard activeExperience={activeExperience} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
