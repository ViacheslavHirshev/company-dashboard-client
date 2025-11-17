import { SubmitHandler, useForm } from "react-hook-form";
import { TUpdateProfileData, TUser } from "../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../../api/services/userService";
import Modal from "../../../ui/modal/Modal";
import Button from "../../../ui/buttons/Button";

import styles from "./ChangeInfo.module.css";
import toast from "react-hot-toast";

type ChangeInfoProps = {
  onClose: () => void;
  user: Partial<TUser>;
};
export function ChangeInfo({ onClose, user }: ChangeInfoProps) {
  const { register, handleSubmit, reset } = useForm<TUpdateProfileData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["profile"], (oldData: { user: any }) => {
        if (!oldData) return;

        return {
          user: {
            ...oldData.user,
            ...updatedData.user,
          },
        };
      });

      setTimeout(() => toast.success("Info changed"), 1);
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

  const onSubmit: SubmitHandler<TUpdateProfileData> = (data) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h2 className={styles.header}>Change Info</h2>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            minLength={1}
            {...register("firstName")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            minLength={1}
            {...register("lastName")}
          />
        </div>

        <Button
          className={styles.submitButton}
          style="primary"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Submiting..." : "Submit"}
        </Button>
      </form>
    </Modal>
  );
}
