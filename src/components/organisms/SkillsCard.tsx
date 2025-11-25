import React from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.tsx";
import {
  FaPython,
  FaJava,
  FaJs,
  FaNodeJs,
  FaReact,
  FaHtml5,
  FaGit,
  FaAws,
  FaAngular,
  FaDocker,
  FaCode,
  FaTerminal,
  FaJenkins,
  FaFigma,
  FaChartBar,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiDjango,
  SiFlask,
  SiTerraform,
  SiKubernetes,
  SiPostgresql,
  SiPostman,
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiOpencv,
  SiCplusplus,
  SiAnsible,
  SiKeras,
  SiLangchain,
  SiAmazonec2,
  SiAmazonrds,
  SiAmazons3,
} from "react-icons/si";
import { BsFiletypeSql } from "react-icons/bs";
import { BiData } from "react-icons/bi";
import { TbBrandOpenai, TbBrandCSharp } from "react-icons/tb";

const getIcon = (skill: string) => {
  switch (skill.toLowerCase()) {
    case "react":
      return <FaReact className="h-[25px] w-[25px]" />;
    case "next.js":
      return <FaReact className="h-[25px] w-[25px]" />;
    case "angular":
      return <FaAngular className="h-[25px] w-[25px]" />;
    case "javascript":
      return <FaJs className="h-[25px] w-[25px]" />;
    case "html/css":
      return <FaHtml5 className="h-[25px] w-[25px]" />;
    case "tailwind css":
      return <SiTailwindcss className="h-[25px] w-[25px]" />;
    case "typescript":
      return <SiTypescript className="h-[25px] w-[25px]" />;
    case "node.js":
      return <FaNodeJs className="h-[25px] w-[25px]" />;
    case "python":
      return <FaPython className="h-[25px] w-[25px]" />;
    case "java":
      return <FaJava className="h-[25px] w-[25px]" />;
    case "c++":
      return <SiCplusplus className="h-[25px] w-[25px]" />;
    case "c#":
      return <TbBrandCSharp className="h-[25px] w-[25px]" />;
    case "sql":
      return <BsFiletypeSql className="h-[25px] w-[25px]" />;
    case "dax":
      return <BiData className="h-[25px] w-[25px]" />;
    case "django":
      return <SiDjango className="h-[25px] w-[25px]" />;
    case "flask":
      return <SiFlask className="h-[25px] w-[25px]" />;
    case "aws":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "ec2":
      return <SiAmazonec2 className="h-[25px] w-[25px]" />;
    case "alb":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "nlb":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "vpc":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "security groups":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "s3":
      return <SiAmazons3 className="h-[25px] w-[25px]" />;
    case "lambda":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "eventbridge":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "dynamodb":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "rds":
      return <SiAmazonrds className="h-[25px] w-[25px]" />;
    case "route 53":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "sdk":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "kms":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "sagemaker":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "ecr":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "cloudwatch":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "secrets manager":
      return <FaAws className="h-[25px] w-[25px]" />;
    case "terraform":
      return <SiTerraform className="h-[25px] w-[25px]" />;
    case "jenkins":
      return <FaJenkins className="h-[25px] w-[25px]" />;
    case "docker":
      return <FaDocker className="h-[25px] w-[25px]" />;
    case "langchain":
      return <SiLangchain className="h-[25px] w-[25px]" />;
    case "nextauth.js":
      return <FaCode className="h-[25px] w-[25px]" />;
    case "prisma":
      return <FaCode className="h-[25px] w-[25px]" />;
    case "ansible":
      return <SiAnsible className="h-[25px] w-[25px]" />;
    case "kubernetes":
      return <SiKubernetes className="h-[25px] w-[25px]" />;
    case "postgresql":
      return <SiPostgresql className="h-[25px] w-[25px]" />;
    case "postman":
      return <SiPostman className="h-[25px] w-[25px]" />;
    case "openai":
      return <TbBrandOpenai className="h-[25px] w-[25px]" />;
    case "tensorflow":
      return <SiTensorflow className="h-[25px] w-[25px]" />;
    case "keras":
      return <SiKeras className="h-[25px] w-[25px]" />;
    case "pytorch":
      return <SiPytorch className="h-[25px] w-[25px]" />;
    case "pandas":
      return <SiPandas className="h-[25px] w-[25px]" />;
    case "numpy":
      return <SiNumpy className="h-[25px] w-[25px]" />;
    case "scikit-learn":
      return <SiScikitlearn className="h-[25px] w-[25px]" />;
    case "matplotlib":
      return <FaChartBar className="h-[25px] w-[25px]" />;
    case "seaborn":
      return <FaChartBar className="h-[25px] w-[25px]" />;
    case "prophet":
      return <FaChartBar className="h-[25px] w-[25px]" />;
    case "opencv":
      return <SiOpencv className="h-[25px] w-[25px]" />;
    case "lightgbm":
      return <FaChartBar className="h-[25px] w-[25px]" />;
    case "xgboost":
      return <FaChartBar className="h-[25px] w-[25px]" />;
    case "optuna":
      return <FaChartBar className="h-[25px] w-[25px]" />;
    case "git":
      return <FaGit className="h-[25px] w-[25px]" />;
    case "ci/cd":
      return <FaTerminal className="h-[25px] w-[25px]" />;
    case "figma":
      return <FaFigma className="h-[25px] w-[25px]" />;
    default:
      return <FaCode className="h-[25px] w-[25px]" />;
  }
};

