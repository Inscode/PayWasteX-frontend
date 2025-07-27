import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Updated icons to better fit the roles
import { FaStore, FaUserShield, FaMoneyBillWave } from "react-icons/fa";

// RoleSelectionModal component for choosing account type
const RoleSelectionModal = ({ onClose }) => {
  const navigate = useNavigate();

  // Handles the selection of a role and navigates to the respective registration page
  const handleSelect = (role) => {
    switch (role) {
      case "shopOwner":
        navigate("/shopOwnerRegister");
        break;
      case "responsibleOfficer":
        navigate("/responsibleOfficerRegister");
        break;
      case "feeCollector": // New case for Fee Collector registration
        navigate("/feeCollectorRegister");
        break;
      default:
        break;
    }
    onClose(); // Close the modal after selection
  };

  // Effect to prevent body scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling on body
    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling on component unmount
    };
  }, []);

  return (
    // Overlay for the modal, covers the entire screen
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
      {/* Main modal content container */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-white px-8 py-10 rounded-3xl shadow-2xl w-full max-w-xl mx-4 animate-scaleIn transform perspective-1000 rotateX-3">
        {/* Modal title - font size reduced to text-3xl */}
        <h2 className="text-3xl font-semibold text-center mb-10 tracking-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Create Account As
        </h2>

        {/* Container for role selection buttons */}
        <div className="flex flex-col gap-6">
          <RoleButton
            icon={<FaStore size={32} />}
            label="Store Owner"
            description="Register and manage your shop"
            onClick={() => handleSelect("shopOwner")}
            color="green"
          />
          <RoleButton
            icon={<FaUserShield size={32} />}
            label="Responsible Officer"
            description="Oversee operations and ensure compliance"
            onClick={() => handleSelect("responsibleOfficer")}
            color="purple"
          />
          <RoleButton
            icon={<FaMoneyBillWave size={32} />} // Icon representing money/collection
            label="Fee Collector"
            description="Collect fees and update payment status"
            onClick={() => handleSelect("feeCollector")}
            color="orange" // New color for Fee Collector
          />
        </div>

        {/* Cancel button - now styled as a prominent button */}
        <button
          onClick={onClose}
          className="mt-10 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out text-center block w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// RoleButton sub-component for individual role options
const RoleButton = ({ icon, label, description, onClick, color }) => {
  // Base classes applied to all role buttons for consistent styling
  const baseClasses = "flex items-center gap-5 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 active:shadow-md";

  // Classes for the icon's background, dynamically set based on the 'color' prop
  const iconBgClasses = `p-3 rounded-full ${
    color === "blue" ? "bg-blue-600/20 text-blue-400" :
    color === "green" ? "bg-green-600/20 text-green-400" :
    color === "purple" ? "bg-purple-600/20 text-purple-400" :
    color === "orange" ? "bg-orange-600/20 text-orange-400" : "" // Added orange color
  }`;

  // Classes for the button's background and border, dynamically set based on the 'color' prop
  const buttonBgClasses = `
    ${color === "blue" ? "bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30" : ""}
    ${color === "green" ? "bg-green-500/10 hover:bg-green-500/20 border border-green-500/30" : ""}
    ${color === "purple" ? "bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30" : ""}
    ${color === "orange" ? "bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30" : ""} // Added orange color
  `;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${buttonBgClasses} flex-grow`}
    >
      {/* Icon container with dynamic background color */}
      <div className={iconBgClasses}>
        {icon}
      </div>
      {/* Text content for the button (label and description) */}
      <div className="flex flex-col items-start">
        <span className="font-bold text-xl mb-1">{label}</span>
        <span className="text-gray-300 text-sm">{description}</span> {/* Display description */}
      </div>
    </button>
  );
};

export default RoleSelectionModal;
