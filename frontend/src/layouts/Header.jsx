import React, { useEffect, useRef, useState } from "react";
import logoB from "../assets/logoBin.png";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { notifications, notificationLabels } from "../data/notification";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const { lang, switchLanguage } = useLanguage();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const cycleLanguage = () => {
    const order = ["en", "si", "ta"];
    const nextLang = order[(order.indexOf(lang) + 1) % order.length];
    switchLanguage(nextLang);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const t = notificationLabels[lang] || notificationLabels.en;

  return (
    <nav className="sticky top-0 z-50 bg-green-700 flex justify-between items-center h-12 sm:h-16 px-4 sm:px-6">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src={logoB} alt="PayWasteX Logo" className="h-8 sm:h-10 w-auto" />
        <span className="text-xl sm:text-2xl font-bold text-white">
          PayWasteX
        </span>
      </div>

      {/* Right: Language | Notifications | Profile */}
      <div className="flex items-center gap-4">
        {/* Language Button */}
        <button
          onClick={cycleLanguage}
          className="bg-white/20 text-white text-xs sm:text-sm px-3 py-1 rounded hover:bg-white/30 transition flex items-center gap-1"
          title="Switch Language"
        >
          🌐{" "}
          {lang === "en"
            ? "English"
            : lang === "si"
            ? "සිංහල"
            : lang === "ta"
            ? "தமிழ்"
            : "English"}
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-white transition hover:text-green-300 p-1"
            title="Notifications"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                d="M12 22c1.104 0 2-.896 2-2h-4a2 2 0 002 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 10-2 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
                fill="white"
              />
            </svg>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 text-sm rounded shadow-md w-72 z-50 bg-white">
              {notifications.map((n, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 border-b flex items-start gap-2 ${n.className}`}
                >
                  <span className="text-xl mt-1">{n.icon}</span>
                  <div>
                    <p className="font-semibold">{t[n.type]}</p>
                    <p className="text-xs opacity-80">{t.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="text-white transition hover:text-green-300 p-1"
            title="Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" />
            </svg>
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
              <div className="px-4 py-2 border-b text-sm font-medium">
                {user?.role || "User"}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
