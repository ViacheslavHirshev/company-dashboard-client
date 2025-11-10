import { Navigate, Outlet } from "react-router";

type TProtectedRouteProps = {
  allowedRoles: string[];
};

function ProtectedRoute({ allowedRoles }: TProtectedRouteProps) {
  const role = localStorage.getItem("userRole");
  const authToken = localStorage.getItem("authToken");

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  if (!authToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
