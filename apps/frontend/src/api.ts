import axios from "axios";

export const api = axios.create({
  baseURL: `https://jornal-prol-tario.onrender.com/api`,
});
