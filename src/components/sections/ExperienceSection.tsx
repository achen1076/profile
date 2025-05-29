import React, { useState } from "react";
import Label from "../atoms/label.tsx";
import ExperienceNav from "../organisms/ExperienceNav.tsx";
import ExperienceCard from "../organisms/ExperienceCard.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";

export default function ExperienceSection() {
  const { isTablet, isMobile } = useWindowSize();
  const experienceAnimation = useScrollAnimation();
  const [activeExperience, setActiveExperience] = useState(1);

  return (
    <React.Fragment>
      <div id="experiences" className="h-[6vh]"></div>
      <div
        className="min-h-fit w-full flex items-center justify-center text-center overflow-hidden relative"
        style={{ height: `calc(50 * var(--vh))` }}
      >
        <div className={`w-4/5 text-center space-y-16 relative z-10`}>
          <div
            ref={experienceAnimation.ref}
            className={`transform transition-all duration-700 ${
              experienceAnimation.isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          >
            <div className="relative inline-block">
              <Label size="4xl" bold={true} className="text-white">
                Experiences
              </Label>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          <div
            className={`w-full flex ${
              isTablet || isMobile ? "flex-col" : ""
            } items-center justify-center ${
              isTablet || isMobile ? "space-y-8" : "space-x-8"
            } backdrop-blur-sm backdrop-filter`}
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
