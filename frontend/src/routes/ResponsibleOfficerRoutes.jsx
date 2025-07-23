import { Routes, Route } from "react-router-dom";
import ResponsibleOfficerDashboard from "../pages/ResponsibleOfficer/Dashboard";
import Reports from "../pages/ResponsibleOfficer/Reports";
export default function ResponsibleOfficerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ResponsibleOfficerDashboard />} />
      <Route path="reports" element={<Reports />} />      {/* Add more responsible officer routes here */}
    </Routes>
  );
}
