import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE;

export const authApi = axios.create({
  baseURL: `${API_URL}`,
});
