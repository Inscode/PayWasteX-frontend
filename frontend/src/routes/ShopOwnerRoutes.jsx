import { Routes, Route } from "react-router-dom";
// import ShopOwnerDashboard from "../pages/dashboard/ShopOwnerDashboard";
export default function ShopOwnerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ShopOwnerDashboard />} />
      {/* Add more shop owner routes here */}
    </Routes>
  );
}
