import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore, FaUserShield, FaUserCog } from "react-icons/fa";

const RoleSelectionModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    switch (role) {
      case "admin":
        navigate("/adminRegister");
        break;
      case "shopOwner":
        navigate("/shopOwnerRegister");
        break;
      case "responsibleOfficer":
        navigate("/responsibleOfficerRegister");
        break;
      default:
        break;
    }
    onClose();
  };

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[4px] transition-all">
      <div className="bg-green-600 rounded-2xl px-12 py-12 w-full max-w-xl mx-2 shadow-2xl flex flex-col items-center">
        <h2 className="text-white text-3xl font-extrabold text-center mb-10 tracking-wide drop-shadow-lg">
          Create Account As
        </h2>
        <div className="flex flex-col gap-7 w-full">
          <button
            onClick={() => handleSelect("admin")}
            className="flex items-center gap-4 bg-white hover:bg-green-100 transition text-green-800 text-2xl font-bold py-6 rounded-lg shadow-lg w-full justify-center"
          >
            <FaUserCog size={32} /> Admin
          </button>
          <button
            onClick={() => handleSelect("shopOwner")}
            className="flex items-center gap-4 bg-white hover:bg-green-100 transition text-green-800 text-2xl font-bold py-6 rounded-lg shadow-lg w-full justify-center"
          >
            <FaStore size={32} /> Store Owner
          </button>
          <button
            onClick={() => handleSelect("responsibleOfficer")}
            className="flex items-center gap-4 bg-white hover:bg-green-100 transition text-green-800 text-2xl font-bold py-6 rounded-lg shadow-lg w-full justify-center"
          >
            <FaUserShield size={32} /> Responsible Officer
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-10 block w-full text-white text-lg underline hover:text-gray-200 text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
