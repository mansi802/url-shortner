import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/user.api";
import { initialState, logout } from "../store/slice/authSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate({ to: "/" });
      console.log("logout success");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-green-500 neon-glow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link
              to="/"
              className="robotic-text text-2xl font-black text-green-400 hover:text-green-300 transition-colors"
            >
              URL_COMPRESSOR.exe
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="terminal-text text-sm">
                  <span className="text-cyan-400">USER:</span>{" "}
                  {user.user.name || "ANONYMOUS"}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="terminal-text text-xs text-green-400">
                    ONLINE
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="cyber-button px-4 py-2 text-sm font-bold"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="terminal-text text-xs text-red-400">
                    OFFLINE
                  </span>
                </div>
                <Link
                  to="/auth"
                  className="cyber-button px-4 py-2 text-sm font-bold"
                >
                  LOGIN
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
