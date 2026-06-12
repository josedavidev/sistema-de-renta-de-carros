import React from "react";
import "./receptionist.css";

export function Receptionist() {
  return (
    <div className="receptionist-container">
      <div className="receptionist-searchBar">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Cedula del usuario"
          className="receptionist-input"
        />
        <select className="receptionist-select">
          <option>Estado de reserva</option>
        </select>
        <button className="receptionist-button">Buscar usuario</button>
      </div>

      <div className="receptionist-mainBox">
        <div className="receptionist-column">
          <h3 className="receptionist-title">Próximas Devoluciones</h3>
          <div className="receptionist-entryBox"></div>
          <div className="receptionist-entryBox"></div>
          <div className="receptionist-entryBox"></div>
          <div className="receptionist-entryBox"></div>
        </div>

        <div className="receptionist-divider"></div>

        <div className="receptionist-column">
          <h3 className="receptionist-title">Próximas Entregas</h3>
          <div className="receptionist-entryBox"></div>
          <div className="receptionist-entryBox"></div>
          <div className="receptionist-entryBox"></div>
          <div className="receptionist-entryBox"></div>
        </div>
      </div>
    </div>
  );
}
