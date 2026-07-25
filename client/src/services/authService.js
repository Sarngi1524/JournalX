import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.vite_api_base_url + "/api",
});

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};