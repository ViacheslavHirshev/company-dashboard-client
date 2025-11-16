import Button from "./buttons/Button";

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
      <Button onClickHandler={handleApplyFilters}>Apply</Button>
      <Button onClickHandler={handleResetFilters}>Reset</Button>
    </div>
  );
}
