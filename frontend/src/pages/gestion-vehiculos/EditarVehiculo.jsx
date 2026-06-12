// src/pages/vehiculos/EditarVehiculo.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicle, updateVehicle } from "../../services/vehicles.api";
import { FormVehicles } from "../../components/formulario/FormVehicles";
import toast from "react-hot-toast";

export function EditarVehiculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehiculo() {
      try {
        const res = await getVehicle(id);
        const data = {
          ...res.data,
          category_id: res.data.category?.category_id || "",
          status_id: res.data.status?.status_id || "",
        };
        setVehiculo(data);
      } catch (error) {
        toast.error("Error al cargar el vehículo.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVehiculo();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateVehicle(id, data);
      toast.success("Vehículo actualizado correctamente");
      navigate("/vehiculos");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el vehículo.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!vehiculo) return <p>Vehículo no encontrado</p>;

  return (
    <FormVehicles
      title="Editar Vehículo"
      defaultValues={vehiculo}
      buttonText="Editar Vehículo"
      mode="edit"
      onSubmit={handleUpdate}
      vehicleId={id}
    />
  );
}
