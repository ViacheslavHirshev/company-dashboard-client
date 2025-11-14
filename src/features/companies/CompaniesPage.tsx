import { useRoleContext } from "../../context/RoleProvider";
import { CompaniesUserPage } from "./userPage/CompaniesUserPage";

export function CompaniesPage() {
  const { role } = useRoleContext();

  return (
    <div>{role === "user" ? <CompaniesUserPage /> : <AdminCompanies />}</div>
  );
}

function AdminCompanies() {
  return <div>Admin companies</div>;
}
