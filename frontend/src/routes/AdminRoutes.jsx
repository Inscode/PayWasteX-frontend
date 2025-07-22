import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminFeeStructure from "../pages/Admin/FeeStructure";
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="feestructure" element={<AdminFeeStructure />} />
      {/* Add more admin routes here */}
    </Routes>
  );
}
