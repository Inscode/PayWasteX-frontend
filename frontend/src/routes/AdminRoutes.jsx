import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/Dashboard";
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      {/* Add more admin routes here */}
    </Routes>
  );
}
