import React from "react";
import Label from "../atoms/label.tsx";
import Button from "../atoms/button.tsx";
import CodeWindow from "../molecules/CodeWindow.tsx";

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
              fullstack applications with machine learning and agentic AI integrations.
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
                  const contactSection = document.querySelector("#experiences");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="min-w-[200px]"
              >
                View Experiences
              </Button>
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
        <div className="w-[40%] flex items-center justify-center ml-[5%] md:ml-[2%] hidden lg:flex">
           <CodeWindow className="w-full max-w-lg transform hover:-translate-y-2 transition-transform duration-500 shadow-2xl shadow-cyan-900/10" />
        </div>
      </div>
    </React.Fragment>
  );
}
