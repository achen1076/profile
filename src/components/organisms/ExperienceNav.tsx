import React from "react";
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
  const { isTablet, isMobile } = useWindowSize();

  const experienceAnimation = useScrollAnimation();

  return (
    <div
      ref={experienceAnimation.ref}
      className={`flex items-center justify-center ${
        isTablet || isMobile ? "w-full" : "w-1/3"
      } min-w-[300px] h-full space-y-10 flex-col ${
        experienceAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
      } `}
    >
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={1}
        experienceTitle="Full Stack Developer"
        company="Auto-Owners Insurance"
        companyLogo="./media/ao_logo.png"
      />
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={2}
        experienceTitle="Software Engineer"
        company="Ally Financial"
        companyLogo="./media/ally_logo.png"
      />
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={3}
        experienceTitle="Web Architecture and Development ULA"
        company="Michigan State University"
        companyLogo="./media/msu_logo.svg"
      />
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={4}
        experienceTitle="DevSecOps & EA Intern"
        company="Comerica Bank"
        companyLogo="./media/comerica_logo.png"
      />
      <ExperienceLink
        setActiveExperience={setActiveExperience}
        experienceId={5}
        experienceTitle="Founder / Lead Developer"
        company="Mintalyze"
        companyLogo="./media/mintalyze_logo.png"
      />     
    </div>
  );
}
