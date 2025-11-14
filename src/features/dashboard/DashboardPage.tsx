import { useRoleContext } from "../../context/RoleProvider";
import AdminPanel from "./adminPanel/AdminPanel";
import { UserPanel } from "./userPanel/UserPanel";

function DashboardPage() {
  const { role } = useRoleContext();

  return <>{role === "user" ? <UserPanel /> : <AdminPanel />}</>;
}

export default DashboardPage;
