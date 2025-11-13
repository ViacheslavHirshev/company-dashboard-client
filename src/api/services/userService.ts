import { AxiosError } from "axios";
import userApi from "../userApi";
import {
  TGetCompanyResponse,
  TGetUserCompaniesResponse,
  TGetUserDashboardResponse,
  TGetUserDataResponse,
  TUpdateCompanyData,
  TUpdateLogoResponse,
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

export async function getDashboardUser(): Promise<TGetUserDashboardResponse> {
  try {
    const response = await userApi.get("/dashboard");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function getCompaniesUser(): Promise<TGetUserCompaniesResponse> {
  try {
    const response = await userApi.get("/companies");
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
