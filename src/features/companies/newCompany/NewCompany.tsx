import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../../ui/modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userCreateCompany } from "../../../api/services/userService";
import Button from "../../../ui/buttons/Button";

import styles from "./NewCompany.module.css";
import toast from "react-hot-toast";

type NewCompanyProps = {
  onClose: () => void;
};

type NewCompanyForm = {
  companyName: string;
  createdAt: string;
  capital: number;
  service: string;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  logo?: FileList;
};

function NewCompany({ onClose }: NewCompanyProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<NewCompanyForm>({
    defaultValues: {
      companyName: "",
      createdAt: "",
      capital: 0,
      service: "",
      country: "",
      city: "",
      street: "",
      streetNumber: "1",
      logo: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: userCreateCompany,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["companies"] });
      setTimeout(() => toast.success("Company created"), 1);
      reset();
      onClose();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<NewCompanyForm> = (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value || value === 0) {
        if (key === "logo") {
          const logo = data.logo?.[0];

          if (logo) {
            formData.append(key, logo);
            continue;
          } else {
            continue;
          }
        }

        formData.append(key, String(value));
      }
    }

    mutate(formData);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.formContainer}>
          <h2 className={styles.header}>New company</h2>
          <div className={styles.formGroup}>
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
              minLength={1}
              {...register("companyName", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="createdAt">Created at</label>
            <input
              type="text"
              id="createdAt"
              pattern="^\d{4}-\d{2}-\d{2}$"
              inputMode="numeric"
              {...register("createdAt", { required: true })}
              placeholder="yyyy-mm-dd"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="capital">Capital</label>
            <input
              type="number"
              min={0}
              id="capital"
              {...register("capital", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="service">Service name</label>
            <input
              type="text"
              id="service"
              minLength={1}
              {...register("service", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              minLength={1}
              {...register("country", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              minLength={1}
              {...register("city", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              minLength={1}
              {...register("street", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="streetNumber">Street number</label>
            <input
              type="number"
              id="streetNumber"
              min={1}
              {...register("streetNumber", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="logo">Company logo</label>
            <input
              className={styles.fileInput}
              type="file"
              id="logo"
              {...register("logo")}
            />
          </div>

          <Button
            className={styles.submitButton}
            style="primary"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Submiting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default NewCompany;
