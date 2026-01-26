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
  const [displayedExperience, setDisplayedExperience] =
    useState(activeExperience);
  const [textAnimation, setTextAnimation] = useState("");
  const experienceAnimation = useScrollAnimation();

  const experienceData = [

    {
      title: "Full Stack Developer",
      content: (
        <>
          • Led the development of multiple critical claims review systems and a
          rewrite of an outdated legacy system to modernize and enhance the
          speed and efficiency by over 50%.
          <br />
          <br />
          • Maintained and optimized enterprise-level Angular/.NET applications
          serving over 100+ internal users, handling daily transaction volumes
          of 500+ claims with 99.9% uptime.
          <br />
          <br />
          • Engineered 15+ new API endpoints and dynamic web interfaces,
          optimizing SQL queries and API calls to reduce page load latency by up
          to 40% for data-heavy dashboards.
          <br />
          <br />• Contributed to the company-wide component library by updating
          and enhancing reusable components for consistent UI/UX across
          projects.
        </>
      ),
      company: "Auto-Owners Insurance",
    },
    {
      title: "Software Engineer",
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
      title: "DevSecOps & EA",
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
          <br />• Engineered 5+ enterprise applications using Microsoft tools,
          automating workflows and reducing manual effort by up to 20%
          <br />
          <br />• Optimized backend database performance for 5+ critical
          applications, achieving 99.9% uptime and ensuring reliability.
        </>
      ),
      company: "Comerica Bank",
    },
    {
      title: "Founder / Lead Developer",
      content: (
        <>
          • Architected a serverless stock-analysis platform on AWS (Next.js,
          Lambda, SageMaker) that scales to handle 10,000+ daily data requests
          with sub-200ms latency.
          <br />
          <br />
          • Developed an ensemble quant model (LightGBM, XGBoost, LSTM)
          achieving a 15% improvement in signal accuracy over baseline
          benchmarks via Optuna tuning and triple-barrier labeling.
          <br />
          <br />
          • Created the 'Sentinel' AI Agent using LangChain and the Model
          Context Protocol (MCP) to autonomously synthesize complex market data
          into readable narratives, reducing user research time by ~90%.
          <br />
          <br />• Built a real-time NLP pipeline processing 10,000+ news
          articles daily, achieving 85% correlation with market movement
          signals.
        </>
      ),
      company: "Mintalyze",
    },
  ];
  useEffect(() => {
    if (displayedExperience !== activeExperience) {
      setTextAnimation("animate-textFadeOut");

      const timer = setTimeout(() => {
        setDisplayedExperience(activeExperience);
        setTextAnimation("animate-textFadeIn");

        const resetTimer = setTimeout(() => {
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
