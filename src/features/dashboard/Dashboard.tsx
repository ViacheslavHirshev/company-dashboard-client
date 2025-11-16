import { useRoleContext } from "../../context/RoleProvider";
import { Admins } from "./adminsPanel/Admins";
import { Companies } from "./companiesPanel/Companies";
import { UserDashboard } from "./userDashboard/UserDashboard";
import { Users } from "./usersPanel/Users";

import styles from "./Dashboard.module.css"

function Dashboard() {
  const { role } = useRoleContext();

  if (role === "user") {
    return <UserDashboard />;
  }

  return (
    <div className={styles.dashboardLayout}>
      <Users />
      <Companies />
      {role === "superadmin" && <Admins />}
    </div>
  );
}

export default Dashboard;
