import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../ui/buttons/Button";
import { resetPassword } from "../../../api/services/authService";
import { useNavigate } from "react-router";

import styles from "./Reset.module.css";
import toast from "react-hot-toast";

type ResetForm = {
  email: string;
  newPassword: string;
};

function Reset() {
  const { register, handleSubmit } = useForm<ResetForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetForm> = async (data) => {
    try {
      const result = await resetPassword(data);
      console.log(result.message);
      setTimeout(() => toast.success("Password was reset"), 2);
      navigate("/sign-in", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.resetContainer}>
      <form className={styles.resetForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.inputField}
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">New password</label>
          <input
            className={styles.inputField}
            id="newPassword"
            type="password"
            minLength={4}
            {...register("newPassword", { required: true })}
          />
        </div>

        <div className={styles.btnContainer}>
          <Button style="primary" type="submit">
            Reset
          </Button>

          <Button
            style="danger"
            onClickHandler={() => navigate("/sign-in", { replace: true })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Reset;
