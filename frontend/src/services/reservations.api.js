import axios from "axios";

const reservationsApi = axios.create({
  baseURL: "http://localhost:8000/rents/api/reservations/",
});

export const getAllReservas = () => reservationsApi.get("/");
export const getReserva = (id) => reservationsApi.get(`/${id}/`);
export const createReserva = (reserva) => reservationsApi.post("/", reserva);
export const updateReserva = (id, reserva) =>
  reservationsApi.put(`/${id}/`, reserva);
export const deleteReserva = (id) => reservationsApi.delete(`/${id}/`);
