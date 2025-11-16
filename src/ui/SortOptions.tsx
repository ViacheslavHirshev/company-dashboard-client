import PageLimit from "./PageLimit";

type TSortOptionsProps = {
  sortByValue: string | undefined;
  sortOrderValue: string | undefined;
  limit: number | undefined;
  handleSortByChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SortOptions({
  sortByValue,
  sortOrderValue,
  limit,
  handleSortByChange,
  handleSortOrderChange,
  handleLimitChange,
}: TSortOptionsProps) {
  return (
    <div>
      <div>
        <label>Sort by:</label>
        <select value={sortByValue || ""} onChange={handleSortByChange}>
          <option value="">No options</option>
          <option value="company_name">Name</option>
          <option value="service">Service</option>
        </select>
      </div>

      <div>
        <label>Order:</label>
        <select value={sortOrderValue || ""} onChange={handleSortOrderChange}>
          <option value="">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <PageLimit limit={limit || 5} setLimit={handleLimitChange} />
    </div>
  );
}
