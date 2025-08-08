import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import categories from "../data/categories.json";

export default function LeftBar({
  selectedCategory,
  selectedSubItemFile,
  setSelectedSubItemFile,
  selectedCommandTitle,
  setSelectedCommandTitle,
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
    const newWidth = startWidthRef.current + delta;
    const clamped = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
    setWidth(clamped);
  };

  const onMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // Define background and text colors based on theme
  const bgClass = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const searchBgClass = theme === "dark" ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500";
  const hoverBgClass = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300";
  const selectedBgClass = theme === "dark" ? "bg-gray-700 font-bold" : "bg-gray-300 font-bold";

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`${bgClass} h-screen relative flex flex-col transition-colors duration-300`}
    >
      <div
        className="overflow-y-auto flex-1 p-4 pr-5"
        style={{ boxSizing: "content-box" }}
      >
        <h2 className="text-lg font-semibold mb-4">Options</h2>

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

        <ul className="space-y-2 pb-20">
          {filteredSubItems.length === 0 ? (
            <li className={theme === "dark" ? "text-gray-400 italic" : "text-gray-600 italic"}>
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
                  className={`cursor-pointer px-3 py-2 rounded-md transition ${hoverBgClass} ${
                    isSelected ? selectedBgClass : ""
                  }`}
                  onClick={() => {
                    setSelectedSubItemFile(item.file);
                    setSelectedCommandTitle(item.name);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedSubItemFile(item.file);
                      setSelectedCommandTitle(item.name);
                    }
                  }}
                >
                  {item.name}
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 right-0 w-4 cursor-ew-resize z-20"
        style={{
          height: "100%",
          background:
            "linear-gradient(270deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06))",
        }}
      />
    </aside>
  );
}
