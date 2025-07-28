import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminFeeStructure from "../pages/Admin/FeeStructure";
import AdminAuditLogs from "../pages/Admin/AuditLogs";
import AdminSystemSettings from "../pages/Admin/SystemSettings";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="userManagement" element={<AdminDashboard />} />
      <Route path="feestructure" element={<AdminFeeStructure />} />
      <Route path="auditlogs" element={<AdminAuditLogs />} />
      <Route path="systemsettings" element={<AdminSystemSettings />} />
      {/* Add more admin routes here */}
    </Routes>
  );
}
