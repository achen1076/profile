import React from "react";
import Timeline from "../parts/Timeline.tsx";

export default function ProjectSection() {
  return (
    <React.Fragment>
      <div
        className="h-auto bg-[#2D2D2D] w-full flex items-center justify-center text-center overflow-hidden absolute top-[200vh] left-0 z-[-1]"
        id="projects"
      >
        <Timeline />
      </div>
    </React.Fragment>
  );
}
