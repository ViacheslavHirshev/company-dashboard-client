import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { adminGetCompany } from "../../../api/services/userService";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/errors/CustomError";
import Button from "../../../ui/buttons/Button";
import { normalizeDate } from "../../../utils/normalizeDate";

import styles from "./CompanyInfoAdmin.module.css";

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
    <div className={styles.pageContainer}>
      <Button
        className={styles.backButton}
        style="secondary"
        type="button"
        onClickHandler={() => navigate(-1)}
      >
        &larr;
      </Button>
      <div className={styles.companyCard}>
        <div className={styles.logoContainer}>
          <img src={data.company.logoPath} alt="Company logo img" />
        </div>

        <p className={styles.companyName}>{data.company.name}</p>

        <p className={styles.infoItem}>
          <span>Created:</span>
          <span>{normalizeDate(data.company.createdAt)}</span>
        </p>

        <p className={styles.infoItem}>
          <span>Type of service:</span>
          <span>{data.company.service}</span>
        </p>

        <p className={styles.infoItem}>
          <span>Capital:</span>
          <span>{data.company.capital}</span>
        </p>

        <p className={styles.infoItem}>
          <span>Address:</span>
          <span>{data.company.address}</span>
        </p>

        <p className={styles.infoItem}>
          <span>Owner:</span>
          <span>
            {data.company.owner.firstName} {data.company.owner.lastName}
          </span>
        </p>
      </div>
    </div>
  );
}
