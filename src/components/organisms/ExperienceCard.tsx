import React, { useState, useEffect } from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";

interface ExperienceCardProps {
  activeExperience: number;
}

export default function ExperienceCard({
  activeExperience,
}: ExperienceCardProps) {
  const { isMobile, isTablet } = useWindowSize();
  const [animating, setAnimating] = useState(false);
  const [displayedExperience, setDisplayedExperience] =
    useState(activeExperience);
  const [textAnimation, setTextAnimation] = useState("");
  const experienceAnimation = useScrollAnimation();

  const experienceData = [
    {
      title: "Enterprise Architecture",
      content: (
        <>
          • Engineered and launched 5+ enterprise applications using Microsoft
          tools, automating workflows and reducing manual effort by up to 20%.
          <br />
          <br />
          • Designed and integrated 10+ APIs into enterprise applications using
          Postman and other API services, enhancing system interoperability.
          <br />
          <br />
          • Completed 30+ hours of AWS Cloud training, gaining advanced
          proficiency in cloud architecture and deployment.
          <br />
          <br />• Optimized backend database performance for 5+ critical
          applications, achieving 99.9% uptime and ensuring reliability.
        </>
      ),
      company: "Comerica Bank",
    },
    {
      title: "DevSecOps",
      content: (
        <>
          • Orchestrated and optimized custom and COTS Jenkins pipelines,
          streamlining CI/CD processes for enhanced efficiency.
          <br />
          <br />
          • Automated infrastructure deployment by leveraging Terraform for 15+
          AWS modules, enabling scalability and reliability.
          <br />
          <br />
          • Spearheaded the AWS 2.0 migration project, successfully onboarding
          10+ applications to upgraded pipelines.
          <br />
          <br />
          • Designed and implemented a scoring framework to assess pipeline
          progress for 50+ applications, driving informed prioritization and
          decision-making.
          <br />
          <br />• Enhanced code quality and security by resolving 100+ issues
          using tools like SonarQube and SNYK.
        </>
      ),
      company: "Comerica Bank",
    },
    {
      title: "Web Application Architecture and Development ULA",
      content: (
        <>
          • Evaluated and graded 50+ student projects, providing actionable
          feedback to enhance code quality, user experience, and technical
          functionality.
          <br />
          <br />
          • Delivered personalized mentoring to 200+ undergraduate students,
          clarifying concepts in full-stack development, including HTML, CSS,
          JavaScript, Flask, Docker, and Python.
          <br />
          <br />• Conducted 1-on-1 sessions and facilitated lab activities,
          reinforcing principles of responsive design, software architecture,
          and best coding practices.
        </>
      ),
      company: "Michigan State University",
    },
    {
      title: "Full Stack (Contracted)",
      content: (
        <>
          • Designed and deployed an Outlook widget to monitor 100+ email
          threads daily, enabling real-time sentiment tracking and improved
          communication.
          <br />
          <br />
          • Developed a web application dashboard offering actionable insights,
          reducing email analysis time by 30% and enhancing decision-making.
          <br />
          <br />
          • Architected a robust back end using Python, PostgreSQL, LangChain,
          and OpenAI API, achieving 95%+ accuracy in email sentiment detection.
          <br />
          <br />• Delivered a scalable solution managing 500+ email chains
          concurrently, boosting operational efficiency for 2,500+ employees.
        </>
      ),
      company: "Ally Financial",
    },
  ];

  useEffect(() => {
    if (displayedExperience !== activeExperience) {
      setAnimating(true);
      setTextAnimation("animate-textFadeOut");

      const timer = setTimeout(() => {
        setDisplayedExperience(activeExperience);
        setTextAnimation("animate-textFadeIn");

        const resetTimer = setTimeout(() => {
          setAnimating(false);
          setTextAnimation("");
        }, 400);

        return () => clearTimeout(resetTimer);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [activeExperience, displayedExperience]);

  const currentExperience = experienceData[displayedExperience - 1];

  return (
    <div
      ref={experienceAnimation.ref}
      className={`${
        isTablet || isMobile ? "w-full" : "w-2/3"
      } rounded-3xl pt-4 pb-8 pl-8 pr-8 space-y-8 transition-all duration-300 h-[600px] bg-[#1E1E1E] backdrop-filter backdrop-blur-sm bg-opacity-90 border border-gray-700 shadow-lg ${
        experienceAnimation.isVisible ? "animate-fadeLeft" : "opacity-0"
      } relative overflow-hidden flex flex-col`}
    >
      <div className="w-full relative z-10">
        <Label
          size="2xl"
          bold={true}
          className={`transform ${textAnimation} w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 space-y-4 mt-4`}
        >
          {currentExperience.title + " @ " + currentExperience.company}
        </Label>
      </div>
      <div
        className={`flex items-start relative z-10 flex-grow overflow-y-auto custom-scrollbar`}
      >
        <Label
          size="lg"
          className={`transform ${textAnimation} text-left text-gray-200 leading-relaxed`}
        >
          {currentExperience.content}
        </Label>
      </div>
    </div>
  );
}
