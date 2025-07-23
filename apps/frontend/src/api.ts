import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1337";
export const api = axios.create({
  baseURL: `${baseUrl}/api`,
});
