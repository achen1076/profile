import React from "react";
import Label from "../atoms/label.tsx";
import Button from "../atoms/button.tsx";
import AboutMeCard from "../organisms/AboutMeCard.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";

export default function AboutSection() {
  const aboutMeAnimation = useScrollAnimation();
  return (
    <React.Fragment>
      <div
        className="h-full bg-[#2D2D2D] w-full flex items-center justify-center text-center overflow-hidden absolute top-[100vh] left-0 z-[-1]"
        id="about"
      >
        <div className="w-4/5 text-center space-y-12">
          <div
            ref={aboutMeAnimation.ref}
            className={`w-full transform transition-all duration-700 ${
              aboutMeAnimation.isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          >
            <Label size="4xl" bold={true}>
              About Me
            </Label>
          </div>

          <div className="w-full flex items-center justify-center space-y-4 flex-col md:flex-row md:space-y-0 space-x-8">
            <div
              ref={aboutMeAnimation.ref}
              className={`w-full md:w-1/3 transform transition-all duration-700 space-y-4 items-center justify-center ${
                aboutMeAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
              }`}
            >
              <div className="w-full h-full rounded-full">
                <img src="./profile.png" alt="profile image" />
              </div>
              <div className="inline-flex items-center justify-center space-x-4 w-full">
                <Button>LinkedIn</Button>
                <Button>GitHub</Button>
              </div>
            </div>

            <div className="w-full md:w-2/3 text-left space-y-8">
              <AboutMeCard text="Graduated from Michigan State University with a B.S. in Computer Science and a Minor in Business." />
              <AboutMeCard text="Lead teams to success in both software and web development projects." />
              <AboutMeCard text="Lead teams to success in both software and web development projects." />
              <AboutMeCard text="Lead teams to success in both software and web development projects." />
              <AboutMeCard text="Lead teams to success in both software and web development projects." />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
