import React from "react";
import Label from "../atoms/label.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import MajorProjectCard from "../organisms/MajorProjectCard.tsx";

export default function MajorProjectsSection() {
  const titleAnimation = useScrollAnimation();
  const cardAnimation = useScrollAnimation();

  const marketMinuteProject = {
    title: "MarketMinute",
    description: `Full-stack financial intelligence platform implementing institutional-grade ML 
    trading strategies with serverless AWS infrastructure. Architected an ensemble model combining 
    gradient boosting (LightGBM, XGBoost), deep learning (LSTM), and transformer architectures for 
    multiclass movement prediction. Developed an autonomous Sentinel AI agent using multi-stage 
    analysis pipeline with anomaly detection, market regime classification, and LangChain-powered 
    structured narrative generation. Implemented infrastructure-as-code using Terraform for 
    reproducible deployments with AWS Lambda orchestration and SageMaker inference endpoints.`,
    githubUrl: "https://github.com/achen1076/MarketMinute",
    liveUrl: "https://marketminute.io/",
    featured: true,
    keyFeatures: [
      "Ensemble ML classifier with Optuna optimization and walk-forward validation",
      "Multi-stage Sentinel AI agent with signal and volatility detection and LangChain integration",
      "Serverless ML inference using AWS Lambda + SageMaker endpoints",
      "Dynamic volatility-adjusted labeling with triple-barrier method",
      "Infrastructure-as-code deployment with Terraform and Docker",
      "EventBridge-triggered automated daily prediction pipeline",
    ],
    techStack: {
      Frontend: [
        "Next.js 16",
        "TypeScript",
        "Tailwind CSS",
        "Custom Reusable Components",
      ],
      Backend: [
        "Next.js API Routes",
        "Python",
        "LangChain",
        "OpenAI",
        "NextAuth.js",
      ],
      Database: ["PostgreSQL", "Prisma"],
      Infrastructure: [
        "AWS Lambda",
        "AWS SageMaker Serverless",
        "AWS EventBridge",
        "AWS CloudWatch",
        "AWS Secrets Manager",
        "Terraform",
        "Docker",
      ],
      MachineLearning: [
        "LightGBM",
        "XGBoost",
        "LSTM",
        "Optuna",
        "TensorFlow/PyTorch Hybrid",
        "Labeling and Feature Engineering",
      ],
    },
    technicalHighlights: [
      {
        title: "Quantitative Model Architecture",
        description: `Designed a production-grade multi-model forecasting system integrating LightGBM, 
        XGBoost, LSTM, and Transformer architectures. Built automated walk-forward training with Optuna 
        hyperparameter optimization, volatility-adjusted triple-barrier labeling, and 50+ engineered 
        technical & macro features. Implemented distributional forecasting models for probabilistic 
        price ranges and built an inference stack running on AWS SageMaker Serverless with 
        containerized model endpoints.`,
      },
      {
        title: "Sentinel AI Agent",
        description: `Engineered a fully autonomous multi-stage analysis agent combining market data 
        ingestion, quantitative inference, and structured AI reporting. Sentinel orchestrates real-time 
        data fetches, runs predictions through a containerized SageMaker Serverless endpoint, evaluates 
        statistical anomalies (volatility shifts, index divergence, regime changes), and transforms results 
        into narrative insights using schema-enforced OpenAI function calls. Implemented a Lambda-driven 
        execution flow with EventBridge scheduling, end-to-end JSON validation, and a PostgreSQL-backed 
        persistence layer optimized for historical retrieval and longitudinal analysis.`,
      },
      {
        title: "End-to-End ML Deployment Pipeline",
        description: `Developed a fully automated AWS deployment workflow using Terraform, ECR, 
        SageMaker, Lambda, and EventBridge. Containerized all quant models with custom inference handlers, 
        pushed versioned images to ECR, and orchestrated daily predictions via a Lambda scheduler. 
        Created a robust logging, monitoring, and retry framework using CloudWatch and implemented 
        environment-isolated infrastructure (dev/prod) with custom Bash deployment automation.`,
      },
    ],
  };

  return (
    <React.Fragment>
      <div id="major-projects" className="h-[6vh]"></div>
      <div
        className="min-h-fit w-full flex items-center justify-center text-center overflow-hidden relative py-16"
        style={{ minHeight: `calc(60 * var(--vh))` }}
      >
        <div className={`w-4/5 text-center space-y-12 relative z-10`}>
          {/* Section Title */}
          <div
            ref={titleAnimation.ref}
            className={`transform transition-all duration-700 ${
              titleAnimation.isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          >
            <div className="relative inline-block mb-4">
              <Label size="4xl" bold={true} className="text-white">
                Major Project
              </Label>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>

          {/* Project Card */}
          <MajorProjectCard
            ref={cardAnimation.ref}
            title={marketMinuteProject.title}
            description={marketMinuteProject.description}
            githubUrl={marketMinuteProject.githubUrl}
            liveUrl={marketMinuteProject.liveUrl}
            featured={marketMinuteProject.featured}
            keyFeatures={marketMinuteProject.keyFeatures}
            techStack={marketMinuteProject.techStack}
            technicalHighlights={marketMinuteProject.technicalHighlights}
            className={`transform transition-all duration-700 delay-200 ${
              cardAnimation.isVisible
                ? "animate-fadeUp"
                : "opacity-0 translate-y-10"
            }`}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
