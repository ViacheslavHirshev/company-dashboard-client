import { TCompany } from "../../../types";
import Company from "../company/Company";

type TCompaniesListProps = {
  companies: Partial<TCompany>[];
  className?: string;
};

function CompanyList({ companies, className = "" }: TCompaniesListProps) {
  return (
    <ul className={className}>
      {companies.map((company) => (
        <Company key={company.id} company={company} />
      ))}
    </ul>
  );
}

export default CompanyList;
