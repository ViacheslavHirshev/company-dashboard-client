import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllUsers } from "../../../api/services/userService";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/errors/CustomError";
import PageLimit from "../../../ui/pageLimit/PageLimit";
import Button from "../../../ui/buttons/Button";
import { NoData } from "../../../ui/errors/NoData";
import { User } from "./User";

import styles from "./Users.module.css";

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

  return (
    <div className={styles.usersContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Users ({data.totalCount || 0})</h3>
        <PageLimit limit={args.limit} setLimit={handleLimitChange} />
      </div>

      <div className={styles.content}>
        {!data.users.length ? (
          <NoData message="No users registered yet" />
        ) : (
          <>
            <ul className={styles.list}>
              {data.users.map((user) => (
                <User key={user.id} user={user} />
              ))}
            </ul>

            <div className={styles.pagination}>
              {args.page > 1 && (
                <Button
                  style="secondary"
                  onClickHandler={() =>
                    setArgs((prev) => ({ ...prev, page: args.page - 1 }))
                  }
                >
                  Prev
                </Button>
              )}
              <span className={styles.paginationText}>
                {data.currentPage} of {data.totalPages}
              </span>
              {args.page < data.totalPages && (
                <Button
                  style="secondary"
                  onClickHandler={() =>
                    setArgs((prev) => ({ ...prev, page: args.page + 1 }))
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
