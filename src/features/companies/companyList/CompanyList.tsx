import { TCompany } from "../../../types";
import Company from "../company/Company";

type TCompaniesListProps = {
  companies: Partial<TCompany>[];
};

function CompanyList({ companies }: TCompaniesListProps) {
  return (
    <ul>
      {companies.map((company, index) => (
        <Company key={company.id} company={company} orderIndex={index + 1} />
      ))}
    </ul>
  );
}

export default CompanyList;
