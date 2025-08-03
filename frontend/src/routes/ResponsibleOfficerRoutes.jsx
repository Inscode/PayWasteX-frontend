import { Routes, Route } from "react-router-dom";
import ResponsibleOfficerDashboard from "../pages/ResponsibleOfficer/Dashboard";
import Reports from "../pages/ResponsibleOfficer/Reports";
import BillManagement from "../pages/ResponsibleOfficer/BillManagement";
import DirectPayment from "../pages/ResponsibleOfficer/DirectPayment";
import Settings from "../pages/ResponsibleOfficer/Settings";
import CustomerDetails from "../pages/ResponsibleOfficer/CustomerDetails";
import ReportRoutes from "./ReportRoutes";
import AssignToCollect from "../pages/ResponsibleOfficer/AssignToCollect";
export default function ResponsibleOfficerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ResponsibleOfficerDashboard />} />
      <Route path="reports" element={<Reports />} />   
      <Route path="billmanagement" element={<BillManagement />} />
      <Route path="directpayments" element={<DirectPayment />} />
      <Route path="settings" element={<Settings />} />
      <Route path="customerdetails" element={<CustomerDetails />} />
      <Route path="reports/*" element={<ReportRoutes />} />
      <Route path="assigntocollect" element={<AssignToCollect />} />
      

      
      
        {/* Add more responsible officer routes here */}
    </Routes>
  );
}
