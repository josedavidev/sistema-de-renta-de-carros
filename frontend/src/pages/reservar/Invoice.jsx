import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useReserva } from "../../context/ReservaContext";
import { getAllInvoices } from "../../services/payments.api";
import { useNavigate } from "react-router-dom";
import "./Invoice.css";

export function Invoice() {
  const [factura, setFactura] = useState(null);
  const { reserva } = useReserva();
  const navigate = useNavigate();
  const facturaRef = useRef();

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const response = await getAllInvoices();
        const facturas = response.data;

        const facturaReserva = facturas.find((f) => {
          const resId =
            typeof f.reservation === "object"
              ? f.reservation.id
              : f.reservation;
          return resId === reserva.reservation_id;
        });

        if (facturaReserva) {
          setFactura(facturaReserva);
        } else {
          console.warn("No se encontró una factura para esta reserva.");
        }
      } catch (error) {
        console.error("Error al obtener la factura:", error);
        alert("Ocurrió un error al cargar la factura.");
      }
    };

    if (reserva?.reservation_id) {
      fetchFactura();
    }
  }, [reserva]);

  const descargarPDF = async () => {
    const input = facturaRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("factura.pdf");
  };

  if (!factura) {
    return <div>No se encontró una factura asociada a esta reserva.</div>;
  }

  return (
    <div className="invoice-container">
      <div ref={facturaRef} className="invoice-content">
        <h2 className="invoice-title">Factura</h2>
        <p className="invoice-detail">
          <strong>Número de Factura:</strong> {factura.invoice_number}
        </p>
        <p className="invoice-detail">
          <strong>Fecha:</strong> {factura.invoice_date}
        </p>
        <p className="invoice-detail">
          <strong>Estado:</strong> {factura.invoice_status}
        </p>
        <p className="invoice-detail">
          <strong>Total:</strong> ${factura.invoice_total}
        </p>
        <p className="invoice-detail">
          <strong>Notas:</strong> {factura.invoice_notes || "Sin notas"}
        </p>

        <hr className="invoice-divider" />

        <h3 className="invoice-subtitle">Cliente</h3>
        <p className="invoice-detail">
          {reserva.reservation_firstname} {reserva.reservation_lastname}
        </p>
        <p className="invoice-detail">Cédula: {reserva.reservation_cedula}</p>
        <p className="invoice-detail">Email: {reserva.reservation_email}</p>
        <p className="invoice-detail">Teléfono: {reserva.reservation_phone}</p>

        <h3 className="invoice-subtitle">Vehículo</h3>
        <p className="invoice-detail">
          {reserva.vehicle?.vehicle_brand} {reserva.vehicle?.vehicle_model} -{" "}
          {reserva.vehicle?.vehicle_year}
        </p>
        <p className="invoice-detail">
          Placa: {reserva.vehicle?.vehicle_license_plate}
        </p>

        <h3 className="invoice-subtitle">Reserva</h3>
        <p className="invoice-detail">
          Recogida: {reserva.pickup_date} a las {reserva.pickup_time}
        </p>
        <p className="invoice-detail">
          Devolución: {reserva.dropoff_date} a las {reserva.dropoff_time}
        </p>
        <p className="invoice-detail">
          Lugar de Recogida: {reserva.pickup_location}
        </p>
        <p className="invoice-detail">
          Lugar de Devolución: {reserva.dropoff_location}
        </p>
      </div>

      <div className="invoice-actions">
        <button className="invoice-button" onClick={descargarPDF}>
          Descargar PDF
        </button>
        <button className="invoice-button" onClick={() => navigate("/home")}>
          Volver
        </button>
      </div>
    </div>
  );
}
