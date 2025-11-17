import { useForm, SubmitHandler } from "react-hook-form";
import { TSignUpFormInput } from "../../../types";
import { signUp } from "../../../api/services/authService";
import { useNavigate } from "react-router";
import Button from "../../../ui/buttons/Button";

import styles from "./SignUpForm.module.css";
import toast from "react-hot-toast";

function SignUpForm() {
  const { register, handleSubmit } = useForm<TSignUpFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TSignUpFormInput> = async (data) => {
    // console.log(data);
    try {
      await signUp(data);
      setTimeout(() => toast.success("You successfully registered"));
      navigate("/sign-in", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
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
          minLength={1}
          {...register("firstName", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="lastName">Last name</label>
        <input
          className={styles.inputField}
          id="lastName"
          minLength={1}
          {...register("lastName", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.inputField}
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.inputField}
          type="password"
          id="password"
          minLength={4}
          {...register("password", { required: true })}
        />
      </div>

      <Button style="primary" type="submit">
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;
