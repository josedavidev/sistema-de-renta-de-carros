import axios from "axios";

const paymentsApi = axios.create({
  baseURL: "http://localhost:8000/payments/api/payments/",
});

export const getAllPayments = () => paymentsApi.get("/");
export const getPayment = (id) => paymentsApi.get(`/${id}/`);
export const createPayment = (payment) => paymentsApi.post("/", payment);
export const updatePayment = (id, payment) =>
  paymentsApi.patch(`/${id}/`, payment);
export const deletePayment = (id) => paymentsApi.delete(`/${id}/`);

const invoicesApi = axios.create({
  baseURL: "http://localhost:8000/payments/api/invoices/",
});

export const getAllInvoices = () => invoicesApi.get("/");
export const getInvoice = (id) => invoicesApi.get(`/${id}/`);
export const createInvoice = (invoice) => invoicesApi.post("/", invoice);
export const updateInvoice = (id, invoice) =>
  invoicesApi.patch(`/${id}/`, invoice);
export const deleteInvoice = (id) => invoicesApi.delete(`/${id}/`);
