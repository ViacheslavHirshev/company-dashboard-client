import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getDashboardUser } from "../../../api/services/userService";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/CustomError";
import CompanyList from "../../companies/companyList/CompanyList";
import Button from "../../../ui/buttons/Button";
import { TGetCompaniesQueryArgs } from "../../../types";
import { useReducer } from "react";

type QueryState = Partial<TGetCompaniesQueryArgs>;

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

export function UserPanel() {
  const [queryState, dispatch] = useReducer(queryReducer, initialState);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["userDashboard", queryState],
    queryFn: () => getDashboardUser(queryState),
  });

  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "set_limit",
      payload: Number(e.target.value),
    });
  }

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  if (!data.companies.length) return <NoData />;

  return (
    <div>
      <div>
        <label>Limit:</label>
        <select value={queryState.limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

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

function NoData() {
  const navigate = useNavigate();

  function clickHandler() {
    navigate("/companies");
  }

  return (
    <div>
      <p>Looks like you don't have any companies yet 😥</p>
      <Button onClickHandler={clickHandler}>Add your first</Button>
    </div>
  );
}
