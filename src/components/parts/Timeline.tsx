import React from "react";
import { cn } from "../../constants/globalFunctions.tsx";
import Label from "../atoms/label.tsx";
import ProjectCards from "../organisms/ProjectCards.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";

interface TimelineProps {
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ className }) => {
  const globalStyle = "w-full text-center";

  const projectOneAnimation = useScrollAnimation();
  const projectTwoAnimation = useScrollAnimation();
  const projectThreeAnimation = useScrollAnimation();
  const projectFourAnimation = useScrollAnimation();
  const projectFiveAnimation = useScrollAnimation();

  const projectInfo = [
    {
      name: "Project 1",
      description:
        "This is the detailed description for Project 1. It includes responsibilities, technologies used, and achievements.",
      link: "",
    },
    {
      name: "Project 2",
      description:
        "This is the detailed description for Project 2. It showcases different projects and skills developed during this period.",
      link: "",
    },
    {
      name: "Project 3",
      description:
        "This is the detailed description for Project 3. It highlights leadership roles and collaborative efforts on major initiatives.",
      link: "",
    },
    {
      name: "Project 4",
      description:
        "This is the detailed description for Project 4. It demonstrates problem-solving abilities and technical expertise in various domains.",
      link: "",
    },
    {
      name: "Project 5",
      description:
        "This is the detailed description for Project 5. It includes responsibilities, technologies used, and achievements.",
      link: "",
    },
  ];

  return (
    <div className={cn(globalStyle, className)}>
      <Label size="4xl" bold={true}>
        Projects
      </Label>
      <div>
        <ProjectCards
          variant="left"
          color="bg-red-500"
          ref={projectOneAnimation.ref}
          className={`${
            projectOneAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
          }`}
          ProjectName={projectInfo[0].name}
          ProjectDescription={projectInfo[0].description}
          ProjectLink={projectInfo[0].link}
        />
        <ProjectCards
          variant="right"
          color="bg-blue-500"
          ref={projectTwoAnimation.ref}
          className={`${
            projectTwoAnimation.isVisible ? "animate-fadeLeft" : "opacity-0"
          }`}
          ProjectName={projectInfo[1].name}
          ProjectDescription={projectInfo[1].description}
          ProjectLink={projectInfo[1].link}
        />
        <ProjectCards
          variant="left"
          color="bg-green-500"
          ref={projectThreeAnimation.ref}
          className={`${
            projectThreeAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
          }`}
          ProjectName={projectInfo[2].name}
          ProjectDescription={projectInfo[2].description}
          ProjectLink={projectInfo[2].link}
        />
        <ProjectCards
          variant="right"
          color="bg-yellow-500"
          ref={projectFourAnimation.ref}
          className={`${
            projectFourAnimation.isVisible ? "animate-fadeLeft" : "opacity-0"
          }`}
          ProjectName={projectInfo[3].name}
          ProjectDescription={projectInfo[3].description}
          ProjectLink={projectInfo[3].link}
        />
        <ProjectCards
          variant="left"
          color="bg-purple-500"
          ref={projectFiveAnimation.ref}
          className={`${
            projectFiveAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
          }`}
          ProjectName={projectInfo[4].name}
          ProjectDescription={projectInfo[4].description}
          ProjectLink={projectInfo[4].link}
        />
      </div>
    </div>
  );
};

export default Timeline;
