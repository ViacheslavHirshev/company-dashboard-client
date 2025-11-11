import axios from "axios";

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

export default userApi;
