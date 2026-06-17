import React, { useState } from "react";

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
    <div>
      {/* Imagen y resumen */}
      <div>
        {vehicle_image && (
          <img
            src={vehicle_image[0]}
            alt={`${vehicle_brand} ${vehicle_model}`}
          />
        )}
        <h3>
          {vehicle_brand} {vehicle_model}
        </h3>
        <p>Precio por hora: ${vehicle_hour_rate}</p>
      </div>

      {/* Botones */}
      <div>
        <button onClick={() => setShowDetails(true)}>Ver detalles</button>
        <button onClick={onSelect}>Elegir</button>
      </div>

      {/* Modal de detalles */}
      {showDetails && (
        <div onClick={() => setShowDetails(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <h2>
              {vehicle_brand} {vehicle_model} ({vehicle_year})
            </h2>
            <p>{vehicle_description}</p>
            <ul>
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
            <button onClick={() => setShowDetails(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
