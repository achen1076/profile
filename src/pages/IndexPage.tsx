import React, { useEffect } from "react";
import Header from "../components/parts/header.tsx";
import Footer from "../components/parts/footer.tsx";
import HomeSection from "../components/sections/HomeSection.tsx";
import AboutSection from "../components/sections/AboutSection.tsx";
import ProjectSection from "../components/sections/ProjectSection.tsx";
import ExperienceSection from "../components/sections/ExperienceSection.tsx";
import MajorProjectsSection from "../components/sections/MajorProjectsSection.tsx";
import SkillSection from "../components/sections/SkillSection.tsx";
import CertificationSection from "../components/sections/CertificationSection.tsx";
import ContactSection from "../components/sections/ContactSection.tsx";

export default function IndexPage() {
  useEffect(() => {
    const style = document.createElement("style");
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
    <div className="overflow-x-hidden bg-gradient-to-b from-[#161616] to-[#252525]">
      <Header />
      <main className={`flex flex-col w-full space-y-16`}>
        <HomeSection />
        <AboutSection />
        <ExperienceSection />
        <MajorProjectsSection />
        <SkillSection />
        <CertificationSection />
        <ProjectSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
