import axios from "axios";

const envBase = import.meta.env.VITE_API_BASE_URL;
const baseURL = envBase
  ? `${envBase.replace(/\/$/, "")}/api`
  : "http://localhost:5000/api";

// Helpful for debugging in consoles (will be removed in production logs if desired)
console.info("API base URL:", baseURL);

const API = axios.create({ baseURL });

// Export resolved base so UI can show it for troubleshooting
export const API_BASE = baseURL;

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};