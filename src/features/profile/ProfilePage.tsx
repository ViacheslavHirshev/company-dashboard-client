import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserData,
  updateAvatar,
  updateUserData,
} from "../../api/services/userService";
import Loader from "../../ui/loader/Loader";
import CustomError from "../../ui/CustomError";
import Button from "../../ui/buttons/Button";
import { ChangeEvent, useRef, useState } from "react";
import {
  TGetUserDataResponse,
  TUpdateUserData,
  TUpdateUserResponse,
  TUser,
} from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../ui/modal/Modal";

export function ProfilePage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserData,
  });
  const queryClient = useQueryClient();

  const [isModal, setIsModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending: isUpdatingAvatar } = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["profile"], (oldData: TGetUserDataResponse) => {
        if (!oldData) return;

        return {
          ...oldData,
          user: {
            ...oldData.user,
            avatar: updatedData.avatarPath,
          },
        };
      });
    },
    onError: () => {},
  });

  function handleUpdateUserData(updatedData: TUpdateUserResponse) {
    queryClient.setQueryData(["profile"], (oldData: { user: any }) => {
      if (!oldData) return;

      return {
        user: {
          ...oldData.user,
          ...updatedData.user,
        },
      };
    });
    setIsModal(false);
  }

  function handleChangeAvatar() {
    inputRef.current?.click();
  }

  function handleSelectFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      mutate(formData);
    }
  }

  function handleDeleteAvatar() {
    if (window.confirm("Are you sure you want to delete avatar?")) {
      const formData = new FormData();
      formData.append("deleteAvatar", "true");
      mutate(formData);
    }
  }

  if (isPending || isUpdatingAvatar) return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleSelectFile}
        style={{ display: "none" }}
        accept="image/*"
      />

      <img src={data.user.avatar} />
      <div>
        <Button onClickHandler={handleChangeAvatar}>Change avatar</Button>
        <Button onClickHandler={handleDeleteAvatar}>Delete avatar</Button>
      </div>
      <div>
        <span>{data.user.firstName}</span>
        <span>{data.user.lastName}</span>
      </div>
      <div>{data.user.role}</div>
      <Button onClickHandler={() => setIsModal(true)}>Change info</Button>
      {isModal && (
        <UpdateProfileModal
          onClose={() => setIsModal(false)}
          onUpdated={handleUpdateUserData}
          user={data.user}
        />
      )}
    </div>
  );
}

type TUpdateProfileProps = {
  onClose: () => void;
  onUpdated: (updateData: TUpdateUserResponse) => void;
  user: Partial<TUser>;
};
function UpdateProfileModal({ onClose, onUpdated, user }: TUpdateProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUpdateUserData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (updatedData) => {
      reset();
      onUpdated(updatedData);
    },
    onError: () => {},
  });

  const onSubmit: SubmitHandler<TUpdateUserData> = (data) => {
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submiting..." : "Submit"}
        </Button>
      </form>
    </Modal>
  );
}
