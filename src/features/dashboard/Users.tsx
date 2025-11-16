import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllUsers } from "../../api/services/userService";
import Loader from "../../ui/loader/Loader";
import CustomError from "../../ui/CustomError";
import PageLimit from "../../ui/PageLimit";
import { User } from "./User";
import Button from "../../ui/buttons/Button";
import { NoData } from "../../ui/NoData";

export function Users() {
  const [args, setArgs] = useState({
    page: 1,
    limit: 5,
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users", args],
    queryFn: () => getAllUsers(args),
  });

  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setArgs((prev) => ({ ...prev, limit: Number(e.target.value) }));
  }

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return !data.users.length ? (
    <NoData message="No users registered yet" />
  ) : (
    <div>
      <div>Users registered: {data.totalCount}</div>
      <PageLimit limit={args.limit} setLimit={handleLimitChange} />
      {data.users.map((user) => (
        <User key={user.id} user={user} />
      ))}
      <div>
        {args.page > 1 && (
          <Button
            onClickHandler={() =>
              setArgs((prev) => ({ ...prev, page: args.page - 1 }))
            }
          >
            Prev
          </Button>
        )}
        <span>
          {data.currentPage} of {data.totalPages}
        </span>
        {args.page < data.totalPages && (
          <Button
            onClickHandler={() =>
              setArgs((prev) => ({ ...prev, page: args.page + 1 }))
            }
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
