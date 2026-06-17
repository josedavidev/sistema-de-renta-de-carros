import React, { useState } from "react";

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
    <div>
      <div>
        <h1>Historial de Reserva</h1>
        {/* Formulario de búsqueda y filtro */}
        <form onSubmit={handleBuscar}>
          <div>
            <div>
              <label htmlFor="documento">Número de documento*</label>
              <div>
                <input
                  type="text"
                  id="documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
                <span>🔍</span>
              </div>
            </div>

            <div>
              <label htmlFor="estado">Estado de reserva*</label>
              <select
                id="estado"
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
          <button type="submit">Buscar</button>
        </form>

        {showResults && (
          <div>
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div key={result.id}>
                  {result.status === "Pendiente" && (
                    <>
                      <p>Pendiente</p>
                      <p>
                        Devolución: {result.devolucion} | Entrega:{" "}
                        {result.entrega}
                      </p>
                    </>
                  )}
                  {result.status === "Cancelada" && (
                    <>
                      <p>Cancelada</p>
                      <p>Cancelada el: {result.cancelada}</p>
                    </>
                  )}
                  {result.status === "Finalizada" && (
                    <>
                      <p>Finalizada</p>
                      <p>{result.info}</p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No se encontraron reservas para el filtro seleccionado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
