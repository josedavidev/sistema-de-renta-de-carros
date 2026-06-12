import React, { useState } from "react";
import "./VehicleCard.css";

export function VehicleCard({ vehicle, onSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  const {
    vehicle_image,
    vehicle_brand,
    vehicle_model,
    vehicle_year,
    vehicle_color,
    vehicle_seats,
    vehicle_doors,
    vehicle_engine_type,
    vehicle_transmission,
    vehicle_mileage,
    vehicle_score,
    vehicle_hour_rate,
    vehicle_description,
  } = vehicle;

  return (
    <div className="vehicle-card">
      {/* Imagen y resumen */}
      <div className="vehicle-card-summary">
        {vehicle_image && (
          <img
            className="vehicle-card-image"
            src={vehicle_image[0]}
            alt={`${vehicle_brand} ${vehicle_model}`}
          />
        )}
        <h3 className="vehicle-card-title">
          {vehicle_brand} {vehicle_model}
        </h3>
        <p className="vehicle-card-price">
          Precio por hora: ${vehicle_hour_rate}
        </p>
      </div>

      {/* Botones */}
      <div className="vehicle-actions">
        <button
          className="vehicle-action-button"
          onClick={() => setShowDetails(true)}
        >
          Ver detalles
        </button>
        <button className="vehicle-action-button" onClick={onSelect}>
          Elegir
        </button>
      </div>

      {/* Modal de detalles */}
      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {vehicle_brand} {vehicle_model} ({vehicle_year})
            </h2>
            <p className="modal-description">{vehicle_description}</p>
            <ul className="modal-details-list">
              <li>
                <strong>Color:</strong> {vehicle_color}
              </li>
              <li>
                <strong>Asientos:</strong> {vehicle_seats}
              </li>
              <li>
                <strong>Puertas:</strong> {vehicle_doors}
              </li>
              <li>
                <strong>Motor:</strong> {vehicle_engine_type}
              </li>
              <li>
                <strong>Transmisión:</strong> {vehicle_transmission}
              </li>
              <li>
                <strong>Kilometraje:</strong> {vehicle_mileage} km
              </li>
              <li>
                <strong>Puntuación:</strong> {vehicle_score}
              </li>
              <li>
                <strong>Tarifa:</strong> ${vehicle_hour_rate}/h
              </li>
            </ul>
            <button
              className="modal-close-button"
              onClick={() => setShowDetails(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
