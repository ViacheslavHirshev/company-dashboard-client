import { useQuery } from "@tanstack/react-query";
import Button from "../../../ui/buttons/Button";
import CustomError from "../../../ui/errors/CustomError";
import Loader from "../../../ui/loader/Loader";
import PageLimit from "../../../ui/pageLimit/PageLimit";
import CompanyList from "../../companies/companyList/CompanyList";
import { useState } from "react";
import { getAllCompaniesDashboard } from "../../../api/services/userService";
import { NoData } from "../../../ui/errors/NoData";

import styles from "./Companies.module.css";

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

  return (
    <div className={styles.companiesContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Registered companies: {data?.totalCount || 0}
        </h3>
        <PageLimit limit={args.limit} setLimit={handleLimitChange} />
      </div>

      <div className={styles.content}>
        {!data?.companies.length ? (
          <NoData message="No companies were added yet" />
        ) : (
          <>
            <CompanyList companies={data.companies} className={styles.list} />

            <div className={styles.pagination}>
              <span className={styles.paginationText}>
                {data.currentPage} of {data.totalPages}
              </span>

              {args.page > 1 && (
                <Button
                  style="secondary"
                  onClickHandler={() =>
                    setArgs((prev) => ({ ...prev, page: args.page - 1 }))
                  }
                >
                  Prev
                </Button>
              )}

              {args.page < data.totalPages && (
                <Button
                  style="secondary"
                  onClickHandler={() =>
                    setArgs((prev) => ({ ...prev, page: args.page + 1 }))
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
