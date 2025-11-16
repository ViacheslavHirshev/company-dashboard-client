import { useQuery } from "@tanstack/react-query";
import Button from "../../ui/buttons/Button";
import CustomError from "../../ui/CustomError";
import Loader from "../../ui/loader/Loader";
import PageLimit from "../../ui/PageLimit";
import CompanyList from "../companies/companyList/CompanyList";
import { useState } from "react";
import { getAllCompaniesDashboard } from "../../api/services/userService";
import { NoData } from "../../ui/NoData";

export function Companies() {
  const [args, setArgs] = useState({
    page: 1,
    limit: 5,
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["companiesAll", args],
    queryFn: () => getAllCompaniesDashboard(args),
  });

  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setArgs((prev) => ({ ...prev, limit: Number(e.target.value) }));
  }

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return !data?.companies.length ? (
    <NoData message="No companies were added yet" />
  ) : (
    <div>
      <div>Registered companies: {data.totalCount}</div>
      <PageLimit limit={args.limit} setLimit={handleLimitChange} />
      <CompanyList companies={data.companies} />
      <div>
        {args.page > 1 && (
          <Button
            onClickHandler={() =>
              setArgs((prev) => ({ ...prev, page: args.page - 1 }))
            }
          >
            Prev
          </Button>
        )}
        <span>
          {data.currentPage} of {data.totalPages}
        </span>
        {args.page < data.totalPages && (
          <Button
            onClickHandler={() =>
              setArgs((prev) => ({ ...prev, page: args.page + 1 }))
            }
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
