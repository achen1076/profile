import React, { forwardRef, useEffect, useState, useRef } from "react";
import { cn } from "../../constants/globalFunctions.tsx";
import Label from "../atoms/label.tsx";
import { FaGithub } from "react-icons/fa";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ProjectName?: string;
  ProjectDescription?: string;
  ProjectLink?: string;
  variant?: "center" | "left" | "right";
  color?: string;
}

const ProjectCards = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      ProjectName = "Project Name",
      ProjectDescription = "Project Description",
      ProjectLink = "",
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
      
    // Use a style object with the stable height calculation
    const containerStyle = {
      height: `calc(50 * var(--vh))`
    };

    const variantMap = {
      center: "",
      left: "-left-[10%]",
      right: "-right-[10%]",
    };

    return (
      <div className={cn(globalStyle, className)} style={containerStyle} ref={ref} {...props}>
        {variant === "right" && aboveWidthThreshold && (
          <div className="w-[calc((30vw+var(--vh))/2)] aspect-square bg-pink-500 relative max-w-[calc(350px)]"></div>
        )}
        <div
          ref={cardRef}
          className={cn(
            `space-y-2 ${aboveWidthThreshold ? "w-1/2" : "w-4/5"} border border-gray-300 p-4 h-3/5 min-h-fit rounded-2xl relative`,
            variantMap[variant],
            color
          )}
        >
          {variant === "right" && ProjectLink && (
            <div className="relative w-full mb-4">
              <div className="flex justify-end">
                <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 -mb-10">
                  <FaGithub
                    className="w-full h-full cursor-pointer"
                    onClick={() => window.open(ProjectLink, "_blank")}
                  />
                </div>
              </div>
            </div>
          )}
          
          {variant === "left" && ProjectLink && (
            <div className="relative w-full mb-4">
              <div className="flex justify-start">
                <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 -mb-10">
                  <FaGithub
                    className="w-full h-full cursor-pointer"
                    onClick={() => window.open(ProjectLink, "_blank")}
                  />
                </div>
              </div>
            </div>
          )}

          {variant === "center" && ProjectLink && (
                 <div className="relative w-full mb-4">
                 <div className="flex justify-end">
                   <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 -mb-10">
                     <FaGithub
                       className="w-full h-full cursor-pointer"
                       onClick={() => window.open(ProjectLink, "_blank")}
                     />
                   </div>
                 </div>
               </div>
          )}
          
          <Label size="2xl">{ProjectName}</Label>
          <Label size="lg" className="pt-4">
            {ProjectDescription}
          </Label>
        </div>
        {variant === "left" && aboveWidthThreshold && (
          <div className="w-[calc((30vw+var(--vh))/2)] aspect-square bg-pink-500 relative max-w-[calc(350px)]"></div>
        )}
      </div>
    );
  }
);

ProjectCards.displayName = "ProjectCards";

export default ProjectCards;
