import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Shop Owner", value: "shopOwner" },
  { label: "Responsible Officer", value: "responsibleOfficer" },
  { label: "Fee Collector", value: "feeCollector" },
];

export default function Login() {
  const [role, setRole] = useState(roles[0].value);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: "User", role });
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-xl flex flex-col gap-4">
        <h2 className="text-2xl font-bold">PayWasteX Login</h2>
        <label className="block">
          Select Role:
          <select value={role} onChange={e => setRole(e.target.value)} className="ml-2 border p-2 rounded">
            {roles.map(r => (
              <option value={r.value} key={r.value}>{r.label}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
}
