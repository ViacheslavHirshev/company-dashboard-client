import { useReducer, useState } from "react";
import {
  adminGetCompanies,
  userGetCompanies,
} from "../../api/services/userService";
import CustomError from "../../ui/CustomError";
import Loader from "../../ui/loader/Loader";
import { useQuery } from "@tanstack/react-query";
import Button from "../../ui/buttons/Button";
import CompanyList from "./companyList/CompanyList";
import NewCompany from "./newCompany/NewCompany";
import { TGetCompaniesArgs } from "../../types";
import { useRoleContext } from "../../context/RoleProvider";
import { SortOptions } from "../../ui/SortOptions";
import { Filters } from "../../ui/Filters";
import { NoData } from "../../ui/NoData";

type QueryState = TGetCompaniesArgs;

type QueryAction =
  | { type: "set_page"; payload?: number }
  | { type: "set_limit"; payload?: number }
  | {
      type: "set_sort";
      payload: {
        sortBy?: "company_name" | "service";
        sortOrder?: "asc" | "desc";
      };
    }
  | {
      type: "set_filters";
      payload: {
        minCapital?: number;
        maxCapital?: number;
        startDate?: string;
        endDate?: string;
      };
    }
  | { type: "reset_filters" };

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
    case "set_sort":
      return {
        ...state,
        ...action.payload,
        page: 1,
      };
    case "set_filters":
      return {
        ...state,
        ...action.payload,
        page: 1,
      };
    case "reset_filters": {
      return {
        page: 1,
        limit: state.limit,
      };
    }

    default:
      return { ...state };
  }
}

export function Companies() {
  const { role } = useRoleContext();

  const [queryState, dispatch] = useReducer(queryReducer, initialState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    minCapital: "",
    maxCapital: "",
    startDate: "",
    endDate: "",
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["companies", queryState],
    queryFn: () => {
      if (role === "user") {
        return userGetCompanies(queryState);
      } else {
        return adminGetCompanies(queryState);
      }
    },
  });

  function handleSortByChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "set_sort",
      payload: {
        sortBy: e.target.value as "company_name" | "service" | undefined,
      },
    });
  }

  function handleSortOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "set_sort",
      payload: { sortOrder: e.target.value as "asc" | "desc" | undefined },
    });
  }

  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "set_limit",
      payload: Number(e.target.value),
    });
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleApplyFilters() {
    dispatch({
      type: "set_filters",
      payload: {
        minCapital: localFilters.minCapital
          ? Number(localFilters.minCapital)
          : undefined,
        maxCapital: localFilters.maxCapital
          ? Number(localFilters.maxCapital)
          : undefined,
        startDate: localFilters.startDate || undefined,
        endDate: localFilters.endDate || undefined,
      },
    });
  }

  function handleResetFilters() {
    setLocalFilters({
      minCapital: "",
      maxCapital: "",
      startDate: "",
      endDate: "",
    });
    dispatch({ type: "reset_filters" });
  }

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return (
    <div>
      {!data.companies.length ? (
        <NoData message="No companies was added yet" />
      ) : (
        <div>
          <SortOptions
            sortByValue={queryState.sortBy}
            sortOrderValue={queryState.sortOrder}
            limit={queryState.limit}
            handleSortOrderChange={handleSortOrderChange}
            handleLimitChange={handleLimitChange}
            handleSortByChange={handleSortByChange}
          />
          <Filters
            localFilters={localFilters}
            handleApplyFilters={handleApplyFilters}
            handleFilterChange={handleFilterChange}
            handleResetFilters={handleResetFilters}
          />
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
      )}

      <div>
        {role === "user" && (
          <Button onClickHandler={() => setIsModalOpen(true)}>
            New Company
          </Button>
        )}
        {isModalOpen && <NewCompany onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}
