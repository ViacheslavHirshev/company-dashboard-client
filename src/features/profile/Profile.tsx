import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateAvatar } from "../../api/services/userService";
import Loader from "../../ui/loader/Loader";
import CustomError from "../../ui/errors/CustomError";
import Button from "../../ui/buttons/Button";
import { ChangeEvent, useRef, useState } from "react";
import { TGetProfileResponse } from "../../types";
import { ChangeInfo } from "./changeInfo/ChangeInfo";
import { useNavigate } from "react-router";

import styles from "./Profile.module.css";

export function Profile() {
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
    <div className={styles.profileContainer}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleSelectFile}
        style={{ display: "none" }}
        accept="image/*"
      />

      <div className={styles.avatarContainer}>
        <img src={data.user.avatar} alt="user avatar" />
      </div>

      <div className={styles.avatarBtns}>
        <Button style="primary" onClickHandler={handleChangeAvatar}>
          Change avatar
        </Button>
        <Button style="secondary" onClickHandler={handleDeleteAvatar}>
          Delete avatar
        </Button>
      </div>

      <div
        className={styles.userName}
      >{`${data.user.firstName} ${data.user.lastName}`}</div>
      <div className={styles.userRole}>{data.user.role}</div>

      <div className={styles.changeBtns}>
        <Button style="primary" onClickHandler={() => setIsChangeInfo(true)}>
          Change info
        </Button>
        <Button
          style="primary"
          onClickHandler={() => navigate("/profile/password-change")}
        >
          Change password
        </Button>
      </div>

      {isChangeInfo && (
        <ChangeInfo onClose={() => setIsChangeInfo(false)} user={data.user} />
      )}
    </div>
  );
}
