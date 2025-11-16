import Button from "../buttons/Button";

import styles from "./Filters.module.css";

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

export function Filters({
  localFilters,
  handleFilterChange,
  handleApplyFilters,
  handleResetFilters,
}: TFiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.inputsContainer}>
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
      </div>
      <div className={styles.buttonGroup}>
        <Button style="primary" onClickHandler={handleApplyFilters}>
          Apply
        </Button>
        <Button style="secondary" onClickHandler={handleResetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
}
