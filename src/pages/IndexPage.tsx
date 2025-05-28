import React, { useEffect } from "react";
import Header from "../components/parts/header.tsx";
import Footer from "../components/parts/footer.tsx";
import HomeSection from "../components/sections/HomeSection.tsx";
import AboutSection from "../components/sections/AboutSection.tsx";
import ProjectSection from "../components/sections/ProjectSection.tsx";
import ExperienceSection from "../components/sections/ExperienceSection.tsx";
import SkillSection from "../components/sections/SkillSection.tsx";

export default function IndexPage() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --vh: ${window.innerHeight * 0.01}px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main className={`flex flex-col w-full space-y-16 bg-[#2D2D2D]`}>
        <HomeSection />
        <AboutSection />
        <ProjectSection />
        <ExperienceSection />
        <SkillSection />
      </main>
      <Footer />
    </div>
  );
}
