import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getDashboardUser } from "../../../api/services/userService";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/CustomError";
import CompanyList from "../../companies/companyList/CompanyList";
import Button from "../../../ui/buttons/Button";

function UserPanel() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["userDashboard"],
    queryFn: getDashboardUser,
  });

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  if (!data.companies.length) return <NoData />;

  return (
    <div>
      <CompanyList companies={data.companies} />
    </div>
  );
}

export default UserPanel;

function NoData() {
  const navigate = useNavigate();

  function clickHandler() {
    navigate("/companies");
  }

  return (
    <div>
      <p>Looks like you don't have any companies yet 😥</p>
      <Button onClickHandler={clickHandler}>Add your first</Button>
    </div>
  );
}
