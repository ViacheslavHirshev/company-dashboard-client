import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllAdmins } from "../../../api/services/userService";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/errors/CustomError";
import Button from "../../../ui/buttons/Button";
import { NoData } from "../../../ui/errors/NoData";
import PageLimit from "../../../ui/pageLimit/PageLimit";
import { AddAdmin } from "../addAdmin/AddAdmin";
import { User } from "../usersPanel/User";

import styles from "./Admins.module.css";

export function Admins() {
  const [args, setArgs] = useState({
    page: 1,
    limit: 5,
  });
  const [isModal, setIsModal] = useState(false);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["admins", args],
    queryFn: () => getAllAdmins(args),
  });

  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setArgs((prev) => ({ ...prev, limit: Number(e.target.value) }));
  }

  if (isPending) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return (
    <div className={styles.adminsContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Admins ({data.totalCount || 0})</h3>
        <div className={styles.headerControls}>
          <PageLimit limit={args.limit} setLimit={handleLimitChange} />
          <Button style="primary" onClickHandler={() => setIsModal(true)}>
            Add admin
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        {!data.users.length ? (
          <NoData message="No admins yet" />
        ) : (
          <>
            <ul className={styles.list}>
              {data.users.map((user) => (
                <User key={user.id} user={user} />
              ))}
            </ul>

            <div className={styles.pagination}>
              <span className={styles.paginationText}>
                {data.currentPage} of {data.totalPages}
              </span>

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

      {isModal && <AddAdmin onClose={() => setIsModal(false)} />}
    </div>
  );
}
