import { TCompany } from "../../../types";
import Company from "../company/Company";

type TCompaniesListProps = {
  companies: Partial<TCompany>[];
};

function CompanyList({ companies }: TCompaniesListProps) {
  return (
    <ul>
      {companies.map((company) => (
        <Company key={company.id} company={company} />
      ))}
    </ul>
  );
}

export default CompanyList;
