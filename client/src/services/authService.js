import axios from "axios";

import { API_BASE } from "./api";

const baseURL = API_BASE;

const API = axios.create({ baseURL });

// Export resolved base so UI can show it for troubleshooting
export { API_BASE };

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};