import { Routes, Route } from "react-router-dom";
// import FeeCollectorDashboard from "../pages/dashboard/FeeCollectorDashboard";
export default function FeeCollectorRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<FeeCollectorDashboard />} />
      {/* Add more fee collector routes here */}
    </Routes>
  );
}
