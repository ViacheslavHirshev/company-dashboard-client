import { useQuery } from "@tanstack/react-query";
import { userGetDashboard } from "../../../api/services/userService";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/errors/CustomError";
import CompanyList from "../../companies/companyList/CompanyList";
import Button from "../../../ui/buttons/Button";
import { TGetCompaniesArgs } from "../../../types";
import { useReducer } from "react";
import { NoData } from "../../../ui/errors/NoData";
import PageLimit from "../../../ui/pageLimit/PageLimit";
import { useNavigate } from "react-router";

import styles from "./UserDashboard.module.css";

type QueryState = Partial<TGetCompaniesArgs>;

type QueryAction =
  | { type: "set_page"; payload?: number }
  | { type: "set_limit"; payload?: number };

const initialState: QueryState = {
  page: 1,
  limit: 5,
};

function queryReducer(state: QueryState, action: QueryAction): QueryState {
  switch (action.type) {
    case "set_page":
      return { ...state, page: action.payload };
    case "set_limit":
      return { ...state, limit: action.payload };

    default:
      return { ...state };
  }
}

export function UserDashboard() {
  const [queryState, dispatch] = useReducer(queryReducer, initialState);
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["userDashboard", queryState],
    queryFn: () => userGetDashboard(queryState),
  });

  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "set_limit",
      payload: Number(e.target.value),
    });
  }

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  if (!data.companies.length)
    return (
      <NoData
        message="Looks like you don't have any companies yet"
        btnText="Add your first"
        clickHandler={() => navigate("/companies")}
      />
    );

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <span>Companies you have:</span>
            <span>{data.companiesNumber || 0}</span>
          </div>

          <div className={styles.statBox}>
            <span>Total capital:</span>
            <span>{data.totalCapital._sum.capital || 0}</span>
          </div>
        </div>

        <PageLimit limit={queryState.limit || 5} setLimit={handleLimitChange} />
      </div>

      <CompanyList className={styles.companyList} companies={data.companies} />

      <div className={styles.paginationContainer}>
        <span className={styles.paginationText}>
          {`Page ${data.currentPage} from ${data.totalPages}`}
        </span>
        {data.currentPage > 1 && (
          <Button
            style="secondary"
            onClickHandler={() =>
              dispatch({ type: "set_page", payload: data.currentPage - 1 })
            }
          >
            Prev
          </Button>
        )}
        {data.currentPage < data.totalPages && (
          <Button
            style="secondary"
            onClickHandler={() =>
              dispatch({ type: "set_page", payload: data.currentPage + 1 })
            }
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
