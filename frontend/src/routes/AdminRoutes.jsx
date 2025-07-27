import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminFeeStructure from "../pages/Admin/FeeStructure";
import AdminAuditLogs from "../pages/Admin/AuditLogs";
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="userManagement" element={<AdminDashboard />} />
      <Route path="feestructure" element={<AdminFeeStructure />} />
      <Route path="auditlogs" element={<AdminAuditLogs />} />
      {/* Add more admin routes here */}
    </Routes>
  );
}
