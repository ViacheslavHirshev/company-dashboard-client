import { useNavigate, useParams } from "react-router";
import Button from "../../../ui/buttons/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/errors/CustomError";
import { deleteUser, getUserById } from "../../../api/services/userService";
import { useRoleContext } from "../../../context/RoleProvider";
import { useState } from "react";
import ChangeUser from "../changeUser/ChangeUser";

import styles from "./UserInfo.module.css";
import toast from "react-hot-toast";

export function UserInfo() {
  const { role } = useRoleContext();

  if (role === "user") {
    return <CustomError message="You can't access this page" />;
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!),
  });

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: () => deleteUser(id!),
    onSuccess: async () => {
      if (role === "superadmin") {
        await queryClient.invalidateQueries({ queryKey: ["admins"] });
      }

      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => toast.success("User deleted"));

      navigate("/dashboard");
    },
    onError: () => {
      console.log(error);
    },
  });

  if (isPending || isDeleting) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return (
    <div className={styles.pageContainer}>
      <Button
        className={styles.backButton}
        style="secondary"
        onClickHandler={() => navigate(-1)}
      >
        &larr;
      </Button>

      <div className={styles.userCard}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatarImage}
            src={data.user.avatar}
            alt="user avatar"
          />
        </div>

        <p className={styles.userName}>
          {`${data.user.firstName} ${data.user.lastName}`}
        </p>
        <p className={styles.userEmail}>{data.user.email}</p>

        <div className={styles.btnsContainer}>
          <Button style="primary" onClickHandler={() => setIsModal(true)}>
            Change info
          </Button>
          <Button style="danger" onClickHandler={() => mutate()}>
            Delete user
          </Button>
        </div>
      </div>

      {isModal && <ChangeUser id={id!} onClose={() => setIsModal(false)} />}
    </div>
  );
}

export default UserInfo;
