import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { Link } from "react-router-dom";
import logo from "../assets/robot.jpg";
import githubIcon from "../assets/github.jpeg";
import { FaMoon, FaSun, FaTimes } from "react-icons/fa";

function Header() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const bgClass = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const btnHoverBgClass = "hover:bg-gray-200 dark:hover:bg-gray-700";

  const menuItems = [
    { type: "link", label: "About", to: "/about" },
    { type: "external", label: "GitHub", href: "https://github.com/furious-05" },
    { type: "button", label: theme === "light" ? "Dark Mode" : "Light Mode", action: () => dispatch(toggleTheme()) },
  ];

  return (
    <header className={`${bgClass} transition-colors duration-300 fixed w-full z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold tracking-wide">PentestX</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/about" className="flex items-center gap-2 hover:text-gray-600 transition">
              <img src={logo} alt="About Logo" className="h-6 w-6 rounded-full object-cover" />
              About
            </Link>
            <a
              href="https://github.com/furious-05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-600 transition"
            >
              <img src={githubIcon} alt="GitHub" className="h-10 w-10 object-contain" />
            </a>
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`text-2xl p-2 rounded-full ${btnHoverBgClass} transition-colors duration-300`}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              className={`${btnHoverBgClass} p-2 rounded-md focus:outline-none`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

{/* Mobile Sliding Menu */}
<div
  className={`fixed top-0 left-0 h-full w-full transform transition-transform duration-500 ease-in-out z-40 ${
    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
  } ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
>
  {/* Close Button */}
  <div className="flex justify-end p-4">
    <button
      onClick={() => setMobileMenuOpen(false)}
      className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      <FaTimes />
    </button>
  </div>

  {/* Menu Items */}
  <div className="flex flex-col items-center mt-20 text-xl w-full">
    {menuItems.map((item, index) => (
      <div key={index} className="w-full text-center">
        {item.type === "link" && (
          <Link
            to={item.to}
            className="block w-full py-4 text-current hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        )}
        {item.type === "external" && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 text-current hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        )}
        {item.type === "button" && (
          <button
            onClick={() => {
              item.action();
              setMobileMenuOpen(false);
            }}
            className="block w-full py-4 text-current hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {item.label}
          </button>
        )}
        {/* Divider line */}
        <div className={`w-3/4 mx-auto h-px ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} my-1`}></div>
      </div>
    ))}
  </div>
</div>

    </header>
  );
}

export default Header;
