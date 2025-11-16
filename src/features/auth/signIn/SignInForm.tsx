import { SubmitHandler, useForm } from "react-hook-form";
import { TSignInFormInput } from "../../../types";
import { signIn } from "../../../api/services/authService";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../../../hooks/localStorage";
import { useRoleContext } from "../../../context/RoleProvider";
import Button from "../../../ui/buttons/Button";

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInFormInput>();
  const navigate = useNavigate();

  const { writeLocal, clearLocal } = useLocalStorage();
  const { setRole } = useRoleContext();

  const onSubmit: SubmitHandler<TSignInFormInput> = async (data) => {
    try {
      const { userRole, tokens } = await signIn(data);

      clearLocal();
      writeLocal(
        { key: "accessToken", value: tokens.accessToken },
        { key: "refreshToken", value: tokens.refreshToken }
      );

      setRole(userRole);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email", { required: true })}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          {...register("password", { required: true })}
        />
      </div>

      <Button type="submit">Sign-in</Button>
    </form>
  );
}

export default SignInForm;
