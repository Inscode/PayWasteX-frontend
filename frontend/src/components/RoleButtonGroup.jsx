import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoleButtonGroup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (!user) return null;

  const roleTabs = {
    admin: [
      { label: "User Management", path: "/admin/userManagement" },
      { label: "Fee Structure", path: "/admin/feeStructure" },
      { label: "Audit Logs", path: "/admin/auditLogs" },
      { label: "System Settings", path: "/admin/systemSettings" },
    ],
    shopOwner: [
      { label: "Dashboard", path: "/shopOwner/dashboard" },
      { label: "Billing History", path: "/shopOwner/bills" },
    ],
    responsibleOfficer: [
      { label: "Dashboard", path: "/responsibleOfficer/dashboard" },
      { label: "Bills", path: "/responsibleOfficer/bills" },
      { label: "Store Owners", path: "/responsibleOfficer/stores" },
      { label: "Reports", path: "/responsibleOfficer/reports" },
    ],
    feeCollector: [
      { label: "Dashboard", path: "/feeCollector/dashboard" },
    ],
  };

  const tabs = roleTabs[user.role] || [];

  const [selected, setSelected] = useState(location.pathname);
  useEffect(() => setSelected(location.pathname), [location.pathname]);

  const handleSelect = (e) => navigate(e.target.value);
  const isSingleTab = tabs.length === 1;

  return (
    <div className="mt-12 md:mt-4 px-3">
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <select
          value={selected}
          onChange={handleSelect}
          className="
            w-full 
            bg-[#c5ecd4] text-green-800 font-semibold text-sm
            px-3 py-2 rounded-lg shadow-sm 
            border border-green-300
            focus:outline-none
          "
        >
          {tabs.map((tab) => (
            <option key={tab.path} value={tab.path}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop tab group */}
      <div className={`
      hidden md:flex 
      w-full justify-center
      ${isSingleTab ? "" : "bg-[#c5ecd4] rounded-[16px] shadow-sm overflow-hidden border border-green-300 min-h-[48px] max-w-2xl mx-auto"}
      `}>


        {tabs.map((tab, i) => {
          const isActive = location.pathname === tab.path;
          return (
            <div key={tab.path} className={`${isSingleTab ? "" : "flex-1 flex items-center justify-center relative"}`}>


              <button
              onClick={() => navigate(tab.path)}
              className={`
              ${isSingleTab ? "bg-[#c5ecd4] border border-green-300 px-6 py-2 rounded-[16px]" : ""}
              whitespace-nowrap text-sm md:text-base font-semibold text-green-800 transition 
              ${isActive ? "underline underline-offset-4 decoration-2" : ""}
              `}
            >
              {tab.label}
            </button>

              {!isSingleTab && i < tabs.length - 1 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2/3 w-[1px] bg-green-500" />
            )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
