import { Routes, Route } from "react-router-dom";
import ResponsibleOfficerDashboard from "../pages/ResponsibleOfficer/Dashboard";
import Reports from "../pages/ResponsibleOfficer/Reports";
import BillManagement from "../pages/ResponsibleOfficer/BillManagement";
import PaymentConfirmation from "../pages/ResponsibleOfficer/PaymentConfirmation";
export default function ResponsibleOfficerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ResponsibleOfficerDashboard />} />
      <Route path="reports" element={<Reports />} />   
      <Route path="billmanagement" element={<BillManagement />} />
      <Route path="paymentconfirmation" element={<PaymentConfirmation />} />
      
      
        {/* Add more responsible officer routes here */}
    </Routes>
  );
}
