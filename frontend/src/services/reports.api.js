import axios from "axios";

const reportesApi = axios.create({
  baseURL: "http://localhost:8000/report/",
});

export const getAllReportes = () => reportesApi.get("listar/");
export const createReporte = (reporte) => reportesApi.post("crear/", reporte);
