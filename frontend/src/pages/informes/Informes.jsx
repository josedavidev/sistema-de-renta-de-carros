// src/pages/Informes.jsx
import React, { useState } from "react";
import "./Informes.css";

export function Informes() {
  // Estados para capturar los datos del formulario.
  const [documento, setDocumento] = useState("");
  const [codigoReserva, setCodigoReserva] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [fechaRecepcion, setFechaRecepcion] = useState("");
  const [horaRecepcion, setHoraRecepcion] = useState("");
  const [daño, setDaño] = useState("");
  const [estadoVehiculo, setEstadoVehiculo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [descripcionDaño, setDescripcionDaño] = useState("");

  // Opcional: Mostrar la descripción del daño solo si se selecciona un daño
  const showDescripcion = daño && daño !== "Sin daño";

  const handleConfirm = () => {
    // Aquí se procesarían los datos; en este ejemplo, el botón no es funcional.
    alert("Informe confirmado (simulado)");
  };

  return (
    <div className="informes-container">
      <div className="informes-content">
        <h1>Informe de Clientes</h1>
        <div className="informes-form">
          {/* Fila 1: Documento y Nombre */}
          <div className="form-row">
            <div className="form-group">
              <label className="floating-label">Documento del usuario*</label>
              <div className="search-input">
                <input
                  type="text"
                  className="floating-input"
                  placeholder=""
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>
            <div className="form-group">
              <label className="floating-label">Nombre del usuario*</label>
              <input
                type="text"
                className="floating-input"
                placeholder=""
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
          </div>
          {/* Fila 2: Fecha y hora de recepción */}
          <div className="form-row">
            <div className="form-group">
              <label className="floating-label">Fecha de recepción*</label>
              <input
                type="date"
                className="floating-input"
                value={fechaRecepcion}
                onChange={(e) => setFechaRecepcion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="floating-label">Hora de recepción*</label>
              <input
                type="time"
                className="floating-input"
                value={horaRecepcion}
                onChange={(e) => setHoraRecepcion(e.target.value)}
              />
            </div>
          </div>
          {/* Fila 3: Daño y Estado del vehículo */}
          <div className="form-row">
            <div className="form-group">
              <label className="floating-label">Daño*</label>
              <select
                className="floating-input"
                value={daño}
                onChange={(e) => setDaño(e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="Sin daño">Sin daño</option>
                <option value="Rayadura">Rayadura</option>
                <option value="Abolladura">Abolladura</option>
                <option value="Cristal roto">Cristal roto</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label className="floating-label">Estado del vehículo*</label>
              <input
                type="text"
                className="floating-input"
                placeholder=""
                value={estadoVehiculo}
                onChange={(e) => setEstadoVehiculo(e.target.value)}
              />
            </div>
          </div>
          {/* Fila 4: Observaciones */}
          <div className="form-row">
            <div className="form-group full-width">
              <label className="floating-label">Observaciones</label>
              <textarea
                className="floating-input"
                placeholder=""
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              ></textarea>
            </div>
          </div>
          {/* Condicional: Descripción del daño */}
          {showDescripcion && (
            <div className="form-row">
              <div className="form-group full-width">
                <label className="floating-label">Descripción del daño</label>
                <textarea
                  className="floating-input"
                  placeholder=""
                  value={descripcionDaño}
                  onChange={(e) => setDescripcionDaño(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
          {/* Botón de Confirmar */}
          <button type="button" className="confirm-btn" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
