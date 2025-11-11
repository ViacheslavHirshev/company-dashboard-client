import { AxiosError } from "axios";
import userApi from "../userApi";
import { TGetUserDataResponse } from "../../types";

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
