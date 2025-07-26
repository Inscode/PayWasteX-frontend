import { Routes, Route } from "react-router-dom";

import ShopOwnerDashboard from "../pages/ShopOwner/Dashboard";
import BillingHistory from "../pages/ShopOwner/BillingHistory";
export default function ShopOwnerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ShopOwnerDashboard />} />
      <Route path ="bills" element={<BillingHistory />} />
      {/* Add more shop owner routes here */}
    </Routes>
  );
}
