import React from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import SkillsCard from "../organisms/SkillsCard.tsx";

export default function SkillSection() {
  const skillAnimation = useScrollAnimation();
  return (
    <React.Fragment>
      <div
        className="min-h-fit bg-[#2D2D2D] w-full flex items-center justify-center text-center overflow-hidden relative"
        style={{ height: `calc(100 * var(--vh))` }}
        id="skills"
      >
        <div className="w-4/5 text-center space-y-16">
          <div
            ref={skillAnimation.ref}
            className={`transform transition-all duration-700 ${
              skillAnimation.isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          >
            <Label size="4xl" bold={true}>
              Skills
            </Label>
          </div>
          <div className={`w-full h-fit flex items-center justify-center`}>
              <SkillsCard />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
