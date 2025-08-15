import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import categories from "../data/categories.json";

export default function RightBar({
  selectedCategory,
  setSelectedCategory,
  width = 256,
  setWidth = () => {},
}) {
  const theme = useSelector((state) => state.theme.mode);

  const [searchTerm, setSearchTerm] = useState("");
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(width);
  const MIN_WIDTH = 160;
  const MAX_WIDTH = 800;

  // Group categories by group name (or "Other") and filter by search term
  const groupedCategories = useMemo(() => {
    const filtered = categories.filter((c) =>
      searchTerm.trim()
        ? c.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

    return filtered.reduce((acc, category) => {
      const group = category.group || "Other";
      if (!acc[group]) acc[group] = [];
      acc[group].push(category);
      return acc;
    }, {});
  }, [searchTerm]);

  // Mouse drag handlers for resizing sidebar width
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
    const newWidth = startWidthRef.current - delta; // drag right decreases width
    const clampedWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
    setWidth(clampedWidth);
  };

  const onMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // Theme-based classes
  const bgClass = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const searchBgClass = theme === "dark" ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500";
  const hoverBgClass = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300";
  const selectedBgClass = theme === "dark" ? "bg-gray-700 font-bold" : "bg-gray-300 font-bold";
  const groupLabelClass = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const noCatClass = theme === "dark" ? "text-gray-400 italic" : "text-gray-600 italic";

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`${bgClass} h-screen relative flex flex-col transition-colors duration-300`}
    >
      {/* Scroll container with padding-top for fixed header and bottom for last item */}
      <div
        className="overflow-y-auto flex-1 p-4 pt-20 pl-5 pb-20"
        style={{ boxSizing: "content-box" }}
      >
        <h2 className={`text-xl font-semibold mb-3 border-b pb-2 border-gray-700`}>
          Categories
        </h2>

        {/* Search input */}
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${searchBgClass}`}
            aria-label="Search categories"
          />
        </div>

        {/* Groups and category lists */}
        <div className="space-y-6">
          {Object.keys(groupedCategories).length === 0 ? (
            <div className={noCatClass}>No categories found</div>
          ) : (
            Object.entries(groupedCategories).map(([groupName, items]) => (
              <div key={groupName}>
                <div className={`${groupLabelClass} text-xs uppercase mb-2 font-semibold`}>
                  {groupName}
                </div>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li
                      key={item.name}
                      className={`cursor-pointer px-3 py-2 rounded-md transition select-none ${hoverBgClass} ${
                        selectedCategory === item.name ? selectedBgClass : ""
                      }`}
                      onClick={() => setSelectedCategory(item.name)}
                      tabIndex={0}
                      role="option"
                      aria-selected={selectedCategory === item.name}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedCategory(item.name);
                        }
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Resize handle (left edge) */}
      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 left-0 w-4 cursor-ew-resize z-20"
        style={{
          height: "100%",
          background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06))",
        }}
        aria-label="Resize sidebar"
        role="separator"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setWidth(Math.min(width + 10, MAX_WIDTH));
          if (e.key === "ArrowRight") setWidth(Math.max(width - 10, MIN_WIDTH));
        }}
      />
    </aside>
  );
}
