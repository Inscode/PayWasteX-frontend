import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NavButton = ({ children, path }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className="px-8 py-3 text-lg font-semibold bg-green-200 text-green-900 rounded-t-lg border-b-4 border-green-400 hover:bg-green-300 focus:bg-green-300 transition"
    >
      {children}
    </button>
  );
};

const RoleButtonGroup = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "admin":
      return (
        <div className="flex justify-center gap-2 mb-10 mt-6">
          <NavButton path="/admin/dashboard">Dashboard</NavButton>
          <NavButton path="/admin/users">Users</NavButton>
          <NavButton path="/admin/settings">Settings</NavButton>
        </div>
      );
    case "shopOwner":
      return (
        <div className="flex justify-center gap-2 mb-10 mt-6">
          <NavButton path="/shopOwner/dashboard">Dashboard</NavButton>
          <NavButton path="/shopOwner/bills">Billing History</NavButton>
          <NavButton path="/shopOwner/properties">Property Details</NavButton>
        </div>
      );
    case "responsibleOfficer":
      return (
        <div className="flex justify-center gap-2 mb-10 mt-6">
          <NavButton path="/responsibleOfficer/dashboard">Dashboard</NavButton>
          <NavButton path="/responsibleOfficer/bills">Bills</NavButton>
          <NavButton path="/responsibleOfficer/stores">Store Owners</NavButton>
          <NavButton path="/responsibleOfficer/payments">Outstanding</NavButton>
        </div>
      );
    case "feeCollector":
      return (
        <div className="flex justify-center gap-2 mb-10 mt-6">
          <NavButton path="/feeCollector/dashboard">Dashboard</NavButton>
          <NavButton path="/feeCollector/collect">Collect Fees</NavButton>
          <NavButton path="/feeCollector/history">History</NavButton>
        </div>
      );
    default:
      return null;
  }
};

export default RoleButtonGroup;
