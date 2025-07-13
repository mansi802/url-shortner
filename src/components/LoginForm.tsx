import React, { useState } from "react";
import { loginUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(password, email);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
      console.log("signin success");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="robotic-text text-3xl font-black mb-2 text-green-400">
          USER LOGIN
        </h2>
        <div className="terminal-text text-sm text-gray-400">
          * ENTER CREDENTIALS TO ACCESS SYSTEM *
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-900/50 border border-red-500 text-red-400 p-4 rounded-md terminal-text">
          <div className="font-bold text-red-300">AUTHENTICATION ERROR:</div>
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label
            className="terminal-text block text-lg font-bold mb-3 text-cyan-400"
            htmlFor="email"
          >
            [EMAIL] USER IDENTIFIER:
          </label>
          <input
            className="terminal-input w-full px-4 py-3 rounded-md text-lg"
            id="email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            className="terminal-text block text-lg font-bold mb-3 text-purple-400"
            htmlFor="password"
          >
            [PASSWORD] SECURITY KEY:
          </label>
          <input
            className="terminal-input w-full px-4 py-3 rounded-md text-lg"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className={`cyber-button w-full py-4 text-lg font-bold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              AUTHENTICATING...
            </div>
          ) : (
            "ACCESS SYSTEM"
          )}
        </button>

        <div className="text-center mt-6">
          <div className="terminal-text text-sm text-gray-400">
            <span className="text-cyan-400">NEW USER?</span>{" "}
            <span
              onClick={() => state(false)}
              className="text-green-400 hover:text-green-300 cursor-pointer font-bold"
            >
              REGISTER ACCOUNT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
