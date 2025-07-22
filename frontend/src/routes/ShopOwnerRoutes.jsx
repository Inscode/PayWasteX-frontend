import { Routes, Route } from "react-router-dom";

import ShopOwnerDashboard from "../pages/ShopOwner/Dashboard";
import BillingHistory from "../pages/ShopOwner/BillingHistory";
import ReceiptPreview from "../pages/ShopOwner/ReceiptPreview";
export default function ShopOwnerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ShopOwnerDashboard />} />
      <Route path ="bills" element={<BillingHistory />} />
      <Route path="receipt-preview" element={<ReceiptPreview />} />

      {/* Add more shop owner routes here */}
    </Routes>
  );
}
