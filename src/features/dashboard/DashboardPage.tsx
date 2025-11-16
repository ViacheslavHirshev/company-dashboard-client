import { useRoleContext } from "../../context/RoleProvider";
import { Admins } from "./Admins";
import { Companies } from "./Companies";
import { UserDashboard } from "./UserDashboard";
import { Users } from "./Users";

function DashboardPage() {
  const { role } = useRoleContext();

  if (role === "user") {
    return <UserDashboard />;
  }

  return (
    <>
      <Users />
      <Companies />
      {role === "superadmin" && <Admins />}
    </>
  );
}

export default DashboardPage;
