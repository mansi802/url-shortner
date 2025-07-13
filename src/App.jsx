import React from "react";
import HomePage from "./pages/HomePage";
import MatrixBackground from "./components/MatrixBackground";

const App = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <MatrixBackground />
      <div className="scanline"></div>
      <HomePage />
    </div>
  );
};

export default App;
