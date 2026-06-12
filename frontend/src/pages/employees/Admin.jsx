import React from "react";
import "./Admin.css";

export function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-dv-title">
        <h1 className="admin-title">Buenas Señor 'name'</h1>
      </div>

      <div className="admin-stats">
        <div className="admin-div-subtitle-stats">
          <h2 className="admin-subtitle-stats">Estadísticas</h2>
        </div>
        <div className="admin-div-stats">
          <div className="admin-subdiv-stats">
            <h3 className="admin-name-stat">Clientes</h3>
            <p className="admin-number-stat">120</p>
          </div>
          <div className="admin-subdiv-stats">
            <h3 className="admin-name-stat">Empleados</h3>
            <p className="admin-number-stat">15</p>
          </div>
          <div className="admin-subdiv-stats">
            <h3 className="admin-name-stat">Vehículos</h3>
            <p className="admin-number-stat">42</p>
          </div>
          <div className="admin-subdiv-stats">
            <h3 className="admin-name-stat">Reservas activas</h3>
            <p className="admin-number-stat">8</p>
          </div>
          <div className="admin-subdiv-stats">
            <h3 className="admin-name-stat">Soporte</h3>
            <p className="admin-number-stat">12</p>
          </div>
        </div>
      </div>

      {/* Sección de Últimas Actividades */}
      <div className="admin-activities">
        <div className="admin-div-subtitle-stats">
          <h2 className="admin-subtitle-stats">Últimas Actividades</h2>
        </div>
        <ul className="admin-activity-list">
          <li className="admin-activity-item">
            Cliente 'John Doe' registró una nueva reserva
          </li>
          <li className="admin-activity-item">
            Empleado 'Carlos' actualizó el vehículo con ID #235
          </li>
          <li className="admin-activity-item">
            Se añadió un nuevo vehículo (Toyota Camry) al catálogo
          </li>
          <li className="admin-activity-item">
            Cliente 'Maria' terminó su alquiler de vehículo
          </li>
        </ul>
      </div>

      {/* Sección de Alertas / Recordatorios */}
      <div className="admin-alerts">
        <h3 className="admin-alerts-title">Alertas / Recordatorios</h3>
        <ul className="admin-alert-list">
          <li className="admin-alert-item">
            Verificar documento de identidad para el cliente 'Laura'
          </li>
          <li className="admin-alert-item">
            Reserva #1016 pendiente de confirmación
          </li>
          <li className="admin-alert-item">
            Devolución retrasada para el vehículo con ID #459
          </li>
          <li className="admin-alert-item">
            El pago del cliente 'Michael' falló, requiere atención
          </li>
        </ul>
      </div>

      {/* Botones de Gestión */}
      <div className="admin-actions">
        <div className="admin-action">
          <button className="admin-btn">Gestionar Clientes</button>
        </div>
        <div className="admin-action">
          <button className="admin-btn">Gestionar Empleados</button>
        </div>
        <div className="admin-action">
          <button className="admin-btn">Gestionar Vehiculos</button>
        </div>
        <div className="admin-action">
          <button className="admin-btn">Ver Informes</button>
        </div>
      </div>
    </div>
  );
}
