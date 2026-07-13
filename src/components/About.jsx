import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate(); // hook to navigate programmatically

  // Light mode layout
  if (theme !== "dark") {
    return (
      <div className="p-6 max-w-4xl mx-auto text-gray-800 bg-gray-100 transition-colors duration-300">
        <GoBackButton theme={theme} navigate={navigate} />
        {renderContent("text-gray-600")}
      </div>
    );
  }

  // Dark mode layout
  return (
    <div
      className="w-full min-h-screen px-4 py-8 transition-colors duration-300"
      style={{ backgroundColor: "#101828" }}
    >
      <div
        className="max-w-4xl mx-auto rounded-lg p-6"
        style={{ backgroundColor: "#1E2939", color: "#E5E7EB" }}
      >
        <GoBackButton theme={theme} navigate={navigate} />
        {renderContent("text-gray-400")}
      </div>
    </div>
  );
};

// Go Back Button Component
const GoBackButton = ({ theme, navigate }) => (
  <button
    onClick={() => navigate(-1)}
    className={`mb-6 px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
      theme === "dark"
        ? "bg-gray-700 text-white hover:bg-gray-600"
        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
    }`}
  >
    ← Go Back
  </button>
);

// Extracted content function (unchanged)
const renderContent = (noteTextClass) => (
  <>
    <h1 className="text-4xl font-extrabold mb-6">About RedX</h1>

    <section className="mb-6">
      <p className="text-lg leading-relaxed">
        RedX is a comprehensive offensive security toolkit crafted specifically
        for red teamers, penetration testers, and ethical hackers...
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
      <ul className="list-disc list-inside space-y-2 text-lg">
        <li><strong>Categorized Commands:</strong> Browse by reconnaissance, exploitation...</li>
        <li><strong>Dynamic Input Fields:</strong> Customize parameters...</li>
        <li><strong>Copy to Clipboard:</strong> One-click command copying.</li>
        <li><strong>Dark Mode Support:</strong> Comfortable in both themes.</li>
        <li><strong>Responsive Layout:</strong> Works on all screens.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Why Use RedX?</h2>
      <p className="text-lg leading-relaxed">
        During penetration tests, quick access to reliable info is key...
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">How to Use This App</h2>
      <ol className="list-decimal list-inside space-y-2 text-lg">
        <li>Select a category.</li>
        <li>Choose a technique.</li>
        <li>Fill parameters.</li>
        <li>Copy the generated command.</li>
        <li>Use responsibly.</li>
      </ol>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Credits & Inspiration</h2>
      <ul className="list-disc list-inside space-y-3 text-lg">
        <li><a href="https://www.netexec.wiki/" className="text-blue-400 underline" target="_blank">NetExec Wiki</a></li>
        <li><a href="http://thehacker.recipes/" className="text-blue-400 underline" target="_blank">The Hacker Recipes</a></li>
        <li><a href="https://www.revshells.com/" className="text-blue-400 underline" target="_blank">RevShells</a></li>
        <li><a href="https://github.com/SecureAuthCorp/impacket" className="text-blue-400 underline" target="_blank">Impacket</a></li>
        <li><a href="https://github.com/ly4k/Certipy/wiki/06-%E2%80%90-Privilege-Escalation" className="text-blue-400 underline" target="_blank">Certipy Wiki</a></li>
        
      </ul>
    </section>

    <section>
      <p className={`text-sm ${noteTextClass}`}>
        <em>
          Note: This app is for educational use only. Get permission before testing targets.
        </em>
      </p>
    </section>
  </>
);

export default About;
