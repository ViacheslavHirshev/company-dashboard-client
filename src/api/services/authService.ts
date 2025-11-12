import {
  TRefreshAccessTokenResponse,
  TSignInFormInput,
  TSignInResponse,
  TSignUpFormInput,
  TSignUpResponse,
} from "../../types";
import { authApi } from "../authApi";
import { AxiosError } from "axios";

export async function signIn(
  formInput: TSignInFormInput
): Promise<TSignInResponse> {
  try {
    const response = await authApi.post("/auth/sign-in", formInput);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function signUp(
  formInput: TSignUpFormInput
): Promise<TSignUpResponse> {
  try {
    const response = await authApi.post("/auth/sign-up", formInput);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function refreshAccessToken(): Promise<TRefreshAccessTokenResponse> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await authApi.get("/refresh", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
