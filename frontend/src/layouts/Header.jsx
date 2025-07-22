// src/layouts/Header.jsx
import React from "react";
import logoB from "../assets/logoBin.png";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-green-700 flex justify-between items-center h-12 sm:h-16 px-4 sm:px-6">
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-2">
        <img
          src={logoB}
          alt="PayWasteX Logo"
          className="h-8 sm:h-10 w-auto"
        />
        <span className="text-xl sm:text-2xl font-bold text-white">
          PayWasteX
        </span>
      </div>

      {/* Right: Language, Bell, Profile */}
      <div className="flex items-center gap-4">
        {/* Language Switch */}
        <button className="text-white text-lg sm:text-xl hover:underline transition">
          සිංහල
        </button>

        {/* Notification Bell */}
        <button className="text-white text-2xl sm:text-3xl hover:text-green-200 transition">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="sm:w-10 sm:h-10"
          >
            <path
              d="M12 22c1.104 0 2-.896 2-2h-4a2 2 0 002 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 10-2 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
              fill="white"
            />
          </svg>
        </button>

        {/* User Profile */}
        <div className="relative group">
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-green-700 text-xl sm:text-2xl transition hover:ring-2 hover:ring-green-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" />
            </svg>
          </button>
          {/* Dropdown */}
          <div className="absolute right-0 hidden group-hover:block bg-white text-black rounded shadow-md mt-2 min-w-[140px]">
            <div className="px-4 py-2 border-b">{user?.role || "User"}</div>
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
