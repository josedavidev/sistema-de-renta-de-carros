import React from "react";
import "./MisReservas.css";

export function MisReservas() {
  return (
    <div className="misreservas-container">
      <div className="misreservas-content">
        <h1>Consultar Reserva</h1>
        <p className="info-text">
          Informa tu código y tu número de documento para consultar tus
          reservas.
        </p>

        <div className="doc-type-options">
          <label>
            <input type="radio" name="docType" defaultChecked />
            <span>CC</span>
          </label>
          <label>
            <input type="radio" name="docType" />
            <span>Doc. Extranjero</span>
          </label>
          <label>
            <input type="radio" name="docType" />
            <span>Pasaporte</span>
          </label>
        </div>

        <div className="input-group">
          <label className="floating-label">Número de documento*</label>
          <input type="text" className="floating-input" placeholder="" />
        </div>

        <div className="input-group">
          <label className="floating-label">Código de la reserva*</label>
          <input type="text" className="floating-input" placeholder="" />
        </div>

        <button className="consultar-btn">CONSULTAR</button>
      </div>
    </div>
  );
}
