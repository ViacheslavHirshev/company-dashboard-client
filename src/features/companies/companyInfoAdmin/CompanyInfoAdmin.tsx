import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { adminGetCompany } from "../../../api/services/userService";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/errors/CustomError";
import Button from "../../../ui/buttons/Button";
import { normalizeDate } from "../../../utils/normalizeDate";

export function CompanyInfoAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["companyAdmin", id],
    queryFn: () => adminGetCompany(id!),
  });

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return (
    <div>
      <Button type="button" onClickHandler={() => navigate(-1)}>
        &larr;
      </Button>
      <div>
        <img src={data.company.logoPath} alt="Company logo img" />
      </div>
      <p>{data.company.name}</p>
      <p>Created: {normalizeDate(data.company.createdAt)}</p>
      <p>Type of service: {data.company.service}</p>
      <p>Capital: {data.company.capital}</p>
      <p>Address: {data.company.address}</p>
      <p>
        Owner: {data.company.owner.firstName} {data.company.owner.lastName}
      </p>
    </div>
  );
}
