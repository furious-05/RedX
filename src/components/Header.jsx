import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { Link } from "react-router-dom";
import logo from "../assets/robot.jpg";
import githubIcon from "../assets/github.jpeg";
import { FaMoon, FaSun, FaTimes } from "react-icons/fa";
import categories from "../data/categories.json";

function Header({ onSearchSelect, activeMode, setActiveMode }) {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // Flatten categories + sub-items for suggestions
  const flattenedSuggestions = useMemo(() => {
    const result = [];
    Object.entries(categories).forEach(([mode, modeCategories]) => {
      modeCategories.forEach((cat) => {
        if (cat.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          result.push({ type: "category", name: cat.name, mode });
        }
        cat.subItems?.forEach((sub) => {
          if (sub.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            result.push({ type: "subItem", category: cat.name, name: sub.name, file: sub.file, mode });
          }
        });
      });
    });
    return result;
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    if (onSearchSelect) {
      if (suggestion.type === "category") {
        onSearchSelect(suggestion.name, null, null, suggestion.mode);
      } else if (suggestion.type === "subItem") {
        onSearchSelect(suggestion.category, suggestion.file, suggestion.name, suggestion.mode);
      }
    }
    setSearchQuery("");
    setSuggestionsVisible(false);
  };

  const bgClass = theme === "dark" 
    ? "bg-zinc-950 text-zinc-100 border-b border-white/5" 
    : "bg-white text-zinc-900 border-b border-zinc-200";
  const btnHoverBgClass = theme === "dark" ? "hover:bg-zinc-900" : "hover:bg-zinc-100";
  const searchBgClass = theme === "dark" 
    ? "bg-zinc-900 text-zinc-200 placeholder-zinc-500 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-md font-sans text-sm shadow-sm transition-all" 
    : "bg-zinc-50 text-zinc-900 placeholder-zinc-500 border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-md font-sans text-sm shadow-sm transition-all";

  return (
    <header className={`${bgClass} transition-colors duration-200 fixed w-full z-50`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 relative gap-4">
          <div className="flex items-center gap-3 min-w-[150px]">
            <img src="/RedX/Sitelogo.jpeg" alt="RedX Logo" className="w-8 h-8 rounded-md shadow-sm" />
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 cursor-pointer">
              RedX<span className="text-emerald-400">.</span>
            </h1>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className={`hidden md:flex items-center p-1 rounded-lg ${theme === 'dark' ? 'bg-zinc-900 border border-white/5' : 'bg-zinc-100 border border-zinc-200'} transition-all`}>
            <button 
              onClick={() => setActiveMode('Pentesting')}
              className={`px-4 py-1 text-sm font-medium rounded-md transition-all ${activeMode === 'Pentesting' ? (theme === 'dark' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'bg-white text-emerald-600 shadow-sm') : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5' : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/5')}`}
            >
              Pentesting
            </button>
            <button 
              onClick={() => setActiveMode('Red Teaming')}
              className={`px-4 py-1 text-sm font-medium rounded-md transition-all ${activeMode === 'Red Teaming' ? (theme === 'dark' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'bg-white text-emerald-600 shadow-sm') : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5' : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/5')}`}
            >
              Red Teaming
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm ml-auto">
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSuggestionsVisible(!!e.target.value);
              }}
              placeholder="Search categories or options..."
              className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${searchBgClass}`}
              onFocus={() => setSuggestionsVisible(!!searchQuery)}
              onBlur={() => setTimeout(() => setSuggestionsVisible(false), 150)} // delay to allow click
            />
            {/* Suggestions Dropdown */}
            {suggestionsVisible && flattenedSuggestions.length > 0 && (
              <ul
                className={`absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-md border shadow-lg ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
              >
                {flattenedSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700`}
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s.type === "category" ? (
                      <span className="font-semibold">{s.name}</span>
                    ) : (
                      <span>{s.name} <span className="text-sm text-gray-400">({s.category})</span></span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/about" className="flex items-center gap-2 hover:text-gray-600 transition">
              <img src={logo} alt="About Logo" className="h-6 w-6 rounded-full object-cover" />
              About
            </Link>
            <a
              href="https://github.com/furious-05/RedX"
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
        className={`fixed top-0 left-0 h-full w-full transform transition-transform duration-200 ease-in-out z-40 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } ${theme === "dark" ? "bg-zinc-950 text-zinc-100 border-r border-white/5" : "bg-white text-zinc-900 border-r border-zinc-200"}`}
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
        <div className="flex flex-col items-center mt-10 text-xl w-full px-8">
          {/* Mobile Mode Switcher */}
          <div className="w-full mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 text-center">Mode</p>
            <div className={`flex p-1 rounded-lg w-full ${theme === 'dark' ? 'bg-zinc-900 border border-white/5' : 'bg-zinc-100 border border-zinc-200'}`}>
              <button 
                onClick={() => { setActiveMode('Pentesting'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${activeMode === 'Pentesting' ? (theme === 'dark' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'bg-white text-emerald-600 shadow-sm') : 'text-zinc-500'}`}
              >
                Pentesting
              </button>
              <button 
                onClick={() => { setActiveMode('Red Teaming'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${activeMode === 'Red Teaming' ? (theme === 'dark' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'bg-white text-emerald-600 shadow-sm') : 'text-zinc-500'}`}
              >
                Red Team
              </button>
            </div>
          </div>

          {[
            { type: "link", label: "ABOUT", to: "/about" },
            { type: "external", label: "GITHUB", href: "https://github.com/furious-05" },
            { type: "button", label: theme === "light" ? "DARK_MODE" : "LIGHT_MODE", action: () => dispatch(toggleTheme()) },
          ].map((item, index) => (
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
              <div className={`w-full mx-auto h-px ${theme === "dark" ? "bg-white/5" : "bg-zinc-200"} my-1`}></div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
