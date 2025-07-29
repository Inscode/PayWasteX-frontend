import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminRegister from "./pages/Register/AdminRegister";
import ShopOwnerRegister from "./pages/Register/ShopOwnerRegister";
import ResponsibleOfficerRegister from "./pages/Register/ResponsibleOfficerRegister";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoutes from "./routes/AdminRoutes";
import ShopOwnerRoutes from "./routes/ShopOwnerRoutes";
import ResponsibleOfficerRoutes from "./routes/ResponsibleOfficerRoutes";
import FeeCollectorRoutes from "./routes/FeeCollectorRoutes";
import ReportRoutes from "./routes/ReportRoutes";

import AppLayout from "./layouts/AppLayout";
import AppLayoutWithoutRoleButtons from "./layouts/AppLayoutWithoutRoleButtons";

// Role-based route wrapper
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/adminRegister" element={<AdminRegister />} />
      <Route path="/shopOwnerRegister" element={<ShopOwnerRegister />} />
      <Route path="/responsibleOfficerRegister" element={<ResponsibleOfficerRegister />} />

      {/* Reports accessible only by specific roles */}
      <Route
        element={
          <PrivateRoute allowedRoles={["responsibleOfficer", "customer"]} userRole={user?.role} />
        }
      >
        <Route element={<AppLayoutWithoutRoleButtons />}>
          <Route path="/report/*" element={<ReportRoutes />} />
        </Route>
      </Route>

      {/* Main protected routes for all roles */}
      <Route
        element={
          <PrivateRoute
            allowedRoles={["ADMIN", "CUSTOMER", "RESPONSIBLEOFFICER", "FEECOLLECTOR"]}
            userRole={user?.role}
          />
        }
      >
        <Route element={<AppLayout />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/customer/*" element={<ShopOwnerRoutes />} />
          <Route path="/responsibleOfficer/*" element={<ResponsibleOfficerRoutes />} />
          <Route path="/feeCollector/*" element={<FeeCollectorRoutes />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppRoutes />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
