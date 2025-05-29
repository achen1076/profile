import React from "react";
import Timeline from "../parts/Timeline.tsx";

export default function ProjectSection() {
  return (
    <React.Fragment>
      <div id="projects" className="h-[5vh]"></div>
      <div className="min-h-fit w-full flex items-center justify-center text-center overflow-hidden relative">
        {/* <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[15%] left-[10%] w-32 h-32 border border-purple-400 rounded-md rotate-45"></div>
          <div className="absolute bottom-[8%] right-[5%] w-16 h-16 border border-cyan-400 rounded-md rotate-12"></div>
          <div className="absolute top-[60%] right-[15%] w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div className="absolute bottom-[30%] left-[20%] w-1 h-24 bg-gradient-to-b from-green-500 to-transparent"></div>
          <div className="absolute top-[20%] right-[40%] w-2 h-2 bg-pink-500 rounded-full animate-ping opacity-30"></div>
        </div> */}

        <Timeline />
      </div>
    </React.Fragment>
  );
}
