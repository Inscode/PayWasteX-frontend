import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const NavButton = ({ children, path, active, showDivider }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex items-center relative">
      <button
        type="button"
        onClick={() => navigate(path)}
        className={`
          w-full px-4 py-2 text-lg font-bold 
          bg-[#c5ecd4] text-green-800 
          ${active ? "underline underline-offset-4 decoration-2" : ""}
          rounded-none transition
        `}
        style={{ borderRadius: "18px" }}
      >
        {children}
      </button>
      {/* Divider */}
      {showDivider && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3/4 w-[1.5px] bg-green-500" />
      )}
    </div>
  );
};

const RoleButtonGroup = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const roleTabs = {
    admin: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Users", path: "/admin/users" },
      { label: "Settings", path: "/admin/settings" },
    ],
    shopOwner: [
      { label: "Dashboard", path: "/shopOwner/dashboard" },
      { label: "Billing History", path: "/shopOwner/bills" },
      { label: "Property Details", path: "/shopOwner/properties" },
    ],
    responsibleOfficer: [
      { label: "Dashboard", path: "/responsibleOfficer/dashboard" },
      { label: "Bills", path: "/responsibleOfficer/bills" },
      { label: "Store Owners", path: "/responsibleOfficer/stores" },
      { label: "Outstanding", path: "/responsibleOfficer/payments" },
    ],
    feeCollector: [
      { label: "Dashboard", path: "/feeCollector/dashboard" },
      { label: "Collect Fees", path: "/feeCollector/collect" },
      { label: "History", path: "/feeCollector/history" },
    ],
  };

  const tabs = roleTabs[user.role] || [];

  return (
    <div className="flex justify-center my-2">
      <div className="flex bg-[#c5ecd4] rounded-[20px] w-full max-w-2xl min-h-[52px] shadow-sm overflow-hidden border border-green-300">
        {tabs.map((tab, i) => (
          <NavButton
            key={tab.path}
            path={tab.path}
            active={location.pathname === tab.path}
            showDivider={i !== tabs.length - 1}
          >
            {tab.label}
          </NavButton>
        ))}
      </div>
    </div>
  );
};

export default RoleButtonGroup;
