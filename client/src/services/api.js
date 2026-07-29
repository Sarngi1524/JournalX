const rawApiBase = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")
  : "";

export const API_BASE = rawApiBase ? `${rawApiBase}/api` : "/api";

export const getAssetUrl = (path) => {
  if (!path) return "";

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (rawApiBase) {
    return `${rawApiBase}${path.startsWith("/") ? "" : "/"}${path}`;
  }

  return path;
};