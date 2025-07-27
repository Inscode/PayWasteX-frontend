import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoutes from "./routes/AdminRoutes";
import ShopOwnerRoutes from "./routes/ShopOwnerRoutes";
import ResponsibleOfficerRoutes from "./routes/ResponsibleOfficerRoutes";
import FeeCollectorRoutes from "./routes/FeeCollectorRoutes";
import AdminRegister from "./pages/Register/AdminRegister";
import ShopOwnerRegister from "./pages/Register/ShopOwnerRegister";
import ResponsibleOfficerRegister from "./pages/Register/ResponsibleOfficerRegister";
import { LanguageProvider } from  "./contexts/LanguageContext"

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/adminRegister/" element={<AdminRegister />} />
      <Route path="/shopOwnerRegister" element={<ShopOwnerRegister />} />
      <Route path="/responsibleOfficerRegister" element={<ResponsibleOfficerRegister />} />

      <Route
        element={
          <PrivateRoute
            allowedRoles={["ADMIN", "SHOPOWNER", "RESPONSIBLEOFFICER", "FEECOLLECTOR"]}
            userRole={user?.role}
          />
        }
      >
        <Route element={<AppLayout />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/shopOwner/*" element={<ShopOwnerRoutes />} />
          <Route path="/responsibleOfficer/*" element={<ResponsibleOfficerRoutes />} />
          <Route path="/feeCollector/*" element={<FeeCollectorRoutes />} />
        </Route>
      </Route>
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
