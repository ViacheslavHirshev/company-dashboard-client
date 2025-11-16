import { useNavigate, useParams } from "react-router";
import Button from "../../../ui/buttons/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../ui/loader/Loader";
import CustomError from "../../../ui/errors/CustomError";
import { deleteUser, getUserById } from "../../../api/services/userService";
import { useRoleContext } from "../../../context/RoleProvider";
import { useState } from "react";
import ChangeUser from "../changeUser/ChangeUser";

export function UserInfo() {
  const { role } = useRoleContext();

  if (role === "user") {
    return <CustomError message="You can't access this page" />;
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!),
  });

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: () => deleteUser(id!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      if (role === "superadmin") {
        await queryClient.invalidateQueries({ queryKey: ["admins"] });
      }
      navigate("/dashboard");
    },
    onError: () => {
      console.log(error);
    },
  });

  if (isPending || isDeleting) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return (
    <div>
      <Button onClickHandler={() => navigate(-1)}>&larr;</Button>
      <img src={data.user.avatar} alt="user avatar" />
      <p>{`${data.user.firstName} ${data.user.lastName}`}</p>
      <p>{data.user.email}</p>
      <div>
        <Button onClickHandler={() => setIsModal(true)}>Change info</Button>
        <Button onClickHandler={() => mutate()}>Delete user</Button>
      </div>
      {isModal && <ChangeUser id={id!} onClose={() => setIsModal(false)} />}
    </div>
  );
}

export default UserInfo;
