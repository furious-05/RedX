import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const theme = useSelector((state) => state.theme.mode);

  // Light mode layout (as-is)
  if (theme !== "dark") {
    return (
      <div className="p-6 max-w-4xl mx-auto text-gray-800 bg-gray-100 transition-colors duration-300">
        {renderContent("text-gray-600")}
      </div>
    );
  }

  // Dark mode layout with side and center colors
  return (
    <div
      className="w-full min-h-screen px-4 py-8 transition-colors duration-300"
      style={{ backgroundColor: "#101828" }}
    >
      <div
        className="max-w-4xl mx-auto rounded-lg p-6"
        style={{ backgroundColor: "#1E2939", color: "#E5E7EB" }}
      >
        {renderContent("text-gray-400")}
      </div>
    </div>
  );
};

// Extracted content so we can reuse it in both themes
const renderContent = (noteTextClass) => (
  <>
    <h1 className="text-4xl font-extrabold mb-6">About PentestX</h1>

    <section className="mb-6">
      <p className="text-lg leading-relaxed">
        PentestX is a comprehensive offensive security toolkit crafted specifically
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
      <h2 className="text-2xl font-semibold mb-3">Why Use PentestX?</h2>
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
