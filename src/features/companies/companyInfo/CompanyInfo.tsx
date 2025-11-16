import { useRoleContext } from "../../../context/RoleProvider";
import { CompanyInfoUser } from "../companyInfoUser/CompanyInfoUser";
import { CompanyInfoAdmin } from "../companyInfoAdmin/CompanyInfoAdmin";

export function CompanyInfo() {
  const { role } = useRoleContext();

  return role === "user" ? <CompanyInfoUser /> : <CompanyInfoAdmin />;
}
