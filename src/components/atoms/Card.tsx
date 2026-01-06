import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-xl p-4 border border-[#e2e8f0] bg-white backdrop-filter backdrop-blur-sm shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
