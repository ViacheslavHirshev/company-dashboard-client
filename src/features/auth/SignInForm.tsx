import { SubmitHandler, useForm } from "react-hook-form";
import { TSignInFormInput } from "../../types";
import { signIn } from "../../api/services/authService";
import { useNavigate } from "react-router";
function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TSignInFormInput> = async (data) => {
    // event?.preventDefault();
    try {
      const { userData, tokens } = await signIn(data);
      console.log(tokens.refreshToken);

      localStorage.clear();
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("userRole", userData.role);

      switch (userData.role) {
        case "user":
          navigate("/dashboard", { replace: true });
          break;
        case "admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "superadmin":
          navigate("/superadmin/dashboard", { replace: true });
          break;

        default:
          navigate("/forbidden");
          break;
      }
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
        {/* {errors?.email?.type === "required" && <p>⚠️ Email is required</p>} */}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          {...register("password", { required: true })}
        />
        {/* {errors?.password?.type === "required" && (
          <p>⚠️ Password is required</p>
        )} */}
      </div>

      <button type="submit">Sign-in</button>
    </form>
  );
}

export default SignInForm;
