import React from "react";
import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <div className="text-center mb-8">
        <h1 className="robotic-text text-6xl font-black mb-4 glitch-text">
          URL COMPRESSOR
        </h1>
        <div className="terminal-text text-xl mb-2">
          <span className="text-cyan-400">SYSTEM:</span> ONLINE
        </div>
        <div className="terminal-text text-lg text-yellow-400">
          <span className="text-cyan-400">STATUS:</span> READY FOR URL
          PROCESSING
        </div>
      </div>

      <div className="bg-black/80 backdrop-blur-sm neon-border rounded-lg p-8 w-full max-w-2xl relative">
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>

        <div className="mb-6 text-center">
          <div className="terminal-text text-lg mb-2">
            <span className="text-cyan-400">INPUT:</span> ENTER URL FOR
            COMPRESSION
          </div>
          <div className="text-sm text-gray-400">
            * MAXIMUM EFFICIENCY ALGORITHM ACTIVATED *
          </div>
        </div>

        <UrlForm />
      </div>

      <div className="mt-8 text-center">
        <div className="terminal-text text-sm text-gray-400">
          <span className="text-cyan-400">VERSION:</span> 2.0.1 |
          <span className="text-cyan-400"> BUILD:</span> CYBER-2024 |
          <span className="text-cyan-400"> CPU:</span> QUANTUM PROCESSOR
        </div>
      </div>
    </div>
  );
};

export default HomePage;
