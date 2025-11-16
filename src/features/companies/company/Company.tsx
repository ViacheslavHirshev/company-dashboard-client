import { Link } from "react-router";
import { TCompany } from "../../../types";

import styles from "./Company.module.css";

type TCompanyProps = {
  company: Partial<TCompany>;
};

function Company({ company }: TCompanyProps) {
  return (
    <Link to={`/companies/${company.id}`}>
      <li className={styles.company}>
        <div>{company.name}</div>
        <div>{company.service}</div>
        <div>{company.capital}</div>
      </li>
    </Link>
  );
}

export default Company;
