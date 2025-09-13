
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const ENDPOINTS = {
  REGISTER: `${API_BASE_URL}auth/register/`,
  LOGOUT: `${API_BASE_URL}auth/logout/`,
  LOGIN: `${API_BASE_URL}auth/login/`,


  GRN_UPLOAD: `${API_BASE_URL}automation/upload/`
}
