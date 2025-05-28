import React, { forwardRef } from "react";
import { cn } from "../../constants/globalFunctions.tsx";
import Label from "../atoms/label.tsx";
import { FaGithub } from "react-icons/fa";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ProjectName?: string;
  ProjectDescription?: string;
  ProjectLink?: string;
  variant?: "default" | "left" | "right";
  color?: string;
}

const ProjectCards = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      ProjectName = "Project Name",
      ProjectDescription = "Project Description",
      ProjectLink = "",
      variant = "default",
      color = "bg-[#2D2D2D]",
      ...props
    },
    ref
  ) => {
    const globalStyle =
      "flex flex-row items-center justify-center w-full h-[50vh]";

    const variantMap = {
      default: "",
      left: "-left-[10%]",
      right: "-right-[10%]",
    };

    return (
      <div className={cn(globalStyle, className)} ref={ref} {...props}>
        {variant === "right" && (
          <div className="w-1/6 h-3/5 bg-pink-500 relative"></div>
        )}
        <div
          className={cn(
            "space-y-2 w-1/2 border border-gray-300 p-4 h-3/5 rounded-2xl relative",
            variantMap[variant],
            color
          )}
        >
          <Label size="2xl">{ProjectName}</Label>
          <Label size="lg" className="pt-4">
            {ProjectDescription}
          </Label>
          {variant === "right" && ProjectLink && (
            <div className="w-[50px] h-[50px] rounded-full absolute top-[10%] left-[95%] transform -translate-x-1/2 -translate-y-1/2">
              <FaGithub
                className="w-full h-full cursor-pointer"
                onClick={() => window.open(ProjectLink, "_blank")}
              />
            </div>
          )}
          {variant === "left" && ProjectLink && (
            <div className="w-[50px] h-[50px] rounded-full absolute top-[10%] left-[5%] transform -translate-x-1/2 -translate-y-1/2">
              <FaGithub
                className="w-full h-full cursor-pointer"
                onClick={() => window.open(ProjectLink, "_blank")}
              />
            </div>
          )}
        </div>
        {variant === "left" && (
          <div className="w-1/6 h-3/5 bg-pink-500 relative"></div>
        )}
      </div>
    );
  }
);

ProjectCards.displayName = "ProjectCards";

export default ProjectCards;
