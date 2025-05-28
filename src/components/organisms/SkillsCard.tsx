import React from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

export default function SkillsCard() {
  const skillAnimation = useScrollAnimation();
  const { isTablet } = useWindowSize();
  const skillsData = {
    programming: [
      "React",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "Python",
      "Java",
      "C++",
      "SQL",
      "DAX",
    ],
    technology: [
      "Django",
      "Flask",
      "AWS",
      "Terraform",
      "Jenkins",
      "Docker",
      "LangChain",
      "Ansible",
      "Kubernetes",
      "PostgreSQL",
      "Postman",
      "Figma",
      "Git",
      "CI/CD",
    ],
    libraries: [
      "OpenAI",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Prophet",
      "OpenCV",
    ],
  };

  return (
    <div
      className={`grid grid-cols-1 ${isTablet ? "md:grid-cols-1" : "md:grid-cols-3"} gap-4 md:gap-6 transform transition-all duration-700 w-full max-w-full px-2 md:px-0`}
      ref={skillAnimation.ref}
    >
      <div
        className={`bg-gray-700 rounded-lg p-4 ${
          skillAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
        }`}
      >
        <div className="bg-blue-500 rounded-t-lg p-2 mb-3">
          <Label size="lg" bold={true} className="text-center cursor-default">
            Programming
          </Label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {skillsData.programming.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-600 rounded p-2 text-center text-white hover:bg-blue-400 transition-colors duration-300 cursor-default overflow-hidden"
              title={skill} // Add tooltip for overflow text
            >
              <span className="block truncate text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`bg-gray-700 rounded-lg p-4 ${
          skillAnimation.isVisible ? "animate-fadeUp" : "opacity-0"
        }`}
      >
        <div className="bg-green-500 rounded-t-lg p-2 mb-3">
          <Label size="lg" bold={true} className="text-center cursor-default">
            Technology
          </Label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {skillsData.technology.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-600 rounded p-2 text-center text-white hover:bg-green-400 transition-colors duration-300 cursor-default overflow-hidden"
              title={skill} // Add tooltip for overflow text
            >
              <span className="block truncate text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`bg-gray-700 rounded-lg p-4 ${
          skillAnimation.isVisible ? "animate-fadeLeft" : "opacity-0"
        }`}
      >
        <div className="bg-purple-500 rounded-t-lg p-2 mb-3">
          <Label size="lg" bold={true} className="text-center cursor-default">
            Libraries
          </Label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {skillsData.libraries.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-600 rounded p-2 text-center text-white hover:bg-purple-400 transition-colors duration-300 cursor-default overflow-hidden"
              title={skill}
            >
              <span className="block truncate text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
