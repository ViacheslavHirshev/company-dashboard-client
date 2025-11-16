import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { changeUser } from "../../../api/services/userService";
import Modal from "../../../ui/modal/Modal";
import Button from "../../../ui/buttons/Button";

import styles from "./ChangeUser.module.css";

type ChangeUserForm = {
  firstName: string;
  lastName: string;
};

type ChangeUserProps = {
  id: string;
  onClose: () => void;
};
function ChangeUser({ id, onClose }: ChangeUserProps) {
  const { register, handleSubmit, reset } = useForm<ChangeUserForm>();

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: ChangeUserForm) => changeUser(id, data),
    onSuccess: (updatedData) => {
      reset();
      onClose();
      queryClient.setQueryData(["user", id], (oldData: { user: any }) => {
        if (!oldData) return;
        return {
          ...oldData,
          user: {
            ...oldData.user,
            firstName: updatedData.user.firstName,
            lastName: updatedData.user.lastName,
          },
        };
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<ChangeUserForm> = (data) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Change User Info</h2>
        <div className={styles.formGroup}>
          <label>First name</label>
          <input
            type="text"
            minLength={1}
            {...register("firstName", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Last name</label>
          <input
            type="text"
            minLength={1}
            {...register("lastName", { required: true })}
          />
        </div>

        <Button
          className={styles.submitButton}
          style="primary"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Changing..." : "Change"}
        </Button>
      </form>
    </Modal>
  );
}

export default ChangeUser;
