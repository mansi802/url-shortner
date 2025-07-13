import React, { useState } from "react";
import { registerUser } from "../api/user.api";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(name, password, email);
      setLoading(false);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="robotic-text text-3xl font-black mb-2 text-blue-400">
          USER REGISTRATION
        </h2>
        <div className="terminal-text text-sm text-gray-400">
          * CREATE NEW USER PROFILE IN SYSTEM *
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-900/50 border border-red-500 text-red-400 p-4 rounded-md terminal-text">
          <div className="font-bold text-red-300">REGISTRATION ERROR:</div>
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label
            className="terminal-text block text-lg font-bold mb-3 text-cyan-400"
            htmlFor="name"
          >
            [NAME] USER IDENTIFIER:
          </label>
          <input
            className="terminal-input w-full px-4 py-3 rounded-md text-lg"
            id="name"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            className="terminal-text block text-lg font-bold mb-3 text-purple-400"
            htmlFor="email"
          >
            [EMAIL] COMMUNICATION ADDRESS:
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
            className="terminal-text block text-lg font-bold mb-3 text-yellow-400"
            htmlFor="password"
          >
            [PASSWORD] SECURITY KEY (MIN 6 CHARS):
          </label>
          <input
            className="terminal-input w-full px-4 py-3 rounded-md text-lg"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
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
              CREATING PROFILE...
            </div>
          ) : (
            "CREATE USER PROFILE"
          )}
        </button>

        <div className="text-center mt-6">
          <div className="terminal-text text-sm text-gray-400">
            <span className="text-cyan-400">EXISTING USER?</span>{" "}
            <span
              onClick={() => state(true)}
              className="text-green-400 hover:text-green-300 cursor-pointer font-bold"
            >
              ACCESS SYSTEM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
