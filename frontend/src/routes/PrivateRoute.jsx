import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, userRole }) => {
  if (!userRole) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/notfound" replace />;
  return <Outlet />;
};

export default PrivateRoute;
