import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PentestXLoader from "./components/ThreeDLoader";
import Header from "./components/Header";
import RightBar from "./components/RightBar";
import LeftBar from "./components/LeftBar";
import useCommands from "./hooks/useCommands";
import categories from "./data/categories.json";
import inputFieldsConfig from "./config/inputFieldsConfig";

export default function App() {
  const theme = useSelector((state) => state.theme.mode);

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name || "SMB Enumeration");
  const [selectedSubItemFile, setSelectedSubItemFile] = useState(null);
  const [selectedCommandTitle, setSelectedCommandTitle] = useState(null);

  const [formValues, setFormValues] = useState({});
  const [command, setCommand] = useState("");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const { data, loading } = useCommands(selectedSubItemFile);

  const [rightWidth, setRightWidth] = useState(256);
  const [leftWidth, setLeftWidth] = useState(192);

  const [copiedCommand, setCopiedCommand] = useState(null);

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

    setFormValues((prevValues) => {
      const newValues = { ...prevValues };
      inputs.forEach(({ name }) => {
        if (!(name in newValues)) {
          newValues[name] = "";
        }
      });
      return newValues;
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (!data?.commands?.length || !selectedCommandTitle) {
      setCommand("");
      return;
    }
    const cmdObj = data.commands.find((c) => c.title === selectedCommandTitle);
    if (!cmdObj) {
      setCommand("");
      return;
    }

    let out = cmdObj.template || "";
    Object.entries(formValues).forEach(([key, value]) => {
      const val = value || `<${key}>`;
      out = out.replace(new RegExp(`{${key}}`, "g"), val);
    });

    setCommand(out);
  }, [formValues, selectedCommandTitle, data]);

  const copyCommand = async (text, title) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(title);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  const handleToggleLeft = () => setShowLeft((s) => !s);
  const handleToggleRight = () => setShowRight((s) => !s);

  if (loadingScreen) {
    return <PentestXLoader fadeOut={fadeOut} />;
  }

  const currentInputs = inputFieldsConfig[selectedCategory] || inputFieldsConfig.default;

  return (
    <div
      className={`h-screen flex flex-col transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header onToggleLeft={handleToggleLeft} onToggleRight={handleToggleRight} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div
          className={`${
            showLeft ? "fixed inset-y-0 left-0 z-40" : "hidden"
          } md:block md:relative md:inset-auto md:z-auto`}
        >
          <div style={{ width: `${leftWidth}px` }}>
            <LeftBar
              width={leftWidth}
              setWidth={setLeftWidth}
              selectedCategory={selectedCategory}
              selectedSubItemFile={selectedSubItemFile}
              setSelectedSubItemFile={(file) => {
                setSelectedSubItemFile(file);
                setShowLeft(false);
              }}
              selectedCommandTitle={selectedCommandTitle}
              setSelectedCommandTitle={(title) => {
                setSelectedCommandTitle(title);
                setShowLeft(false);
              }}
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
                <h2 className="text-2xl font-semibold">
                  {selectedCommandTitle || selectedSubItemFile || selectedCategory}
                </h2>

                <div className="flex items-center gap-2">
                  <div className={`hidden md:block text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Category: {selectedCategory}
                  </div>

                  <div className="md:hidden">
                    <select
                      className={`px-2 py-1 rounded border ${
                        theme === "dark"
                          ? "bg-gray-800 text-white border-gray-600"
                          : "bg-white text-black border-gray-300"
                      }`}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* INPUT FIELDS - dynamic */}
              <div className="flex flex-wrap gap-3 mt-3" style={{ alignItems: "center" }}>
                {currentInputs.map(({ name, placeholder, type }) => (
                  <input
                    key={name}
                    type={type}
                    placeholder={placeholder}
                    className={`px-3 pb-3 pt-2 rounded-md border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${
                      theme === "dark"
                        ? "bg-gray-800 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                    }`}
                    value={formValues[name] || ""}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [name]: e.target.value,
                      }))
                    }
                    style={{
                      flexGrow: 1,
                      flexBasis: `${100 / Math.min(currentInputs.length, 4)}%`,
                      minWidth: "140px",
                      maxWidth: "100%",
                    }}
                  />
                ))}
              </div>

              {/* COMMANDS AREA */}
              <div
                className={`mt-6 flex-1 min-h-0 p-4 rounded-lg border space-y-6 overflow-auto ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              >
                {data?.commands?.length > 0 ? (
                  data.commands.map(({ title, description, template }) => {
                    let commandText = template || "";
                    Object.entries(formValues).forEach(([key, value]) => {
                      const val = value || `<${key}>`;
                      commandText = commandText.replace(new RegExp(`{${key}}`, "g"), val);
                    });

                    const isCopied = copiedCommand === title;

                    return (
                      <div
                        key={title}
                        className={`pb-4 border-b ${
                          theme === "dark" ? "border-gray-700" : "border-gray-300"
                        } last:border-none`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{title}</h3>
                            {description && (
                              <p className={theme === "dark" ? "mb-2 text-gray-400" : "mb-2 text-gray-600"}>
                                {description}
                              </p>
                            )}
                          </div>

                          {/* COPY BUTTON */}
                          <button
                            onClick={() => copyCommand(commandText, title)}
                            aria-label={`Copy command for ${title}`}
                            className="text-gray-400 hover:text-green-400 transition text-xl select-none"
                            title={isCopied ? "Copied!" : "Copy command"}
                            style={{ userSelect: "none" }}
                          >
                         {isCopied ? (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
) : (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="9" y="9" width="10" height="10" rx="2" ry="2" />
    <rect x="5" y="5" width="10" height="10" rx="2" ry="2" />
  </svg>
)}

                          </button>
                        </div>

                        <pre
                          className={`whitespace-pre-wrap break-words font-mono text-sm rounded p-3 ${
                            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
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
            <RightBar
              width={rightWidth}
              setWidth={setRightWidth}
              selectedCategory={selectedCategory}
              setSelectedCategory={(c) => {
                setSelectedCategory(c);
                setShowRight(false);
              }}
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
