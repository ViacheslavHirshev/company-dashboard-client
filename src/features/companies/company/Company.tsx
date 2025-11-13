import { Link } from "react-router";
import { TCompany } from "../../../types";

import styles from "./Company.module.css";

type TCompanyProps = {
  company: Partial<TCompany>;
  orderIndex: number;
};

function Company({ company, orderIndex }: TCompanyProps) {
  return (
    <Link to={`/companies/${company.id}`}>
      <li className={styles.company}>
        <div>{orderIndex}.</div>
        <div>{company.name}</div>
        <div>{company.service}</div>
        <div>{company.capital}</div>
      </li>
    </Link>
  );
}

export default Company;
