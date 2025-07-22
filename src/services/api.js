import axios from "axios";
import { store } from "../store";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = async (email, senha) => {
  const response = await api.post("/auth/login", { email, senha });
  return response.data; 
};

export const registerApi = async (data) => {
  const response = await api.post("/auth/cadastrar", data);
  return response.data;
};

export const fetchUsersApi = async () => {
  const response = await api.get("/admin/usuarios");
  return response.data;
};

export const deleteUserApi = async (id) => {
  const response = await api.delete(`/admin/usuarios/${id}`);
  return response.data;
};

export default api;
