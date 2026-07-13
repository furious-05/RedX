import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import PentestXLoader from "./components/ThreeDLoader";
import Header from "./components/Header";
import CategoriesBar from "./components/CategoriesBar";
import OptionsBar from "./components/OptionsBar";
import useCommands from "./hooks/useCommands";
import allCategories from "./data/categories.json";
import inputFieldsConfig from "./config/inputFieldsConfig";
import About from "./components/About";

// Memoized InputFields component
const InputFields = React.memo(({ inputs, formValues, setFormValues, theme }) => (
  <div className="flex flex-wrap gap-3 mt-3 items-center">
    {inputs.map(({ name, placeholder, type }) => (
      <input
        key={name}
        type={type}
        placeholder={placeholder}
        className={`px-4 py-2 font-mono text-sm rounded-md border focus:outline-none focus:ring-1 transition-all ${
          theme === "dark"
            ? "bg-zinc-900 text-zinc-200 border-white/5 placeholder-zinc-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
            : "bg-white text-zinc-900 border-zinc-300 placeholder-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20"
        }`}
        value={formValues[name] || ""}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, [name]: e.target.value }))
        }
        style={{
          flexGrow: 1,
          flexBasis: `${100 / Math.min(inputs.length, 4)}%`,
          minWidth: "140px",
          maxWidth: "100%",
        }}
      />
    ))}
  </div>
));

