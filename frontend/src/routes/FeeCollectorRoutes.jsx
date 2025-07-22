import { Routes, Route } from "react-router-dom";
import FeeCollectorDashboard from "../pages/FeeCollector/Dashboard";
export default function FeeCollectorRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<FeeCollectorDashboard />} />
      {/* Add more fee collector routes here */}
    </Routes>
  );
}
