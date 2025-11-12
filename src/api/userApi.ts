import axios from "axios";
import { refreshAccessToken } from "./services/authService";

const API_URL = import.meta.env.VITE_API_BASE;

const userApi = axios.create({
  baseURL: `${API_URL}`,
});

userApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    throw new Error("Access and refresh tokens expired");
  }

  return config;
});

userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshAccessToken();
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        // console.log(`Token refreshed: ${accessToken}`);
        return userApi(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed.", refreshError);
        throw refreshError;
      }
    }

    throw error;
  }
);

export default userApi;