function MainInterface(props) {
  const {
    theme,
    selectedCategory,
    setSelectedCategory,
    selectedSubItemFile,
    setSelectedSubItemFile,
    selectedCommandTitle,
    setSelectedCommandTitle,
    formValues,
    setFormValues,
    data,
    loading,
    copiedCommand,
    copyCommand,
    showLeft,
    setShowLeft,
    leftWidth,
    setLeftWidth,
    showRight,
    setShowRight,
    rightWidth,
    setRightWidth,
    onSearchSelect, // new prop
  } = props;

  const currentInputs = useMemo(
    () => inputFieldsConfig[selectedCategory] || inputFieldsConfig.default,
    [selectedCategory]
  );

  return (
    <div
      className={`h-screen flex flex-col font-sans ${
        theme === "dark" ? "bg-zinc-950 text-zinc-200" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <Header
        onToggleLeft={() => setShowLeft((s) => !s)}
        onToggleRight={() => setShowRight((s) => !s)}
        onSearchSelect={onSearchSelect}
        activeMode={props.activeMode}
        setActiveMode={props.setActiveMode}
      />

      {/* rest of MainInterface stays unchanged */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div
          className={`${
            showLeft ? "fixed inset-y-0 left-0 z-40" : "hidden"
          } md:block md:relative md:inset-auto md:z-auto`}
        >
          <div style={{ width: `${leftWidth}px` }}>
            <CategoriesBar
              width={leftWidth}
              setWidth={setLeftWidth}
              selectedCategory={selectedCategory}
              setSelectedCategory={(c) => {
                setSelectedCategory(c);
                setShowLeft(false);
              }}
              categories={props.categories}
            />
          </div>
          {showLeft && (
            <div
              className="fixed inset-0 bg-black/30 md:hidden"
              onClick={() => setShowLeft(false)}
            />
          )}
        </div>

        {/* MAIN CONTENT */}
        <main
          className={`flex-1 flex flex-col p-4 md:p-6 overflow-hidden min-h-0 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {loading ? (
            <p>Loading commands...</p>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  {selectedCommandTitle || selectedSubItemFile || selectedCategory}
                </h2>
                <div className="flex items-center gap-2">
                  <div
                    className={`hidden md:block text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                    Category: {selectedCategory}
                  </div>
                  <div className="md:hidden">
                    <select
                      className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-all ${
                        theme === "dark"
                          ? "bg-zinc-900 text-zinc-200 border-white/5"
                          : "bg-white text-zinc-900 border-zinc-200"
                      }`}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {props.categories.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* INPUT FIELDS */}
              <InputFields
                inputs={currentInputs}
                formValues={formValues}
                setFormValues={setFormValues}
                theme={theme}
              />

              {/* COMMANDS AREA */}
              <div
                className={`mt-6 flex-1 min-h-0 p-6 rounded-xl border shadow-sm space-y-6 overflow-auto ${
                  theme === "dark" 
                    ? "bg-[#0c0c0e] border-white/5" 
                    : "bg-white border-zinc-200"
                }`}
              >
                {data?.commands?.length > 0 ? (
                  data.commands.map(({ title, description, template }) => {
                    let commandText = template || "";
                    Object.entries(formValues).forEach(([key, value]) => {
                      commandText = commandText.replace(new RegExp(`{${key}}`, "g"), value || `<${key}>`);
                    });

                    const isCopied = copiedCommand === title;

                    return (
                      <div
                        key={title}
                        className={`p-5 rounded-lg border ${
                          theme === "dark" ? "bg-zinc-900/50 border-white/5" : "bg-zinc-50 border-zinc-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div>
                            <h3 className={`text-base font-semibold tracking-tight ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
                              {title}
                            </h3>
                            {description && (
                              <p className={`text-sm mt-1 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                                {description}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => copyCommand(commandText, title)}
                            aria-label={`Copy command for ${title}`}
                            className="text-gray-400 hover:text-green-400 transition text-xl select-none"
                            title={isCopied ? "Copied!" : "Copy command"}
                          >
                            {isCopied ? (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <rect x="9" y="9" width="10" height="10" rx="2" ry="2" />
                                <rect x="5" y="5" width="10" height="10" rx="2" ry="2" />
                              </svg>
                            )}
                          </button>
                        </div>
                        <pre
                          className={`whitespace-pre-wrap break-words font-mono text-sm p-4 rounded-md border ${
                            theme === "dark" 
                              ? "bg-black/40 border-white/5 text-zinc-300" 
                              : "bg-white border-zinc-200 text-zinc-800 shadow-sm"
                          }`}
                        >
                          {commandText}
                        </pre>
                      </div>
                    );
                  })
                ) : (
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    Select a category and fill inputs to see the commands.
                  </p>
                )}
              </div>
            </>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <div
          className={`${
            showRight ? "fixed inset-y-0 right-0 z-40" : "hidden"
          } md:block md:relative md:inset-auto md:z-auto`}
        >
          <div style={{ width: `${rightWidth}px` }}>
            <OptionsBar
              width={rightWidth}
              setWidth={setRightWidth}
              selectedCategory={selectedCategory}
              selectedSubItemFile={selectedSubItemFile}
              setSelectedSubItemFile={(file) => {
                setSelectedSubItemFile(file);
                setShowRight(false);
              }}
              selectedCommandTitle={selectedCommandTitle}
              setSelectedCommandTitle={(title) => {
                setSelectedCommandTitle(title);
                setShowRight(false);
              }}
              categories={props.categories}
            />
          </div>
          {showRight && (
            <div
              className="fixed inset-0 bg-black/30 md:hidden"
              onClick={() => setShowRight(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const theme = useSelector((state) => state.theme.mode);

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const [activeMode, setActiveMode] = useState("Pentesting");
  const categories = allCategories[activeMode] || [];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name || "Scanning");
  const [selectedSubItemFile, setSelectedSubItemFile] = useState(null);
  const [selectedCommandTitle, setSelectedCommandTitle] = useState(null);

  const [formValues, setFormValues] = useState({});
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [leftWidth, setLeftWidth] = useState(192);
  const [rightWidth, setRightWidth] = useState(256);
  const [copiedCommand, setCopiedCommand] = useState(null);

  const { data, loading } = useCommands(selectedSubItemFile);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1000);
    const hideTimer = setTimeout(() => setLoadingScreen(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    setSelectedSubItemFile(null);
    setSelectedCommandTitle(null);

    const cat = categories.find((c) => c.name === selectedCategory);
    if (cat?.subItems?.length) {
      setTimeout(() => {
        setSelectedSubItemFile(cat.subItems[0].file);
        setSelectedCommandTitle(cat.subItems[0].name);
      }, 0);
    }

    setShowRight(false);

    const inputs = inputFieldsConfig[selectedCategory] || inputFieldsConfig.default;
    setFormValues((prev) => {
      const newValues = { ...prev };
      inputs.forEach(({ name }) => {
        if (!(name in newValues)) newValues[name] = "";
      });
      Object.keys(newValues).forEach((key) => {
        if (!inputs.find((input) => input.name === key)) delete newValues[key];
      });
      return newValues;
    });
  }, [selectedCategory, activeMode, categories]);

  // When mode changes, reset category to first in that mode
  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.name === selectedCategory)) {
      setSelectedCategory(categories[0].name);
    }
  }, [activeMode, categories]);

  const copyCommand = async (text, title) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(title);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  const handleSearchSelect = (category, subItemFile, commandTitle, mode) => {
    if (mode && mode !== activeMode) {
      setActiveMode(mode);
    }
    
    // We use a timeout to allow activeMode and categories to update first
    setTimeout(() => {
      setSelectedCategory(category);
      if (subItemFile) setSelectedSubItemFile(subItemFile);
      else setSelectedSubItemFile(null);
      if (commandTitle) setSelectedCommandTitle(commandTitle);
      else setSelectedCommandTitle(null);
  
      setShowLeft(false);
      setShowRight(false);
    }, 0);

    // Reset form values for new category
    const inputs = inputFieldsConfig[category] || inputFieldsConfig.default;
    setFormValues((prev) => {
      const newValues = {};
      inputs.forEach(({ name }) => {
        newValues[name] = "";
      });
      return newValues;
    });
  };

  if (loadingScreen) return <PentestXLoader fadeOut={fadeOut} />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainInterface
            theme={theme}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubItemFile={selectedSubItemFile}
            setSelectedSubItemFile={setSelectedSubItemFile}
            selectedCommandTitle={selectedCommandTitle}
            setSelectedCommandTitle={setSelectedCommandTitle}
            formValues={formValues}
            setFormValues={setFormValues}
            data={data}
            loading={loading}
            copiedCommand={copiedCommand}
            copyCommand={copyCommand}
            showLeft={showLeft}
            setShowLeft={setShowLeft}
            leftWidth={leftWidth}
            setLeftWidth={setLeftWidth}
            showRight={showRight}
            setShowRight={setShowRight}
            rightWidth={rightWidth}
            setRightWidth={setRightWidth}
            onSearchSelect={handleSearchSelect}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            categories={categories}
          />
        }
      />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}