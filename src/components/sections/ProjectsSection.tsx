import React from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import ProjectCard from "../organisms/ProjectCard.tsx";

export default function ProjectsSection() {
  const titleAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation({ threshold: 0.2 });

  const projects = [
    {
      title: "Mintalyze",
      description:
        "Full-stack financial intelligence platform with ML-powered trading strategies, an AI Chat Agent with MCP integration, and serverless AWS infrastructure. Features ensemble models, autonomous Sentinel AI, and real-time market dashboards.",
      imageSrc: "/media/mintalyze_screenshot.png",
      linkTo: "https://mintalyze.com/",
      isExternal: true,
      tags: ["Next.js", "Python", "AWS", "ML", "LangChain"],
    },
    {
      title: "JSON Viewer",
      description:
        "Interactive JSON visualization tool with tree view, drag-and-drop reordering, inline editing, undo/redo history, and smart parsing for relaxed JSON syntax. Built with a split-panel layout and keyboard shortcuts.",
      imageSrc: "/media/jsontool_screenshot.png",
      linkTo: "/jsontool",
      isExternal: false,
      tags: ["React", "TypeScript", "Tailwind", "dnd-kit"],
    },
  ];

  return (
    <React.Fragment>
      <div id="projects" className="h-[6vh]"></div>
      <div className="min-h-fit w-full flex items-center justify-center text-center overflow-hidden relative py-16">
        <div className="w-4/5 max-w-5xl text-center space-y-12 relative z-10">
          {/* Section Title */}
          <div
            ref={titleAnimation.ref}
            className={`transform transition-all duration-700 ${
              titleAnimation.isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          >
            <div className="relative inline-block mb-4">
              <Label size="4xl" bold={true} className="text-white">
                Projects
              </Label>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-base mt-4 max-w-xl mx-auto">
              A collection of things I've built — from full-scale platforms to handy developer tools.
            </p>
          </div>

          {/* Project Grid */}
          <div
            ref={gridAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 transform transition-all duration-700 delay-200 ${
              gridAnimation.isVisible ? "animate-fadeUp" : "opacity-0"
            }`}
          >
            {projects.map((project, idx) => (
              <ProjectCard
                key={idx}
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                linkTo={project.linkTo}
                isExternal={project.isExternal}
                tags={project.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
