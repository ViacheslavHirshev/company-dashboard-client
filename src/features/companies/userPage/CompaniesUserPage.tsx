import { useReducer, useState } from "react";
import { getCompaniesUser } from "../../../api/services/userService";
import CustomError from "../../../ui/CustomError";
import Loader from "../../../ui/loader/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../../ui/buttons/Button";
import CompanyList from "../companyList/CompanyList";
import NewCompanyModal from "../newCompanyModal/NewCompanyModal";
import { TGetCompaniesQueryArgs } from "../../../types";

type QueryState = TGetCompaniesQueryArgs;

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

export function CompaniesUserPage() {
  const queryClient = useQueryClient();

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
    queryFn: () => getCompaniesUser(queryState),
  });

  async function handleCompanyAdded() {
    setIsModalOpen(false);
    await queryClient.invalidateQueries({ queryKey: ["companies"] });
  }

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
      <div>
        <SortOptions
          queryState={queryState}
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
      <div>
        <Button onClickHandler={() => setIsModalOpen(true)}>New Company</Button>
        {isModalOpen && (
          <NewCompanyModal
            onClose={() => setIsModalOpen(false)}
            onAdded={handleCompanyAdded}
          />
        )}
      </div>
    </div>
  );
}

type TSortOptionsProps = {
  queryState: QueryState;
  handleSortByChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
function SortOptions({
  queryState,
  handleSortByChange,
  handleSortOrderChange,
  handleLimitChange,
}: TSortOptionsProps) {
  return (
    <div>
      <div>
        <label>Sort by:</label>
        <select value={queryState.sortBy || ""} onChange={handleSortByChange}>
          <option value="">No options</option>
          <option value="company_name">Name</option>
          <option value="service">Service</option>
        </select>
      </div>

      <div>
        <label>Order:</label>
        <select
          value={queryState.sortOrder || ""}
          onChange={handleSortOrderChange}
        >
          <option value="">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div>
        <label>Limit:</label>
        <select value={queryState.limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
}

type TFiltersProps = {
  localFilters: {
    minCapital: string;
    maxCapital: string;
    startDate: string;
    endDate: string;
  };
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
};
function Filters({
  localFilters,
  handleFilterChange,
  handleApplyFilters,
  handleResetFilters,
}: TFiltersProps) {
  return (
    <div>
      <input
        type="text"
        name="minCapital"
        value={localFilters.minCapital}
        onChange={handleFilterChange}
        placeholder="Min Capital"
      />
      <input
        type="text"
        name="maxCapital"
        value={localFilters.maxCapital}
        onChange={handleFilterChange}
        placeholder="Max Capital"
      />
      <input
        type="text"
        name="startDate"
        value={localFilters.startDate}
        onChange={handleFilterChange}
        placeholder="Start date(yyyy-mm-dd)"
      />
      <input
        type="text"
        name="endDate"
        value={localFilters.endDate}
        onChange={handleFilterChange}
        placeholder="End date(yyyy-mm-dd)"
      />
      <Button onClickHandler={handleApplyFilters}>Застосувати</Button>
      <Button onClickHandler={handleResetFilters}>Скинути</Button>
    </div>
  );
}
