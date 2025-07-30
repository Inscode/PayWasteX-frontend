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
      { label: "Direct Payments", path: "/responsibleOfficer/directpayments" },
      { label: "Reports", path: "/responsibleOfficer/reports" },
      {
        label: "Customer Details",
        path: "/responsibleOfficer/customerdetails",
      },
      { label: "Settings", path: "/responsibleOfficer/settings" },
    ],
    FEECOLLECTOR: [{ label: "Dashboard", path: "/feeCollector/dashboard" }],
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
    ${
      isSingleTab
        ? "w-fit mx-auto rounded-xl border border-green-300 bg-[#c5ecd4] p-2 shadow-sm" // Single tab styling
        : "w-fit mx-auto rounded-xl border border-green-300 bg-[#c5ecd4] p-1 shadow-sm" // Tab group styling
    }
    items-center gap-1 // Use gap instead of space-x for better control
  `}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              aria-current={isActive ? "page" : undefined}
              className={`
          relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
          ${
            isActive
              ? "bg-white text-green-900 shadow-sm border border-green-200" // Active: white background with subtle border
              : "text-green-800 hover:bg-white/40 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
          }
          whitespace-nowrap min-w-fit cursor-pointer
          transform hover:scale-[1.02] active:scale-[0.98] // Subtle scale effects
        `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
