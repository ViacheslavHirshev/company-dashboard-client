import { useQuery } from "@tanstack/react-query";
import { userGetDashboard } from "../../api/services/userService";
import Loader from "../../ui/loader/Loader";
import CustomError from "../../ui/CustomError";
import CompanyList from "../companies/companyList/CompanyList";
import Button from "../../ui/buttons/Button";
import { TGetCompaniesArgs } from "../../types";
import { useReducer } from "react";
import { NoData } from "../../ui/NoData";
import PageLimit from "../../ui/PageLimit";
import { useNavigate } from "react-router";

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
    <div>
      <div>Companies you have: {data.companiesNumber}</div>
      <div>Total capital: {data.totalCapital._sum.capital}</div>

      <PageLimit limit={queryState.limit || 5} setLimit={handleLimitChange} />

      <CompanyList companies={data.companies} />
      <div>
        {data.currentPage > 1 && (
          <Button
            onClickHandler={() =>
              dispatch({ type: "set_page", payload: data.currentPage - 1 })
            }
          >
            Prev
          </Button>
        )}
        <span>{`Page ${data.currentPage} from ${data.totalPages}`}</span>
        {data.currentPage < data.totalPages && (
          <Button
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
