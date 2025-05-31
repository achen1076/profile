import React, { forwardRef, useEffect, useState, useRef } from "react";
import { cn } from "../../constants/globalFunctions.tsx";
import Label from "../atoms/label.tsx";
import { FaGithub, FaGitlab } from "react-icons/fa";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ProjectName?: string;
  ProjectDescription?: string;
  ProjectLink?: string;
  variant?: "center" | "left" | "right";
  ImageLink?: string;
  LinkType?: string;
  color?: string;
}

const ProjectCards = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      ProjectName = "Project Name",
      ProjectDescription = "Project Description",
      ProjectLink = "",
      ImageLink = "",
      LinkType = "github",
      variant = "center",
      color = "bg-[#2D2D2D]",
      ...props
    },
    ref
  ) => {
    const { width } = useWindowSize();
    const [aboveWidthThreshold, setAboveWidthThreshold] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setAboveWidthThreshold(width > 1024);
      const handleResize = () => setAboveWidthThreshold(width > 1024);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    const globalStyle =
      "flex flex-row items-center justify-center w-full min-h-fit";

    const containerStyle = {
      height: `calc(33 * var(--vh))`,
    };

    const variantMap = {
      center: "",
      left: "-left-[10%]",
      right: "-right-[10%]",
    };

    return (
      <div
        className={cn(globalStyle, className)}
        // style={containerStyle}
        ref={ref}
        {...props}
      >
        {/* {variant === "right" && aboveWidthThreshold && (
          <div className="w-[calc((30vw+var(--vh))/2)] aspect-square bg-pink-500 relative max-w-[calc(350px)]">
            {ImageLink && <img src={ImageLink} alt="" />}
          </div>
        )} */}
        <div
          ref={cardRef}
          className={cn(
            `space-y-2 ${
              aboveWidthThreshold ? "w-1/2" : "w-4/5"
            } border border-gray-700 p-6 h-fit min-h-fit max-h-none rounded-2xl relative
            bg-[#1E1E1E] backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-lg
            hover:shadow-xl transition-all duration-300
            hover:border-gray-600 group`,
            variantMap[variant]
          )}
        >
          {variant === "right" && ProjectLink && (
            <div className="relative w-full mb-4">
              <div className="flex justify-end">
                <div
                  onClick={() =>
                    ProjectLink && window.open(ProjectLink, "_blank")
                  }
                  className="w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-300 -mb-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-2 hover:from-indigo-500/30 hover:to-purple-500/30 group-hover:scale-110 cursor-pointer z-10 relative"
                >
                  {LinkType === "github" ? (
                    <FaGithub className="w-full h-full cursor-pointer text-white group-hover:text-cyan-300 transition-colors duration-300" />
                  ) : LinkType === "gitlab" ? (
                    <FaGitlab className="w-full h-full cursor-pointer text-white group-hover:text-cyan-300 transition-colors duration-300" />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {variant === "left" && ProjectLink && (
            <div className="relative w-full mb-4">
              <div className="flex justify-start">
                <div
                  onClick={() =>
                    ProjectLink && window.open(ProjectLink, "_blank")
                  }
                  className="w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-300 -mb-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-2 hover:from-indigo-500/30 hover:to-purple-500/30 group-hover:scale-110 cursor-pointer z-10 relative"
                >
                  {LinkType === "github" ? (
                    <FaGithub className="w-full h-full cursor-pointer text-white group-hover:text-cyan-300 transition-colors duration-300" />
                  ) : LinkType === "gitlab" ? (
                    <FaGitlab className="w-full h-full cursor-pointer text-white group-hover:text-cyan-300 transition-colors duration-300" />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {variant === "center" && ProjectLink && (
            <div className="relative w-full mb-4">
              <div className="flex justify-end">
                <div
                  onClick={() =>
                    ProjectLink && window.open(ProjectLink, "_blank")
                  }
                  className="w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-300 -mb-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-2 hover:from-indigo-500/30 hover:to-purple-500/30 group-hover:scale-110 cursor-pointer z-10 relative"
                >
                  {LinkType === "github" ? (
                    <FaGithub className="w-full h-full cursor-pointer text-white group-hover:text-cyan-300 transition-colors duration-300" />
                  ) : LinkType === "gitlab" ? (
                    <FaGitlab className="w-full h-full cursor-pointer text-white group-hover:text-cyan-300 transition-colors duration-300" />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}

          <Label
            size="2xl"
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 relative z-10 group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-500"
          >
            {ProjectName}
          </Label>
          <div className="pt-4 relative z-10 max-w-full overflow-visible">
            <Label
              size="lg"
              className="text-gray-200 leading-relaxed whitespace-normal break-words"
            >
              {ProjectDescription}
            </Label>
          </div>
        </div>
        {/* {variant === "left" && aboveWidthThreshold && (
          <div className="w-[calc((30vw+var(--vh))/2)] aspect-fit bg-pink-500 relative max-w-[calc(350px)]">
            {ImageLink && <img src={ImageLink} alt="" className="w-full aspect-fit object-cover"/>}
          </div>
        )} */}
      </div>
    );
  }
);

ProjectCards.displayName = "ProjectCards";

export default ProjectCards;
