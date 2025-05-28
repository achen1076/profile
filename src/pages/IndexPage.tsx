import React from "react";
import Header from "../components/parts/header.tsx";
import Footer from "../components/parts/footer.tsx";
import HomeSection from "../components/sections/HomeSection.tsx";
import AboutSection from "../components/sections/AboutSection.tsx";
import ProjectSection from "../components/sections/ProjectSection.tsx";
import ExperienceSection from "../components/sections/ExperienceSection.tsx";
import SkillSection from "../components/sections/SkillSection.tsx";

export default function IndexPage() {
  return (
    <React.Fragment>
      <Header />
      <HomeSection />
      <AboutSection />
      <ProjectSection />
      <ExperienceSection />
      <SkillSection />
      <Footer />
    </React.Fragment>
  );
}
