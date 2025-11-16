import { useQuery } from "@tanstack/react-query";
import { getAllAdmins } from "../../api/services/userService";
import Button from "../../ui/buttons/Button";
import CustomError from "../../ui/CustomError";
import Loader from "../../ui/loader/Loader";
import { NoData } from "../../ui/NoData";
import PageLimit from "../../ui/PageLimit";
import { useState } from "react";
import { User } from "./User";
import { NewAdmin } from "./NewAdmin";

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
    <div>
      <Button onClickHandler={() => setIsModal(true)}>Add admin</Button>
      {!data.users.length ? (
        <NoData message="No admins yet" />
      ) : (
        <div>
          <div>Number of admins: {data.totalCount}</div>
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
      )}
      {isModal && <NewAdmin onClose={() => setIsModal(false)} />}
    </div>
  );
}
