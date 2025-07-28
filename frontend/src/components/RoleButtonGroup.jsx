import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoleButtonGroup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user is not available, don't render the component
  if (!user) return null;

  // Define tabs based on user roles
  const roleTabs = {
    ADMIN: [
      { label: "User Management", path: "/admin/userManagement" },
      { label: "Fee Structure", path: "/admin/feeStructure" },
      { label: "Audit Logs", path: "/admin/auditLogs" },
      { label: "System Settings", path: "/admin/systemSettings" },
    ],
    SHOPOWNER: [
      { label: "Dashboard", path: "/shopOwner/dashboard" },
      { label: "Billing History", path: "/shopOwner/bills" },
    ],
    RESPONSIBLEOFFICER: [
      { label: "Dashboard", path: "/responsibleOfficer/dashboard" },
      { label: "Bill Management", path: "/responsibleOfficer/billmanagement" },
      { label: "Payment Confirmation", path: "/responsibleOfficer/paymentconfirmation" },
      { label: "Reports", path: "/responsibleOfficer/reports" },
    ],
    FEECOLLECTOR: [
      { label: "Dashboard", path: "/feeCollector/dashboard" },
    ],
  };

  const tabs = roleTabs[user.role] || [];
  const isSingleTab = tabs.length === 1;

  // State to manage the selected tab, initialized with current path
  const [selected, setSelected] = useState(location.pathname);

  // Update selected tab when location changes
  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  // Handle navigation on dropdown selection (mobile)
  const handleSelect = (e) => {
    navigate(e.target.value);
  };

  return (
    <div className="mt-12 px-3 md:mt-4">
      {/* Mobile Dropdown for Navigation */}
      <div className="md:hidden">
        <select
          value={selected} // Controlled component
          onChange={handleSelect}
          aria-label="Select navigation page" // Added for accessibility
          className="
            w-full
            rounded-lg border border-green-300 bg-[#c5ecd4] px-3 py-2
            text-sm font-semibold text-green-800 shadow-sm outline-none
            focus:border-green-500 focus:ring-1 focus:ring-green-500
            cursor-pointer
          "
        >
          {tabs.map((tab) => (
            <option key={tab.path} value={tab.path}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tab Group */}
      <div
        className={`
          hidden md:flex
          w-full justify-center
          ${isSingleTab
            ? "max-w-xs rounded-2xl border border-green-300 bg-[#c5ecd4] p-2 shadow-sm" // Styling for a single button
            : "mx-auto max-w-2xl rounded-2xl border border-green-300 bg-[#c5ecd4] p-1 shadow-sm" // Styling for tab group
          }
          items-center space-x-1 // Added for spacing between tabs if not single
        `}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              aria-current={isActive ? "page" : undefined} // Added for accessibility
              className={`
                relative flex-1 rounded-xl px-4 py-2 text-center text-sm font-semibold transition-all duration-300 ease-in-out
                ${isActive
                  ? "bg-white text-green-900 shadow-md" // Active tab style: highlighted background, darker text, shadow
                  : "text-green-800 hover:bg-white/50 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" // Inactive tab style: hover effect, focus ring for accessibility
                }
                ${isSingleTab ? "w-full" : ""} // Ensure single tab takes full width of its container
                whitespace-nowrap // Prevents text wrapping
                cursor-pointer // Explicitly show pointer on hover
              `}
            >
              {tab.label}
              {/* Removed the bottom span indicator to eliminate the "underline" look */}
            </button>
          );
        })}
      </div>
    </div>
  );
}