import React, { useState, useEffect } from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

interface ExperienceCardProps {
  activeExperience: number;
}

export default function ExperienceCard({
  activeExperience,
}: ExperienceCardProps) {
  const { isMobile } = useWindowSize();
  const [animating, setAnimating] = useState(false);
  const [displayedExperience, setDisplayedExperience] =
    useState(activeExperience);
  const [textAnimation, setTextAnimation] = useState("");
  const experienceAnimation = useScrollAnimation();

  const experienceData = [
    {
      title: "Experience 1",
      content:
        "This is the detailed description for Experience 1. It includes responsibilities, technologies used, and achievements.",
    },
    {
      title: "Experience 2",
      content:
        "This is the detailed description for Experience 2. It showcases different projects and skills developed during this period.",
    },
    {
      title: "Experience 3",
      content:
        "This is the detailed description for Experience 3. It highlights leadership roles and collaborative efforts on major initiatives.",
    },
    {
      title: "Experience 4",
      content:
        "This is the detailed description for Experience 4. It demonstrates problem-solving abilities and technical expertise in various domains.",
    },
  ];

  useEffect(() => {
    if (displayedExperience !== activeExperience) {
      setAnimating(true);
      setTextAnimation("animate-textFadeOut");

      const timer = setTimeout(() => {
        setDisplayedExperience(activeExperience);
        setTextAnimation("animate-textFadeIn");

        const resetTimer = setTimeout(() => {
          setAnimating(false);
          setTextAnimation("");
        }, 400);

        return () => clearTimeout(resetTimer);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [activeExperience, displayedExperience]);

  const currentExperience = experienceData[displayedExperience - 1];

  return (
    <div
      ref={experienceAnimation.ref}
      className={`${
        isMobile ? "w-full" : "w-2/3"
      } h-full rounded-3xl pt-4 pb-4 pl-8 pr-8 space-y-8 transition-all duration-300 bg-purple-500 ${
        experienceAnimation.isVisible ? "animate-fadeLeft" : "opacity-0"
      }`}
    >
      <div className={``}>
        <Label size="2xl" bold={true} className={`transform ${textAnimation}`}>
          {currentExperience.title}
        </Label>
      </div>
      <div className={` min-h-[30vh]`}>
        <Label size="lg" className={`transform ${textAnimation}`}>
          {currentExperience.content}
        </Label>
      </div>
    </div>
  );
}
