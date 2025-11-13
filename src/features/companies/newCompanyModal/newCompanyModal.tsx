import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../../ui/modal/Modal";
import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../../../api/services/userService";
import Button from "../../../ui/buttons/Button";

type TNewCompanyModalProps = {
  onClose: () => void;
  onAdded: () => void;
};

type TNewCompanyForm = {
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

function NewCompanyModal({ onClose, onAdded }: TNewCompanyModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewCompanyForm>({
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
    mutationFn: createCompany,
    onSuccess: () => {
      reset();
      onAdded();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<TNewCompanyForm> = (data) => {
    const logo = data.logo?.[0];

    const formData = new FormData();

    formData.append("companyName", data.companyName);
    formData.append("createdAt", data.createdAt);
    formData.append("capital", data.capital.toString());
    formData.append("service", data.service);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("street", data.street);
    formData.append("streetNumber", data.streetNumber.toString());

    if (logo) {
      formData.append("logo", logo);
    }

    // console.log("Form data:");
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    mutate(formData);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <h2>New company</h2>
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

          <div>
            <label htmlFor="logo">Company logo</label>
            <input type="file" id="logo" {...register("logo")} />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Submiting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default NewCompanyModal;
