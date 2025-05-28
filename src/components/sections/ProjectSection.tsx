import React from "react";
import Timeline from "../parts/Timeline.tsx";

export default function ProjectSection() {
  return (
    <React.Fragment>
      <div id="projects" className="h-[5vh]"></div>
      <div className="min-h-fit bg-[#2D2D2D] w-full flex items-center justify-center text-center overflow-hidden relative">
        <Timeline />
      </div>
    </React.Fragment>
  );
}
