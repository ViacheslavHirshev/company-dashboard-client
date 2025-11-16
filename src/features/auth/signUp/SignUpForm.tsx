import { useForm, SubmitHandler } from "react-hook-form";
import { TSignUpFormInput } from "../../../types";
import { signUp } from "../../../api/services/authService";
import { useNavigate } from "react-router";
import Button from "../../../ui/buttons/Button";

import styles from "./SignUpForm.module.css";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TSignUpFormInput> = async (data) => {
    try {
      await signUp(data);
      navigate("/sign-in", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <label htmlFor="firstName">First name</label>
        <input
          className={styles.inputField}
          id="firstName"
          {...register("firstName")}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="lastName">Last name</label>
        <input
          className={styles.inputField}
          id="lastName"
          {...register("lastName")}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.inputField}
          type="email"
          id="email"
          {...register("email")}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.inputField}
          type="password"
          id="password"
          {...register("password")}
        />
      </div>

      <Button style="primary" type="submit">
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;
