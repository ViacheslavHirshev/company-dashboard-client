import { useRoleContext } from "../context/RoleProvider";
import { Navigate, Outlet } from "react-router";

type TProtectedRouteProps = {
  allowedRoles: string[];
};

function ProtectedRoute({ allowedRoles }: TProtectedRouteProps) {
  const { role } = useRoleContext();

  if (!role || !allowedRoles.includes(role))
    return <Navigate to="/sign-in" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
