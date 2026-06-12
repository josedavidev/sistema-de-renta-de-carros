import axios from "axios";

const vehiclesApi = axios.create({
  baseURL: "http://localhost:8000/vehicles/api/vehicles/",
});

export const getAllVehicles = () => vehiclesApi.get("/");
export const getVehicle = (id) => vehiclesApi.get(`/${id}/`);
export const createVehicle = (vehicle) => vehiclesApi.post("/", vehicle);
export const updateVehicle = (id, vehicle) =>
  vehiclesApi.patch(`/${id}/`, vehicle);
export const deleteVehicle = (id) => vehiclesApi.delete(`/${id}/`);

const categoriesApi = axios.create({
  baseURL: "http://localhost:8000/vehicles/api/vehicles-categories/",
});

export const getAllCategories = () => categoriesApi.get("/");

const statusesApi = axios.create({
  baseURL: "http://localhost:8000/vehicles/api/vehicles-status/",
});

export const getAllStatuses = () => statusesApi.get("/");
