import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const bgClass = theme === "dark" 
    ? "bg-zinc-950 text-zinc-200" 
    : "bg-zinc-50 text-zinc-900";
  const cardClass = theme === "dark"
    ? "bg-zinc-900/50 border border-white/5"
    : "bg-white border border-zinc-200 shadow-sm";
  const dimClass = theme === "dark" ? "text-zinc-400" : "text-zinc-500";
  const linkClass = "text-emerald-400 hover:text-emerald-300 underline";

  return (
    <div className={`w-full min-h-screen px-4 py-8 ${bgClass} transition-colors duration-300`}>
      <div className={`max-w-4xl mx-auto rounded-lg p-6 ${cardClass}`}>
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
            theme === "dark"
              ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
              : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
          }`}
        >
          ← Go Back
        </button>

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
            <li><a href="https://www.netexec.wiki/" className={linkClass} target="_blank" rel="noopener noreferrer">NetExec Wiki</a></li>
            <li><a href="http://thehacker.recipes/" className={linkClass} target="_blank" rel="noopener noreferrer">The Hacker Recipes</a></li>
            <li><a href="https://www.revshells.com/" className={linkClass} target="_blank" rel="noopener noreferrer">RevShells</a></li>
            <li><a href="https://github.com/SecureAuthCorp/impacket" className={linkClass} target="_blank" rel="noopener noreferrer">Impacket</a></li>
            <li><a href="https://github.com/ly4k/Certipy/wiki/06-%E2%80%90-Privilege-Escalation" className={linkClass} target="_blank" rel="noopener noreferrer">Certipy Wiki</a></li>
          </ul>
        </section>

        <section>
          <p className={`text-sm ${dimClass}`}>
            <em>
              Note: This app is for educational use only. Get permission before testing targets.
            </em>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
