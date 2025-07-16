import { Routes, Route } from "react-router-dom";
// import ResponsibleOfficerDashboard from "../pages/dashboard/ResponsibleOfficerDashboard";
export default function ResponsibleOfficerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ResponsibleOfficerDashboard />} />
      {/* Add more responsible officer routes here */}
    </Routes>
  );
}
