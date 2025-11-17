import { AxiosError } from "axios";
import userApi from "../userApi";
import {
  TGetCompaniesArgs,
  TUserGetCompaniesResponse,
  TUserGetCompanyResponse,
  TUpdateAvatarResponse,
  TUserUpdateCompanyData,
  TUserUpdateLogoResponse,
  TUpdateProfileData,
  TUserGetDashboardResponse,
  TGetProfileResponse,
  TUserCreateCompanyResponse,
  TUserUpdateCompanyResponse,
  TUserDeleteCompany,
  TUpdateProfileResponse,
  TGetDashboardCompaniesResponse,
  TAdminGetCompany,
  TGetAllUsersArgs,
  TGetAllUsersResponse,
  TSignUpFormInput,
  TAddAdminResponse,
  TGetUserByIdResponse,
  TChangeUserResponse,
  TChangePasswordData,
} from "../../types";

export async function getProfile(): Promise<TGetProfileResponse> {
  try {
    const response = await userApi.get("/profile");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function updateProfile(
  data: TUpdateProfileData
): Promise<TUpdateProfileResponse> {
  try {
    const response = await userApi.put("/profile", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function updateAvatar(
  data: FormData
): Promise<TUpdateAvatarResponse> {
  try {
    const response = await userApi.patch(`/profile`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function changePassword(
  data: TChangePasswordData
): Promise<{ message: string }> {
  try {
    const response = await userApi.put("/profile/password-change", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function userGetDashboard(
  args: Partial<TGetCompaniesArgs> = {}
): Promise<TUserGetDashboardResponse> {
  try {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(args)) {
      if (value || value === 0) {
        params.append(key, String(value));
      }
    }

    const response = await userApi.get("/dashboard", { params });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function userGetCompanies(
  args: TGetCompaniesArgs = {}
): Promise<TUserGetCompaniesResponse> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(args)) {
    if (value || value === 0) {
      params.append(key, String(value));
    }
  }

  try {
    const response = await userApi.get("/companies", { params });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function adminGetCompanies(
  args: TGetCompaniesArgs = {}
): Promise<TUserGetCompaniesResponse> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(args)) {
    if (value || value === 0) {
      params.append(key, String(value));
    }
  }

  try {
    const response = await userApi.get("/companies/admin", { params });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function userGetCompany(
  id: string
): Promise<TUserGetCompanyResponse> {
  try {
    const response = await userApi.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function userCreateCompany(
  data: FormData
): Promise<TUserCreateCompanyResponse> {
  try {
    const response = await userApi.post("/companies", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function userUpdateCompany(
  id: string,
  data: TUserUpdateCompanyData
): Promise<TUserUpdateCompanyResponse> {
  try {
    const response = await userApi.put(`/companies/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function userUpdateCompanyLogo(
  id: string,
  data: FormData
): Promise<TUserUpdateLogoResponse> {
  try {
    const response = await userApi.patch(`/companies/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function userDeleteCompany(
  id: string
): Promise<TUserDeleteCompany> {
  try {
    const response = await userApi.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function getAllCompaniesDashboard(
  args: Partial<TGetCompaniesArgs> = {}
): Promise<TGetDashboardCompaniesResponse> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(args)) {
    if (value || value === 0) {
      params.append(key, String(value));
    }
  }

  try {
    const response = await userApi.get("/dashboard/admin/companies", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function adminGetCompany(id: string): Promise<TAdminGetCompany> {
  try {
    const response = await userApi.get(`/companies/admin/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function getAllUsers(
  args: TGetAllUsersArgs = {}
): Promise<TGetAllUsersResponse> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(args)) {
    if (value || value === 0) {
      params.append(key, String(value));
    }
  }

  try {
    const response = await userApi.get("/dashboard/admin/users", { params });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function getAllAdmins(
  args: TGetAllUsersArgs = {}
): Promise<TGetAllUsersResponse> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(args)) {
    if (value || value === 0) {
      params.append(key, String(value));
    }
  }

  try {
    const response = await userApi.get("/dashboard/superadmin/admins", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function addAdmin(
  data: TSignUpFormInput
): Promise<TAddAdminResponse> {
  try {
    const response = await userApi.post("/dashboard/superadmin/admins", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function getUserById(id: string): Promise<TGetUserByIdResponse> {
  try {
    const response = await userApi.get(`/dashboard/admin/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function changeUser(
  id: string,
  data: { firstName: string; lastName: string }
): Promise<TChangeUserResponse> {
  try {
    const response = await userApi.put(`/dashboard/admin/users/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await userApi.delete(`/dashboard/admin/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
