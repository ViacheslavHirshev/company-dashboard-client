import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateAvatar } from "../../api/services/userService";
import Loader from "../../ui/loader/Loader";
import CustomError from "../../ui/CustomError";
import Button from "../../ui/buttons/Button";
import { ChangeEvent, useRef, useState } from "react";
import { TGetProfileResponse } from "../../types";
import { ChangeInfo } from "./ChangeInfo";
import { useNavigate } from "react-router";

export function ProfilePage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isChangeInfo, setIsChangeInfo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending: isUpdatingAvatar } = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["profile"], (oldData: TGetProfileResponse) => {
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

      <img src={data.user.avatar} alt="user avatar" />
      <div>
        <Button onClickHandler={handleChangeAvatar}>Change avatar</Button>
        <Button onClickHandler={handleDeleteAvatar}>Delete avatar</Button>
      </div>
      <div>{`${data.user.firstName} ${data.user.lastName}`}</div>
      <div>{data.user.role}</div>
      <div>
        <Button onClickHandler={() => setIsChangeInfo(true)}>
          Change info
        </Button>
        <Button onClickHandler={() => navigate("/profile/password-change")}>
          Change password
        </Button>
      </div>
      {isChangeInfo && (
        <ChangeInfo onClose={() => setIsChangeInfo(false)} user={data.user} />
      )}
    </div>
  );
}
