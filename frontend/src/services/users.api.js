import axios from "axios";

const usersApi = axios.create({
  baseURL: "http://localhost:8000/users/api/users/",
});

export const getAllUsers = () => usersApi.get("/");
export const getUser = (id) => usersApi.get(`/${id}/`);
export const createUser = (user) => usersApi.post("/", user);
export const updateUser = (id, user) => usersApi.patch(`/${id}/`, user);
export const deleteUser = (id) => usersApi.delete(`/${id}/`);

const registerApi = axios.create({
  baseURL: "http://localhost:8000/users/api/",
});
export const registerUser = (user) => registerApi.post("register/", user);

const loginApi = axios.create({
  baseURL: "http://localhost:8000/users/api/",
});
export const loginUser = async (credentials) => {
  try {
    const response = await loginApi.post("login/", credentials);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Error al iniciar sesión" };
  }
};
