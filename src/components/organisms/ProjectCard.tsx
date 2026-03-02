import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../constants/globalFunctions.tsx";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  linkTo: string;
  isExternal?: boolean;
  tags?: string[];
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  linkTo,
  isExternal = false,
  tags = [],
  className,
}: ProjectCardProps) {
  const cardContent = (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-[#1e1e1e] border border-white/[0.06] transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_8px_40px_rgba(147,51,234,0.15)] hover:-translate-y-1",
        className
      )}
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={imageSrc}
          alt={`${title} screenshot`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent opacity-60" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* External link indicator */}
        {isExternal && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[11px] text-white/70 font-medium flex items-center gap-1.5 border border-white/10">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Site
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h3>
          <svg
            className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-all duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={linkTo} className="block no-underline">
      {cardContent}
    </Link>
  );
}
