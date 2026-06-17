import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllVehicles } from "../services/vehicles.api";
import { VehicleCard } from "../components/VehicleCard";

export function CarrosPorCategoria() {
  const { categoria } = useParams(); // Obtenemos el ID de la categoría desde la URL
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        // Traemos todos los vehículos
        const res = await getAllVehicles();

        // Filtramos los vehículos que coincidan con la categoría seleccionada y que estén disponibles
        const vehiculosPorCategoria = res.data.filter(
          (v) =>
            v.category?.category_id === parseInt(categoria) &&
            v.status?.status_id === 1,
        );

        setVehiculos(vehiculosPorCategoria);
      } catch (err) {
        console.error("Error cargando vehículos:", err);
      }
    };

    fetchVehiculos();
  }, [categoria]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Volver al Catálogo</button>
      <h1>Vehículos de la categoría {categoria}</h1>

      <div>
        {vehiculos.length === 0 && (
          <p>No hay vehículos disponibles en esta categoría.</p>
        )}

        {vehiculos.map((v) => (
          <VehicleCard
            key={v.vehicle_id}
            vehicle={v}
            onSelect={() =>
              navigate("/reservar", { state: { selectedVehicle: v } })
            }
          />
        ))}
      </div>
    </div>
  );
}
