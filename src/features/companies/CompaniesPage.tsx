import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRoleContext } from "../../context/RoleProvider";
import { getCompaniesUser } from "../../api/services/userService";
import Loader from "../../ui/loader/Loader";
import CustomError from "../../ui/CustomError";
import CompanyList from "./companyList/CompanyList";
import Button from "../../ui/buttons/Button";
import { useState } from "react";
import NewCompanyModal from "./newCompanyModal/NewCompanyModal";

export function CompaniesPage() {
  const { role } = useRoleContext();

  return <div>{role === "user" ? <UserCompanies /> : <AdminCompanies />}</div>;
}

function UserCompanies() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompaniesUser,
  });

  function handleCompanyAdded() {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["companies"] });
  }

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return (
    <>
      <div>
        <Button onClickHandler={() => setIsModalOpen(true)}>New Company</Button>

        <CompanyList companies={data.companies} />
      </div>
      {isModalOpen && (
        <NewCompanyModal
          onClose={() => setIsModalOpen(false)}
          onAdded={handleCompanyAdded}
        />
      )}
    </>
  );
}

function AdminCompanies() {
  return <div>Admin companies</div>;
}
