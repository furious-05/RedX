// src/components/PentestXLoader.jsx
import React, { useEffect, useState } from "react";

export default function PentestXLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide after animation (3s)
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0e121b] text-[#00ff00]">
      <h1 className="text-5xl font-extrabold animate-pentestx">
        PentestX
      </h1>

      <style>{`
        @keyframes pentestx-anim {
          0% {
            opacity: 0;
            transform: translateZ(-100px) scale(0.5);
            text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
          }
          50% {
            opacity: 1;
            transform: translateZ(0) scale(1);
            text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;
          }
          100% {
            opacity: 0;
            transform: translateZ(-100px) scale(0.5);
            text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
          }
        }
        .animate-pentestx {
          animation: pentestx-anim 3s ease-in-out forwards;
          transform-style: preserve-3d;
          color: #00ff00;
        }
      `}</style>
    </div>
  );
}
