import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoleButtonGroup() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  if (!user) return null;

  const roleTabs = {
    admin: [
      { label: "User Management", path: "/admin/userManagement" },
      { label: "Fee Structure",   path: "/admin/feeStructure"   },
      { label: "Audit Logs",      path: "/admin/auditLogs"      },
      { label: "System Settings", path: "/admin/systemSettings" },
    ],
    shopOwner: [
      { label: "Dashboard",       path: "/shopOwner/dashboard"  },
      { label: "Billing History", path: "/shopOwner/bills"      },
    ],
    responsibleOfficer: [
      { label: "Dashboard",    path: "/responsibleOfficer/dashboard" },
      { label: "Bills",        path: "/responsibleOfficer/bills"     },
      { label: "Store Owners", path: "/responsibleOfficer/stores"    },
      { label: "Outstanding",  path: "/responsibleOfficer/payments"  },
    ],
    feeCollector: [
      { label: "Dashboard",   path: "/feeCollector/dashboard" },
      { label: "Collect Fees", path: "/feeCollector/collect"   },
      { label: "History",      path: "/feeCollector/history"   },
    ],
  };

  const tabs = roleTabs[user.role] || [];

  // keep dropdown in sync with URL
  const [selected, setSelected] = useState(location.pathname);
  useEffect(() => setSelected(location.pathname), [location.pathname]);

  const handleSelect = (e) => navigate(e.target.value);

  return (
    <div className="mt-12 md:mt-4 px-3">
      {/* MOBILE: smaller dropdown */}
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

      {/* DESKTOP+: slimmer tab bar */}
      <div className="
            hidden md:flex 
            bg-[#c5ecd4] rounded-[16px] 
            w-full max-w-2xl mx-auto 
            shadow-sm overflow-hidden 
            border border-green-300 
            min-h-[48px]
          ">
        {tabs.map((tab, i) => {
          const isActive = location.pathname === tab.path;
          return (
            <div key={tab.path} className="flex-1 flex items-center relative">
              <button
                onClick={() => navigate(tab.path)}
                className={`
                  whitespace-nowrap px-2 py-2 
                  text-sm md:text-base font-semibold 
                  bg-[#c5ecd4] text-green-800
                  ${isActive ? "underline underline-offset-3 decoration-2" : ""}
                  transition
                `}
              >
                {tab.label}
              </button>
              {i < tabs.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2/3 w-[1px] bg-green-500" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
