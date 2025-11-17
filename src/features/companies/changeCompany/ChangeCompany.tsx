import { SubmitHandler, useForm } from "react-hook-form";
import { TCompany, TUserUpdateCompanyData } from "../../../types";
import Modal from "../../../ui/modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUpdateCompany } from "../../../api/services/userService";
import Button from "../../../ui/buttons/Button";
import { splitAddress } from "../../../utils/splitAddress";

import styles from "./ChangeCompany.module.css";
import toast from "react-hot-toast";
import { normalizeDate } from "../../../utils/normalizeDate";

type TUpdateCompanyProps = {
  id: string;
  onClose: () => void;
  company: Partial<TCompany>;
};

function ChangeCompany({ id, onClose, company }: TUpdateCompanyProps) {
  const { country, city, street, streetNumber } = splitAddress(
    company.address!
  );

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<TUserUpdateCompanyData>({
    defaultValues: {
      companyName: company.name,
      createdAt: normalizeDate(company.createdAt!),
      capital: company.capital,
      service: company.service,
      country,
      city,
      street,
      streetNumber,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUserUpdateCompanyData) =>
      userUpdateCompany(`${company.id}`, data),

    onSuccess: (updatedData) => {
      queryClient.setQueryData(["company", id], (oldData: { company: any }) => {
        if (!oldData) return;

        return {
          ...oldData,
          company: updatedData.company,
        };
      });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setTimeout(() => toast.success("Company info changed"), 1);
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

  const onSubmit: SubmitHandler<TUserUpdateCompanyData> = (data) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          <h2 className={styles.formContainer}>Update company</h2>
          <div className={styles.formGroup}>
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
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
              {...register("service", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              {...register("country", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              {...register("city", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
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

export default ChangeCompany;
