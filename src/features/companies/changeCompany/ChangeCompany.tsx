import { SubmitHandler, useForm } from "react-hook-form";
import {
  TCompany,
  TUserUpdateCompanyData,
  TUserUpdateCompanyResponse,
} from "../../../types";
import Modal from "../../../ui/modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUpdateCompany } from "../../../api/services/userService";
import Button from "../../../ui/buttons/Button";
import { splitAddress } from "../../../utils/splitAddress";

type TUpdateCompanyProps = {
  id: number;
  onClose: () => void;
  company: Partial<TCompany>;
};

function ChangeCompany({ id, onClose, company }: TUpdateCompanyProps) {
  const { country, city, street, streetNumber } = splitAddress(
    company.address!
  );

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUserUpdateCompanyData>({
    defaultValues: {
      companyName: company.name,
      createdAt: company.createdAt,
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
      reset();
      queryClient.setQueryData(["company", id], (oldData: { company: any }) => {
        if (!oldData) return;

        return {
          ...oldData,
          company: updatedData.company,
        };
      });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<TUserUpdateCompanyData> = (data) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Update company</h2>
          <div>
            <label htmlFor="companyName">Company name</label>
            <input type="text" id="companyName" {...register("companyName")} />
          </div>

          <div>
            <label htmlFor="createdAt">Created at</label>
            <input
              type="text"
              id="createdAt"
              {...register("createdAt")}
              placeholder="yyyy-mm-dd"
            />
          </div>

          <div>
            <label htmlFor="capital">Capital</label>
            <input type="number" id="capital" {...register("capital")} />
          </div>

          <div>
            <label htmlFor="service">Service name</label>
            <input type="text" id="service" {...register("service")} />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <input type="text" id="country" {...register("country")} />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" {...register("city")} />
          </div>

          <div>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" {...register("street")} />
          </div>

          <div>
            <label htmlFor="streetNumber">Street number</label>
            <input
              type="text"
              id="streetNumber"
              {...register("streetNumber")}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Submiting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ChangeCompany;
