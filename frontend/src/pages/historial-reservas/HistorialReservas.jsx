// src/pages/HistorialReservas.jsx
import React, { useState } from "react";
import "./HistorialReservas.css";

export function HistorialReservas() {
  const [documento, setDocumento] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Datos de ejemplo para ilustrar los distintos estados de reserva
  const sampleResults = [
    {
      id: 1,
      status: "Pendiente",
      devolucion: "15/04/2025 10:00",
      entrega: "15/04/2025 09:00",
    },
    {
      id: 2,
      status: "Cancelada",
      cancelada: "12/04/2025 14:30",
    },
    {
      id: 3,
      status: "Finalizada",
      info: "Reserva finalizada",
    },
    {
      id: 4,
      status: "Pendiente",
      devolucion: "16/04/2025 11:00",
      entrega: "16/04/2025 10:00",
    },
  ];

  const handleBuscar = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  // Filtramos los resultados si se seleccionó un estado
  const filteredResults = estadoFiltro
    ? sampleResults.filter((res) => res.status === estadoFiltro)
    : sampleResults;

  return (
    <div className="historial-reservas-container">
      <div className="historial-reservas-content">
        <h1>Historial de Reserva</h1>
        {/* Formulario de búsqueda y filtro */}
        <form className="historial-reservas-form" onSubmit={handleBuscar}>
          <div className="form-row">
            <div className="input-group">
              <label className="floating-label" htmlFor="documento">
                Número de documento*
              </label>
              <div className="search-input">
                <input
                  type="text"
                  id="documento"
                  className="floating-input"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            <div className="input-group">
              <label className="floating-label" htmlFor="estado">
                Estado de reserva*
              </label>
              <select
                id="estado"
                className="floating-input"
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
          </div>
          <button type="submit" className="buscar-btn">
            Buscar
          </button>
        </form>

        {showResults && (
          <div className="resultados-dropdown">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div key={result.id} className="resultado-item">
                  {result.status === "Pendiente" && (
                    <>
                      <p className="resultado-status">Pendiente</p>
                      <p className="resultado-detalle">
                        Devolución: {result.devolucion} | Entrega:{" "}
                        {result.entrega}
                      </p>
                    </>
                  )}
                  {result.status === "Cancelada" && (
                    <>
                      <p className="resultado-status">Cancelada</p>
                      <p className="resultado-detalle">
                        Cancelada el: {result.cancelada}
                      </p>
                    </>
                  )}
                  {result.status === "Finalizada" && (
                    <>
                      <p className="resultado-status">Finalizada</p>
                      <p className="resultado-detalle">{result.info}</p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="resultado-detalle">
                No se encontraron reservas para el filtro seleccionado.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
