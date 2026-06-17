import React from "react";
import { FormVehicles } from "../components/FormVehicles";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../services/vehicles.api";
import { toast } from "react-hot-toast";

export function CrearVehiculo() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createVehicle(data);
      toast.success("Vehículo creado correctamente", {
        position: "bottom-right",
      });
      navigate("/vehiculos");
    } catch (error) {
      console.error(error.response.data);
      toast.error("Error al crear vehiculo", {
        position: "bottom-right",
      });
    }
  };
  return (
    <div>
      <FormVehicles
        title="Crear Vehículo"
        buttonText="Crear Vehículo"
        onSubmit={handleCreate}
        mode="create"
      />
    </div>
  );
}