export default function SkillsCard() {
  const skillAnimation = useScrollAnimation();
  const { isTablet } = useWindowSize();
  const skillsData = {
    programming: [
      "React",
      "Next.js",
      "Angular",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "Python",
      "Java",
      "C++",
      "C#",
      "SQL",
      "DAX",
    ],
    technology: [
      "Django",
      "Flask",
      "NextAuth.js",
      "Prisma",
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
    aws: [
      "EC2",
      "ALB",
      "NLB",
      "VPC",
      "Security Groups",
      "S3",
      "Lambda",
      "SageMaker",
      "EventBridge",
      "ECR",
      "CloudWatch",
      "Secrets Manager",
      "DynamoDB",
      "RDS",
      "Route 53",
      "SDK",
      "KMS",
    ],
    libraries: [
      "OpenAI",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Pandas",
      "NumPy",
      "LightGBM",
      "XGBoost",
      "Optuna",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Prophet",
      "OpenCV",
    ],
  };

  return (
    <div
      className="transform transition-all duration-700 w-full max-w-full px-2 md:px-0"
      ref={skillAnimation.ref}
    >
      {/* First row with 3 boxes */}
      <div
        className={`grid grid-cols-1 ${
          isTablet ? "grid-cols-1" : "md:grid-cols-3"
        } gap-6 md:gap-8 mb-6 md:mb-8`}
      >
        {/* Programming Box */}
        <div
          className={`rounded-xl p-5 border border-gray-700 bg-[#1E1E1E] backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
            skillAnimation.isVisible ? "animate-fadeRight" : "opacity-0"
          }`}
        >
          <div className="relative z-10 mb-4">
            <Label
              size="xl"
              bold={true}
              className="text-center cursor-default text-white"
            >
              Programming
            </Label>
            <div className="h-0.5 w-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
            {skillsData.programming.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-filter backdrop-blur-sm flex items-center justify-start flex-row rounded-lg p-2 text-center text-white hover:bg-blue-500/20 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 cursor-default overflow-hidden"
                title={skill}
              >
                <span className="h-[25px] w-[25px] flex items-center justify-center">
                  {getIcon(skill)}
                </span>
                <span className="block truncate text-sm ml-[calc(5%)]">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Box */}
        <div
          className={`rounded-xl p-5 border border-gray-700 bg-[#1E1E1E] backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
            skillAnimation.isVisible ? "animate-fadeUp" : "opacity-0"
          }`}
        >
          <div className="relative z-10 mb-4">
            <Label
              size="xl"
              bold={true}
              className="text-center cursor-default text-white"
            >
              Technology
            </Label>
            <div className="h-0.5 w-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
            {skillsData.technology.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-filter backdrop-blur-sm rounded-lg p-2 flex items-center justify-start flex-row text-center text-white hover:bg-green-500/20 border border-gray-700 hover:border-green-400/50 transition-all duration-300 cursor-default overflow-hidden"
                title={skill}
              >
                <span className="h-[25px] w-[25px] flex items-center justify-center">
                  {getIcon(skill)}
                </span>
                <span className="block truncate text-sm ml-[calc(5%)]">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Libraries Box */}
        <div
          className={`rounded-xl p-5 border border-gray-700 bg-[#1E1E1E] backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
            skillAnimation.isVisible ? "animate-fadeLeft" : "opacity-0"
          }`}
        >
          <div className="relative z-10 mb-4">
            <Label
              size="xl"
              bold={true}
              className="text-center cursor-default text-white"
            >
              Libraries
            </Label>
            <div className="h-0.5 w-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
            {skillsData.libraries.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-filter backdrop-blur-sm rounded-lg p-2 flex items-center justify-start flex-row text-center text-white hover:bg-purple-500/20 border border-gray-700 hover:border-purple-400/50 transition-all duration-300 cursor-default overflow-hidden"
                title={skill}
              >
                <span className="h-[25px] w-[25px] flex items-center justify-center">
                  {getIcon(skill)}
                </span>
                <span className="block truncate text-sm ml-[calc(5%)]">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row with centered AWS box */}
      <div className={`${isTablet ? "block" : "flex justify-center"}`}>
        <div
          className={`rounded-xl p-5 border border-gray-700 bg-[#1E1E1E] backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
            isTablet ? "w-full" : "w-full max-w-sm"
          } ${skillAnimation.isVisible ? "animate-fadeUp" : "opacity-0"}`}
        >
          <div className="relative z-10 mb-4">
            <Label
              size="xl"
              bold={true}
              className="text-center cursor-default text-white"
            >
              AWS
            </Label>
            <div className="h-0.5 w-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
            {skillsData.aws.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-filter backdrop-blur-sm rounded-lg p-2 flex items-center justify-start flex-row text-center text-white hover:bg-orange-500/20 border border-gray-700 hover:border-orange-400/50 transition-all duration-300 cursor-default overflow-hidden"
                title={skill}
              >
                <span className="h-[25px] w-[25px] flex items-center justify-center">
                  {getIcon(skill)}
                </span>
                <span className="block truncate text-sm ml-[calc(5%)]">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
