import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../../ui/modal/Modal";
import Button from "../../../ui/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdmin } from "../../../api/services/userService";

import styles from "./AddAdmin.module.css";
import toast from "react-hot-toast";

type NewAdminForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type NewAdminProps = {
  onClose: () => void;
};

export function AddAdmin({ onClose }: NewAdminProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<NewAdminForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: addAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admins"] });
      setTimeout(() => toast.success("Admin added"), 1);
      reset();
      onClose();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<NewAdminForm> = (data) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h2 className={styles.header}>Add New Admin</h2>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            minLength={1}
            {...register("firstName", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            minLength={1}
            {...register("lastName", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            minLength={4}
            {...register("password", { required: true })}
          />
        </div>

        <Button
          className={styles.submitButton}
          type="submit"
          disabled={isPending}
          style="primary"
        >
          {isPending ? "Adding..." : "Submit"}
        </Button>
      </form>
    </Modal>
  );
}
