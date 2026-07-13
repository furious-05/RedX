import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function CategoriesBar({
  selectedCategory,
  setSelectedCategory,
  categories = [],
  width = 256,
  setWidth = () => {},
}) {
  const theme = useSelector((state) => state.theme.mode);

  const [searchTerm, setSearchTerm] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState({});
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
  }, [searchTerm, categories]);

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
    const newWidth = startWidthRef.current + delta; // drag right increases width
    const clampedWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
    setWidth(clampedWidth);
  };

  const onMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // Theme-based classes
  const bgClass = theme === "dark" 
    ? "bg-zinc-900 text-zinc-300 border-r border-white/5" 
    : "bg-zinc-50 text-zinc-800 border-r border-zinc-200";
  const searchBgClass = theme === "dark" 
    ? "bg-zinc-950 text-zinc-200 placeholder-zinc-500 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-md font-sans text-sm shadow-sm transition-all" 
    : "bg-white text-zinc-900 placeholder-zinc-500 border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-md font-sans text-sm shadow-sm transition-all";
  const hoverBgClass = theme === "dark" 
    ? "hover:bg-white/5 hover:text-zinc-100 rounded-md transition-colors" 
    : "hover:bg-zinc-200/50 hover:text-zinc-900 rounded-md transition-colors";
  const selectedBgClass = theme === "dark" 
    ? "bg-white/5 text-emerald-400 font-medium rounded-md" 
    : "bg-emerald-50 text-emerald-600 font-medium rounded-md";
  const groupLabelClass = theme === "dark" ? "text-zinc-500 font-semibold" : "text-zinc-500 font-semibold";
  const noCatClass = theme === "dark" ? "text-zinc-600 italic" : "text-zinc-400 italic";

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`${bgClass} h-screen relative flex flex-col transition-none`}
    >
      {/* Scroll container with padding-top for fixed header and bottom for last item */}
      <div
        className="overflow-y-auto flex-1 p-4 pt-20 pl-5 pb-20"
        style={{ boxSizing: "content-box" }}
      >
        <h2 className={`text-xs uppercase tracking-wider font-semibold mb-4 px-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
          Categories
        </h2>

        {/* Search input */}
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className={`w-full px-3 py-1.5 text-sm focus:outline-none transition ${searchBgClass}`}
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
                {groupName !== "Other" && (
                  <div
                    onClick={() => setCollapsedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }))}
                    className={`${groupLabelClass} text-[10px] uppercase mb-2 px-2 font-bold tracking-widest flex items-center justify-between cursor-pointer hover:text-zinc-300 transition-colors select-none`}
                  >
                    <span>{groupName}</span>
                    <svg
                      className={`w-3 h-3 transform transition-transform ${collapsedGroups[groupName] ? '-rotate-90' : 'rotate-0'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
                {!collapsedGroups[groupName] && (
                  <ul className="space-y-0.5">
                    {items.map((item) => (
                      <li
                        key={item.name}
                        className={`cursor-pointer px-3 py-1.5 text-sm font-sans flex items-center justify-between mb-0.5 ${
                          selectedCategory === item.name ? selectedBgClass : hoverBgClass
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
                        <span>{item.name}</span>
                        {selectedCategory === item.name && (
                          <span className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500'}`} />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Resize handle (right edge) */}
      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 right-0 w-4 cursor-ew-resize z-20"
        style={{
          height: "100%",
          background: theme === "dark" ? "transparent" : "transparent",
        }}
        aria-label="Resize sidebar"
        role="separator"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setWidth(Math.min(width + 10, MAX_WIDTH));
          if (e.key === "ArrowLeft") setWidth(Math.max(width - 10, MIN_WIDTH));
        }}
      />
    </aside>
  );
}
