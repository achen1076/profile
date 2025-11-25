import React, { forwardRef } from "react";
import Label from "../atoms/label.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export interface MajorProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  keyFeatures: string[];
  techStack: Record<string, string[]>;
  technicalHighlights?: Array<{
    title: string;
    description: string;
  }>;
}

const MajorProjectCard = forwardRef<HTMLDivElement, MajorProjectCardProps>(
  (
    {
      title,
      description,
      githubUrl,
      liveUrl,
      featured = false,
      keyFeatures,
      techStack,
      technicalHighlights,
      className,
      ...props
    },
    ref
  ) => {
    const { isTablet, isMobile } = useWindowSize();

    return (
      <div
        ref={ref}
        className={`relative w-full mx-auto ${className}`}
        {...props}
      >
        <div
          className="border border-gray-700 rounded-2xl p-8 
          bg-[#1E1E1E] backdrop-filter backdrop-blur-sm bg-opacity-95 shadow-2xl
          hover:shadow-xl transition-all duration-500 group
          hover:border-gray-600"
        >
          {/* Header with Title and Links */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <Label size="3xl" bold={true} className="text-white">
                {title}
              </Label>
              {featured && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Featured
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-800/50 
                  hover:bg-gray-700/50 transition-all duration-300 
                  hover:scale-110 group/icon"
                >
                  <FaGithub className="w-6 h-6 text-white group-hover/icon:text-blue-400 transition-colors duration-300" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-800/50 
                  hover:bg-gray-700/50 transition-all duration-300 
                  hover:scale-110 group/icon"
                >
                  <FaExternalLinkAlt className="w-5 h-5 text-white group-hover/icon:text-blue-400 transition-colors duration-300" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <Label
              size="lg"
              className="text-gray-300 leading-relaxed text-left"
            >
              {description}
            </Label>
          </div>

          {/* Key Features Grid */}
          <div className="mb-8">
            <Label
              size="xl"
              bold={true}
              className="text-white text-left mb-4 block"
            >
              Key Features
            </Label>
            <div
              className={`grid ${
                isMobile
                  ? "grid-cols-1"
                  : isTablet
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } gap-3`}
            >
              {keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-lg bg-gray-800/30 
                  border border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <span className="text-blue-400 mt-1">✦</span>
                  <Label
                    size="sm"
                    className="text-gray-200 text-left leading-tight"
                  >
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <Label
              size="xl"
              bold={true}
              className="text-white text-left mb-4 block"
            >
              Technology Stack
            </Label>
            <div
              className={`grid ${
                isMobile
                  ? "grid-cols-1"
                  : isTablet
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } gap-4`}
            >
              {Object.entries(techStack).map(([category, technologies]) => (
                <div
                  key={category}
                  className="p-4 rounded-lg bg-[#252525] border border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <Label
                    size="md"
                    bold={true}
                    className="text-blue-400 mb-2 block"
                  >
                    {category}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-300 border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Highlights */}
          {technicalHighlights && technicalHighlights.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700 space-y-6">
              {technicalHighlights.map((highlight, index) => (
                <div key={index}>
                  <Label
                    size="lg"
                    bold={true}
                    className="text-blue-400 mb-3 block text-left"
                  >
                    {highlight.title}
                  </Label>
                  <Label
                    size="sm"
                    className="text-gray-300 text-left leading-relaxed block"
                  >
                    {highlight.description}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

MajorProjectCard.displayName = "MajorProjectCard";

export default MajorProjectCard;
