import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicle } from "../services/vehicles.api";
import { FormVehicles } from "../components/FormVehicles";
import toast from "react-hot-toast";

export function VerVehiculo() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehiculo() {
      try {
        const res = await getVehicle(id);
        // Reorganiza la data para usar en defaultValues
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

  if (loading) return <p>Cargando...</p>;
  if (!vehiculo) return <p>No se encontró el vehículo</p>;

  return (
    <FormVehicles title="Ver Vehículo" defaultValues={vehiculo} mode="view" />
  );
}
