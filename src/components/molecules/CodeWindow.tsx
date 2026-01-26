import React from "react";
import { cn } from "../../constants/globalFunctions.tsx";

interface CodeWindowProps {
  className?: string;
}

export default function CodeWindow({ className }: CodeWindowProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden bg-[#1E1E1E] border border-gray-700 shadow-2xl transition-all duration-300 hover:border-gray-600 hover:shadow-cyan-900/20 group",
        className
      )}
    >
      {/* Window Controls */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2D2D2D] border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="ml-auto text-xs text-gray-500 font-mono">hire_me.py</div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto custom-scrollbar bg-[#1E1E1E]">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed text-left">
          <code className="block text-gray-300">
            <span className="text-purple-400">def</span> <span className="text-blue-400">evaluate_candidate</span>(candidate):{"\n"}
            {"    "}<span className="text-purple-400">if</span> candidate.name == <span className="text-green-400">"Andrew Chen"</span>:{"\n"}
            {"        "}<span className="text-purple-400">return</span> <span className="text-orange-400">"Hire Immediately"</span>{"\n"}
            {"\n"}
            {"    "}skills = [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Python"</span>, <span className="text-green-400">"AWS"</span>, <span className="text-green-400">"TypeScript"</span>]{"\n"}
            {"    "}<span className="text-purple-400">if</span> <span className="text-blue-400">all</span>(s <span className="text-purple-400">in</span> candidate.skills <span className="text-purple-400">for</span> s <span className="text-purple-400">in</span> skills):{"\n"}
            {"        "}<span className="text-purple-400">return</span> <span className="text-orange-400">"Schedule Interview"</span>{"\n"}
            {"\n"}
            {"    "}<span className="text-purple-400">return</span> <span className="text-orange-400">"Give Candidate a Chance"</span>{"\n"}
          </code>
        </pre>
      </div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
    </div>
  );
}
