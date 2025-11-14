import { AxiosError } from "axios";
import userApi from "../userApi";
import {
  TGetCompaniesQueryArgs,
  TGetCompaniesResponse,
  TGetCompanyResponse,
  TGetUserDashboardResponse,
  TGetUserDataResponse,
  TUpdateAvatarResponse,
  TUpdateCompanyData,
  TUpdateLogoResponse,
  TUpdateUserData,
} from "../../types";

export async function getUserData(): Promise<TGetUserDataResponse> {
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

export async function getDashboardUser(
  args: TGetCompaniesQueryArgs = {}
): Promise<TGetUserDashboardResponse> {
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

export async function getCompaniesUser(
  args: TGetCompaniesQueryArgs = {}
): Promise<TGetCompaniesResponse> {
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

export async function getCompany(id: string): Promise<TGetCompanyResponse> {
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

export async function createCompany(data: FormData) {
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

export async function updateCompany(id: string, data: TUpdateCompanyData) {
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

export async function updateLogo(
  id: string,
  data: FormData
): Promise<TUpdateLogoResponse> {
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

export async function deleteCompany(id: string) {
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

export async function updateUserData(data: TUpdateUserData) {
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
