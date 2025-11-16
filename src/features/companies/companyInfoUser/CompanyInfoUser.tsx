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
      <div>
        <Button type="button" onClickHandler={() => navigate(-1)}>
          &larr;
        </Button>
        <div>
          <div>
            <img src={data.company.logoPath} alt="Company logo img" />
          </div>
          <div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={logoInputRef}
              accept="image/*"
              onChange={handleUpdateLogo}
            />
            <Button onClickHandler={handleFileSelect}>Update logo</Button>
            <Button onClickHandler={handleDeleteLogo}>Delete logo</Button>
          </div>
          <p>{data.company.name}</p>
          <p>Created: {normalizeDate(data.company.createdAt)}</p>
          <p>Type of service: {data.company.service}</p>
          <p>Capital: {data.company.capital}</p>
          <p>Address: {data.company.address}</p>
        </div>
        <div>
          <Button onClickHandler={() => setIsModalOpen(true)}>
            Update company
          </Button>
          <Button onClickHandler={handleDeleteCompany}>Delete company</Button>
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
