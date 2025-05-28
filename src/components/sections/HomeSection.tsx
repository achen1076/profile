import React from "react";
import Label from "../atoms/label.tsx";

export default function HomeSection() {
  return (
    <React.Fragment>
      <div
        className="min-h-fit bg-[#2D2D2D] w-full flex items-center justify-center text-center overflow-hidden relative"
        style={{ height: `calc(100 * var(--vh))` }}
        id="home"
      >
        <div className="w-[40%] text-left ml-[10%]">
          <Label size="4xl" bold={true}>
            Hi, I'm Andrew Chen
          </Label>
          <Label size="xl">I'm a software and web developer.</Label>
          <Label size="xl">
            Graduated from Michigan State University in 2025.
          </Label>
          <Label size="xl">
            Please feel free to contact me with any questions and opportunities.
          </Label>
          <div className="flex space-x-8 mt-8">
            {/* <Button
              onClick={() => {
                window.location.href = "#about";
              }}
              className="min-w-[200px]"
            >
              More About Me
            </Button>
            <Button
              onClick={() => {
                window.location.href = "#contact";
              }}
              className="min-w-[200px]"
            >
              Contact Me
            </Button> */}
          </div>
        </div>
        <div className="w-[40%] flex items-center ml-[10%]">
          <img src="./profile.png" alt="profile image" />
        </div>
      </div>
    </React.Fragment>
  );
}
