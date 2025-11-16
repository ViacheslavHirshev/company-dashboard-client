import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../ui/buttons/Button";
import { resetPassword } from "../../../api/services/authService";
import { useNavigate } from "react-router";

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
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
          <label htmlFor="password">New password</label>
          <input
            id="newPassword"
            type="text"
            {...register("newPassword", { required: true })}
          />
        </div>

        <div>
          <Button type="submit">Reset password</Button>
          <Button onClickHandler={() => navigate("/sign-in")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default Reset;
