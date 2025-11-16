import { useNavigate } from "react-router";
import { TCompany } from "../../../types";

import styles from "./Company.module.css";

type TCompanyProps = {
  company: Partial<TCompany>;
};

function Company({ company }: TCompanyProps) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/companies/${company.id}`)}
      className={styles.company}
    >
      <div>{company.name}</div>
      <div>{company.service}</div>
      <div>{company.capital}</div>
    </li>
  );
}

export default Company;
