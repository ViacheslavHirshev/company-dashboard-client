import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../../ui/modal/Modal";
import Button from "../../../ui/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdmin } from "../../../api/services/userService";

type NewAdminForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type NewAdminProps = {
  onClose: () => void;
};

export function AddAdmin({ onClose }: NewAdminProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewAdminForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: addAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      reset();
      onClose();
    },
    onError: () => {},
  });

  const onSubmit: SubmitHandler<NewAdminForm> = (data) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" {...register("firstName")} />
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" {...register("lastName")} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" {...register("password")} />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Submit"}
        </Button>
      </form>
    </Modal>
  );
}
