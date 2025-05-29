import React from "react";
import Label from "../atoms/label.tsx";
import Button from "../atoms/button.tsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.tsx";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactCard = () => {
  const contactCardRef = useScrollAnimation();
  return (
    <div
      ref={contactCardRef.ref}
      className={`flex justify-center items-center w-full py-12 ${
        contactCardRef.isVisible ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <div className="bg-[#2D2D2D] rounded-xl shadow-xl border border-gray-700 max-w-lg w-full px-8 py-10 flex flex-col items-center justify-center text-center overflow-hidden relative">
        <Label size="4xl" bold={true}>
          Contact Me
        </Label>

        <div className="flex flex-col gap-6 mt-8 mb-6 w-full">
          <a
            href="https://www.linkedin.com/in/andrew-chen-641444208/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#0077B5] text-white py-3 px-6 rounded-lg hover:bg-[#005885] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <FaLinkedin size={24} />
            <span className="text-lg font-medium">Connect on LinkedIn</span>
          </a>

          <a
            href="mailto:achen1076@gmail.com"
            className="flex items-center justify-center gap-3 bg-[#4A4A4A] text-white py-3 px-6 rounded-lg hover:bg-[#333333] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <FaEnvelope size={24} />
            <span className="text-lg font-medium">achen1076@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
