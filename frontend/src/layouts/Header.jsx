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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-600 to-green-600 backdrop-blur-lg border-b border-white/10 shadow-xl">
      <nav className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
        {/* Left: Logo with enhanced styling */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <img 
              src={logoB} 
              alt="PayWasteX Logo" 
              className="relative h-10 w-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tracking-tight">
              PayWasteX
            </span>
            <span className="text-xs text-emerald-100 opacity-75 -mt-1">
              Waste Management System
            </span>
          </div>
        </div>

        {/* Right: Modern Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Language Selector - Modern pill design */}
          <button
            onClick={cycleLanguage}
            className="group relative bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full 
                     hover:bg-white/20 border border-white/20 hover:border-white/30 
                     transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            title="Switch Language"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 
                          group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300 
                          flex items-center justify-center">
              <span className="text-xs">🌐</span>
            </div>
            <span className="font-medium">
              {lang === "en" ? "EN" : lang === "si" ? "සි" : lang === "ta" ? "த" : "EN"}
            </span>
            <svg className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Notification Bell - Modern with badge */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="group relative p-3 bg-white/10 backdrop-blur-sm rounded-full 
                       hover:bg-white/20 border border-white/20 hover:border-white/30 
                       transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Notifications"
            >
              <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="m13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 
                            rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-white">{notifications.length}</span>
              </div>
            </button>
            
            {/* Modern notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl 
                            shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50/50 
                                transition-colors duration-200 flex items-start gap-3 ${n.className}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 
                                    flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-sm">{n.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm">{t[n.type]}</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu - Modern avatar design */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="group relative p-1 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 
                       hover:from-emerald-300 hover:to-green-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Profile"
            >
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center 
                            group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
            </button>
            
            {/* Modern profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-xl rounded-2xl 
                            shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full 
                                  flex items-center justify-center shadow-sm">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-600">{user?.role || 'User'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-sm 
                             text-gray-700 hover:text-red-600 transition-colors duration-200 
                             flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;