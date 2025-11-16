import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/buttons/Button";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/services/userService";

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
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => console.log(error),
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    if (data.newPassword !== data.newPasswordRepeated) {
      throw new Error("Passwords are not same");
    }
    mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="curPswrd">Old password:</label>
          <input id="curPswrd" type="text" {...register("currentPassword")} />
        </div>

        <div>
          <label htmlFor="newPswrd">New password:</label>
          <input id="newPswrd" type="text" {...register("newPassword")} />
        </div>

        <div>
          <label htmlFor="repPswrd">Repeat password:</label>
          <input
            id="repPswrd"
            type="text"
            {...register("newPasswordRepeated")}
          />
        </div>

        <div>
          <Button onClickHandler={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
