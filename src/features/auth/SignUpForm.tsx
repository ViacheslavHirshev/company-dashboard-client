import { useForm, SubmitHandler } from "react-hook-form";
import { TSignUpFormInput } from "../../types";
import { signUp } from "../../api/services/authService";
import { useNavigate } from "react-router";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TSignUpFormInput> = async (data) => {
    try {
      const { message } = await signUp(data);
      navigate("/sign-in");
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
        <label htmlFor="firstName">First name</label>
        <input id="firstName" {...register("firstName")} />
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>
        <input id="lastName" {...register("lastName")} />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" {...register("password")} />
      </div>

      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUpForm;
