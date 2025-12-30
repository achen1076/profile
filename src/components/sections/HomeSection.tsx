import React from "react";
import Label from "../atoms/label.tsx";
import Button from "../atoms/button.tsx";

export default function HomeSection() {
  return (
    <React.Fragment>
      <div
        className="min-h-fit w-full flex items-center justify-center text-center overflow-hidden relative"
        style={{ height: `calc(100 * var(--vh))` }}
        id="home"
      >
        <div className="w-[40%] text-left ml-[10%] space-y-6">
          {/* Main heading */}
          <div className="space-y-2">
            <Label size="4xl" bold={true} className="leading-tight">
              Hi, I'm Andrew Chen
            </Label>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <Label size="xl" className=" leading-relaxed">
              I'm a software and web developer with a passion in building
              fullstack applications with Machine Learning integrations.
            </Label>

            <Label size="xl">
              Graduated from Michigan State University in 2025.
            </Label>
          </div>

          <div className="space-y-4 pt-2">
            <Label size="xl">
              Please feel free to contact me with any questions and
              opportunities.
            </Label>

            <div className="flex space-x-8 pt-4">
              <Button
                onClick={() => {
                  const contactSection = document.querySelector("#contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="min-w-[200px]"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[40%] flex items-center ml-[10%]">
          {/* <img src="./profile.png" alt="profile image" /> */}
        </div>
      </div>
    </React.Fragment>
  );
}
