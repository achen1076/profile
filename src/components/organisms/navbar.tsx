import React, { useState, useEffect } from "react";
import { cn } from "../../constants/globalFunctions.tsx";
import { Link } from "react-router-dom";
import NavLink from "../molecules/NavLink.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile, isTablet } = useWindowSize();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={cn(
        "bg-[#222222] text-white w-[90%] ml-[5%] mt-3 rounded-2xl transition-all duration-300 fixed top-0 left-0 z-50",
        isMenuOpen && (isMobile || isTablet) ? "h-auto pb-4" : "h-16",
        className
      )}
      {...props}
    >
      <div className="w-full px-6 h-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold pl-2">
              Andrew Chen
            </Link>
          </div>

          {isMobile || isTablet ? (
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          ) : (
            <div className="flex space-x-8">
              <NavLink to="#home">Home</NavLink>
              <NavLink to="#about">About</NavLink>
              <NavLink to="#projects">Projects</NavLink>
              <NavLink to="#experiences">Experiences</NavLink>
              <NavLink to="#skills">Skills</NavLink>
            </div>
          )}
        </div>

        {(isMobile || isTablet) && isMenuOpen && (
          <div className="flex flex-col space-y-4 mt-2 px-2 animate-fadeIn justify-end">
            <NavLink to="#home">Home</NavLink>
            <NavLink to="#about">About</NavLink>
            <NavLink to="#projects">Projects</NavLink>
            <NavLink to="#experiences">Experiences</NavLink>
            <NavLink to="#skills">Skills</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
