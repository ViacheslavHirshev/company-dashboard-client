import { useRoleContext } from "../context/RoleProvider";
import { Navigate, Outlet } from "react-router";
import Forbidden from "./Forbidden";

type TProtectedRouteProps = {
  allowedRoles: string[];
};

function ProtectedRoute({ allowedRoles }: TProtectedRouteProps) {
  const { role } = useRoleContext();

  if (!role) return <Navigate to="/sign-in" replace />;
  if (!allowedRoles.includes(role)) return <Forbidden />;

  return <Outlet />;
}

export default ProtectedRoute;
