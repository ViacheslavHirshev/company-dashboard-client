import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  userDeleteCompany,
  userGetCompany,
  userUpdateCompanyLogo,
} from "../../../api/services/userService";
import CustomError from "../../../ui/errors/CustomError";
import Loader from "../../../ui/loader/Loader";
import Button from "../../../ui/buttons/Button";
import { normalizeDate } from "../../../utils/normalizeDate";
import ChangeCompany from "../changeCompany/ChangeCompany";

import styles from "./CompanyInfoUser.module.css";

export function CompanyInfoUser() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const logoInputRef = useRef<HTMLInputElement>(null);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["company", id],
    queryFn: () => userGetCompany(id!),
  });

  const { mutate: mutateLogo, isPending: isLogoUpdating } = useMutation({
    mutationFn: (data: FormData) => userUpdateCompanyLogo(id!, data),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["company", id], (oldData: { company: any }) => {
        if (!oldData) return;
        return {
          ...oldData,
          company: {
            ...oldData.company,
            logoPath: updatedData.logoPath,
          },
        };
      });
    },
    onError: () => {},
  });

  const { mutate: removeCompany, isPending: isCompanyDeleting } = useMutation({
    mutationFn: () => userDeleteCompany(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate("/companies");
    },
    onError: () => {},
  });

  if (isPending || isCompanyDeleting || isLogoUpdating)
    return <Loader size="small" />;
  if (isError) return <CustomError message={error.message} />;

  function handleUpdateLogo(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("logo", file);

      mutateLogo(formData);
    }
  }

  function handleFileSelect() {
    logoInputRef.current?.click();
  }

  function handleDeleteLogo() {
    if (window.confirm("Are you sure you want to delete a logo?")) {
      const formData = new FormData();
      formData.append("deleteLogo", "true");

      mutateLogo(formData);
    }
  }

  function handleDeleteCompany() {
    if (window.confirm("Are you sure you want to delete this company")) {
      removeCompany();
    }
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <Button
          className={styles.backButton}
          style="secondary"
          type="button"
          onClickHandler={() => navigate(-1)}
        >
          &larr;
        </Button>

        <div className={styles.companyCard}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logoImage}
              src={data.company.logoPath}
              alt="Company logo img"
            />
          </div>

          <div className={styles.logoBtns}>
            <input
              type="file"
              style={{ display: "none" }}
              ref={logoInputRef}
              accept="image/*"
              onChange={handleUpdateLogo}
            />

            <Button style="primary" onClickHandler={handleFileSelect}>
              Update logo
            </Button>
            <Button style="secondary" onClickHandler={handleDeleteLogo}>
              Delete logo
            </Button>
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.companyName}>{data.company.name}</p>
            <p className={styles.infoItem}>
              <span>Created:</span>
              <span>{normalizeDate(data.company.createdAt)}</span>
            </p>
            <p className={styles.infoItem}>
              <span>Type of service:</span>
              <span>{data.company.service}</span>
            </p>
            <p className={styles.infoItem}>
              <span>Capital:</span>
              <span>{data.company.capital}</span>
            </p>
            <p className={styles.infoItem}>
              <span>Address:</span>
              <span>{data.company.address}</span>
            </p>
          </div>
        </div>

        <div className={styles.changeBtns}>
          <Button style="primary" onClickHandler={() => setIsModalOpen(true)}>
            Change company
          </Button>
          <Button style="danger" onClickHandler={handleDeleteCompany}>
            Delete company
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <ChangeCompany
          id={data.company.id}
          company={data.company}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
