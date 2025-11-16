import { useRoleContext } from "../../context/RoleProvider";
import { Admins } from "./adminsPanel/Admins";
import { Companies } from "./companiesPanel/Companies";
import { UserDashboard } from "./userDashboard/UserDashboard";
import { Users } from "./usersPanel/Users";

function Dashboard() {
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

export default Dashboard;
