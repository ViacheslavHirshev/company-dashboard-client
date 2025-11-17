import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../ui/buttons/Button";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../../api/services/userService";

import styles from "./ChangePassword.module.css";
import toast from "react-hot-toast";

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  newPasswordRepeated: string;
};

function ChangePassword() {
  const { register, handleSubmit } = useForm<ChangePasswordForm>();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed");
      navigate(-1);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    if (data.newPassword !== data.newPasswordRepeated) {
      toast.error("Passwords don't match");
      return;
    }

    mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className={styles.passwordContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Change Password</h2>
        <div className={styles.formGroup}>
          <label htmlFor="curPswrd">Current password:</label>
          <input
            id="curPswrd"
            type="password"
            minLength={4}
            {...register("currentPassword", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPswrd">New password:</label>
          <input
            id="newPswrd"
            type="password"
            minLength={4}
            {...register("newPassword", { required: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="repPswrd">Repeat password:</label>
          <input
            id="repPswrd"
            type="password"
            minLength={4}
            {...register("newPasswordRepeated", { required: true })}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button style="secondary" onClickHandler={() => navigate(-1)}>
            Cancel
          </Button>
          <Button style="primary" type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
