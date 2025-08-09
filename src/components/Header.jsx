import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { Link } from "react-router-dom";
import logo from "../assets/robot.jpg";
import githubIcon from "../assets/github.jpeg";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const bgClass = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const hoverTextClass = "hover:text-gray-600";
  const btnHoverBgClass = "hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <header className={`${bgClass} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <h1 className="text-xl font-bold tracking-wide">PentestX</h1>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/about"
              className={`flex items-center gap-2 ${hoverTextClass} transition`}
            >
              <img
                src={logo}
                alt="About Logo"
                className="h-6 w-6 rounded-full object-cover"
              />
              About
            </Link>

            <a
              href="https://github.com/furious-05"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center ${hoverTextClass} transition`}
              title="GitHub Profile"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="h-10 w-10 object-contain"
              />
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`text-2xl p-2 rounded-full ${btnHoverBgClass} transition-colors duration-300`}
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon key="moon" /> : <FaSun key="sun" />}
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              className={`${btnHoverBgClass} p-2 rounded-md focus:outline-none`}
              aria-label="Open menu"
              // You can add onClick handler here to toggle mobile menu
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
