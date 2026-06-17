import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { VehicleCard } from "../components/VehicleCard";
import { getAllCategories, getAllVehicles } from "../services/vehicles.api";
import { useReserva } from "../context/ReservaContext";

export function ChoiceVehicle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setReserva } = useReserva();
  const { stage1 } = location.state || {};

  const [categorias, setCategorias] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, vehiclesResponse] = await Promise.all([
          getAllCategories(),
          getAllVehicles(),
        ]);

        const vehiculosDisponibles = vehiclesResponse.data.filter(
          (v) => v.status?.status_id === 1,
        );

        setVehiculos(vehiculosDisponibles);

        const categoriasConVehiculosDisponibles =
          categoriesResponse.data.filter((cat) =>
            vehiculosDisponibles.some(
              (veh) => veh.category?.category_id === cat.category_id,
            ),
          );

        setCategorias(categoriasConVehiculosDisponibles);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchData();
  }, []);

  const handleVehicleSelect = (vehicle) => {
    setReserva((prevReserva) => ({
      ...prevReserva,
      selectedVehicle: vehicle,
    }));

    navigate("/reservar/datos", {
      state: { ...stage1, selectedVehicle: vehicle },
    });
  };

  return (
    <div>
      {!categoriaSeleccionada ? (
        <>
          <h2>Selecciona una categoría</h2>
          {categorias.length === 0 ? (
            <p>No hay categorías disponibles con vehículos disponibles.</p>
          ) : (
            <div>
              {categorias.map((cat) => (
                <div key={cat.category_id}>
                  <CategoryCard
                    category_image={cat.category_image || "/img/default.jpg"}
                    category_name={cat.category_name}
                    category_description={cat.category_description}
                    onClick={() => setCategoriaSeleccionada(cat.category_id)}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <button onClick={() => setCategoriaSeleccionada(null)}>
            ← Volver a categorías
          </button>
          <h2>Vehículos disponibles</h2>
          <div>
            {vehiculos
              .filter((v) => v.category?.category_id === categoriaSeleccionada)
              .map((v) => (
                <div key={v.vehicle_id}>
                  <VehicleCard
                    vehicle={v}
                    onSelect={() => handleVehicleSelect(v)}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
