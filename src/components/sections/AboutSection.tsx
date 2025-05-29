import React from "react";
import Label from "../atoms/label.tsx";
import Button from "../atoms/button.tsx";
import AboutMeCard from "../organisms/AboutMeCard.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";

export default function AboutSection() {
  const aboutMeAnimation = useScrollAnimation();
  return (
    <React.Fragment>
      <div id="about" className="h-[5vh]"></div>
      <div
        className="min-h-fit w-full flex justify-center text-center overflow-hidden relative"
        style={{ height: `calc(45 * var(--vh))` }}
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
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
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
                <Button
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/andrew-chen-641444208/",
                      "_blank"
                    )
                  }
                >
                  LinkedIn
                </Button>
                <Button
                  onClick={() =>
                    window.open("https://github.com/achen1076", "_blank")
                  }
                >
                  GitHub
                </Button>
              </div>
            </div>

            <div className="w-full md:w-2/3 text-left space-y-8">
              <AboutMeCard text="Graduated from Michigan State University with a B.S. in Computer Science and a Minor in Business." />
              <AboutMeCard text="Experienced in leading teams to success in software and web development projects." />
              <AboutMeCard text="Experienced in Full-Stack Web Development: Proficient with React, TypeScript, JavaScript, HTML/CSS, and Python" />
              <AboutMeCard text="Constantly seek out new tools and frameworks, motivated by curiosity and a desire to build better, faster, and more scalable software." />
              <AboutMeCard text="I thrive in team environments where ideas are shared freely and feedback is valued. I enjoy mentoring, pair programming, and learning from others." />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
