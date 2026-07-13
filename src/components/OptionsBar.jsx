import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function OptionsBar({
  selectedCategory,
  selectedSubItemFile,
  setSelectedSubItemFile,
  selectedCommandTitle,
  setSelectedCommandTitle,
  categories = [],
  width = 192,
  setWidth = () => {},
}) {
  const theme = useSelector((state) => state.theme.mode);

  const [searchTerm, setSearchTerm] = useState("");
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(width);
  const MIN_WIDTH = 120;
  const MAX_WIDTH = 500;

  const category = categories.find((cat) => cat.name === selectedCategory);
  const allSubItems = category?.subItems ?? [];

  const filteredSubItems = allSubItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (
      filteredSubItems.length &&
      (!selectedCommandTitle ||
        !filteredSubItems.some(
          (item) =>
            item.name === selectedCommandTitle &&
            item.file === selectedSubItemFile
        ))
    ) {
      setSelectedCommandTitle(filteredSubItems[0].name);
      setSelectedSubItemFile(filteredSubItems[0].file);
    }
  }, [selectedCategory, searchTerm]);

  const onMouseDown = (e) => {
    e.preventDefault();
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    const newWidth = startWidthRef.current - delta; // drag left increases width
    const clamped = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
    setWidth(clamped);
  };

  const onMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // Theme-based classes
  const bgClass = theme === "dark" 
    ? "bg-zinc-900 text-zinc-300 border-l border-white/5" 
    : "bg-zinc-50 text-zinc-800 border-l border-zinc-200";
  const searchBgClass = theme === "dark" 
    ? "bg-zinc-950 text-zinc-200 placeholder-zinc-500 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-md font-sans text-sm shadow-sm transition-all" 
    : "bg-white text-zinc-900 placeholder-zinc-500 border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-md font-sans text-sm shadow-sm transition-all";
  const hoverBgClass = theme === "dark" 
    ? "hover:bg-white/5 hover:text-zinc-100 rounded-md transition-colors" 
    : "hover:bg-zinc-200/50 hover:text-zinc-900 rounded-md transition-colors";
  const selectedBgClass = theme === "dark" 
    ? "bg-white/5 text-emerald-400 font-medium rounded-md" 
    : "bg-emerald-50 text-emerald-600 font-medium rounded-md";

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`hidden md:flex ${bgClass} h-screen relative flex-col transition-none`}
    >
      {/* Add padding-top equal to header height (h-16) */}
      <div
        className="overflow-y-auto flex-1 p-4 pt-20 pr-5"
        style={{ boxSizing: "content-box" }}
      >
        <h2 className={`text-xs uppercase tracking-wider font-semibold mb-4 px-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
          Options
        </h2>


        {/* Search input */}
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search options..."
            className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${searchBgClass}`}
            aria-label="Search options"
          />
        </div>

        {/* Options list */}
        <ul className="space-y-0.5 pb-20 px-2">
          {filteredSubItems.length === 0 ? (
            <li className={theme === "dark" ? "text-zinc-500 italic text-sm" : "text-gray-400 italic text-sm"}>
              No options found
            </li>
          ) : (
            filteredSubItems.map((item) => {
              const isSelected =
                item.name === selectedCommandTitle &&
                item.file === selectedSubItemFile;
              return (
                <li
                  key={item.name + item.file}
                  className={`cursor-pointer px-3 py-1.5 text-sm font-sans flex items-center justify-between mb-0.5 ${isSelected ? selectedBgClass : hoverBgClass}`}
                  onClick={() => {
                    setSelectedSubItemFile(item.file);
                    setSelectedCommandTitle(item.name);
                  }}
                >
                  <span>{item.name}</span>
                  {isSelected && (
                    <span className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500'}`} />
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Resize handle */}
      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 left-0 w-4 cursor-ew-resize z-20"
        style={{
          height: "100%",
          background: theme === "dark" ? "transparent" : "transparent",
        }}
      />
    </aside>
  );
}
