
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const ENDPOINTS = {
  REGISTER: `${API_BASE_URL}auth/register/`,
  LOGOUT: `${API_BASE_URL}auth/logout/`,
  LOGIN: `${API_BASE_URL}auth/login/`,


  GRN_UPLOAD: `${API_BASE_URL}automation/upload/one-to-one/`,
  GRN_UPLOAD_ONETOMANY: `${API_BASE_URL}automation/upload/one-to-many/`,
  GRN_UPLOAD_MANYTOMANY: `${API_BASE_URL}automation/upload/many-to-many/`
}