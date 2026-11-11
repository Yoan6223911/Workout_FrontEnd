// Vite injects VITE_API_URL at build time. The hosted API is the default.
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL
).replace(/\/+$/, "");
