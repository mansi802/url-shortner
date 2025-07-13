import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <div className="text-center mb-8">
        <h1 className="robotic-text text-5xl font-black mb-4 glitch-text">
          ACCESS TERMINAL
        </h1>
        <div className="terminal-text text-xl mb-2">
          <span className="text-cyan-400">SYSTEM:</span> AUTHENTICATION REQUIRED
        </div>
        <div className="terminal-text text-lg text-yellow-400">
          <span className="text-cyan-400">MODE:</span>{" "}
          {login ? "LOGIN" : "REGISTRATION"}
        </div>
      </div>

      <div className="bg-black/80 backdrop-blur-sm neon-border rounded-lg p-8 w-full max-w-md relative">
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>

        {login ? (
          <LoginForm state={setLogin} />
        ) : (
          <RegisterForm state={setLogin} />
        )}
      </div>

      <div className="mt-8 text-center">
        <div className="terminal-text text-sm text-gray-400">
          <span className="text-cyan-400">SECURITY:</span> ENCRYPTED CONNECTION
          |<span className="text-cyan-400"> PROTOCOL:</span> QUANTUM AUTH
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
