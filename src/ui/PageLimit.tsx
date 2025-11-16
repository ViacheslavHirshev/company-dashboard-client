type TPageLimit = {
  limit: number;
  setLimit(e: React.ChangeEvent<HTMLSelectElement>): void;
};

function PageLimit({ limit, setLimit }: TPageLimit) {
  return (
    <div>
      <label>Limit:</label>
      <select value={limit} onChange={setLimit}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
  );
}

export default PageLimit;
