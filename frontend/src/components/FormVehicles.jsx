import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteVehicle } from "../services/vehicles.api";
import { getAllCategories, getAllStatuses } from "../services/vehicles.api";
import { toast } from "react-hot-toast";

export function FormVehicles({
  defaultValues = {},
  buttonText = "",
  title = "",
  onSubmit,
  mode = "",
  vehicleId,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const handleInternalSubmit = handleSubmit(async (data) => {
    if (!onSubmit) return;
    const lowercasedData = {
      ...data,
      vehicle_license_plate: data.vehicle_license_plate.toLowerCase().trim(),
      vehicle_model: data.vehicle_model.toLowerCase().trim(),
      vehicle_brand: data.vehicle_brand.toLowerCase().trim(),
      vehicle_color: data.vehicle_color.toLowerCase().trim(),
      vehicle_location: data.vehicle_location.toLowerCase().trim(),
      vehicle_image: data.vehicle_image.trim(),
      vehicle_description: data.vehicle_description.toLowerCase().trim(),
    };

    await onSubmit(lowercasedData);
  });

  const handleDelete = async () => {
    const confirmado = window.confirm(
      "¿Estás seguro/a de que deseas eliminar este vehiculo?",
    );
    if (!confirmado) return;

    try {
      await deleteVehicle(vehicleId);
      toast.success("Vehiculo eliminado correctamente");
      navigate("/vehiculos");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el vehículo");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, statusRes] = await Promise.all([
          getAllCategories(),
          getAllStatuses(),
        ]);
        setCategorias(catRes.data);
        setEstados(statusRes.data);
      } catch (error) {
        console.error("Error al cargar categorías o estados", error);
      }
    }

    fetchData();
  }, []);

  return (
    <form onSubmit={handleInternalSubmit}>
      <div>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          <div>
            <div>
              <label htmlFor="form-plate">Placa:</label>
              <input
                id="form-plate"
                type="text"
                placeholder="Placa"
                disabled={mode === "view"}
                {...register("vehicle_license_plate", { required: true })}
              />
              {errors.vehicle_license_plate && <span>Placa es requerida</span>}
            </div>
            <div>
              <label htmlFor="form-model">Modelo:</label>
              <input
                id="form-model"
                type="text"
                placeholder="Modelo"
                disabled={mode === "view"}
                {...register("vehicle_model", { required: true })}
              />
              {errors.vehicle_model && <span>Modelo es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-color">Color:</label>
              <input
                id="form-color"
                type="text"
                placeholder="Color"
                disabled={mode === "view"}
                {...register("vehicle_color", { required: true })}
              />
              {errors.vehicle_color && <span>Color es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-doors">Puertas:</label>
              <input
                id="form-doors"
                type="number"
                placeholder="Puertas"
                disabled={mode === "view"}
                {...register("vehicle_doors", { required: true })}
              />
              {errors.vehicle_doors && <span>Puertas es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-category">Categoría:</label>
              <select
                id="form-category"
                disabled={mode === "view"}
                {...register("category_id", { required: true })}
              >
                <option value="">Seleccionar</option>
                {categorias.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
              {errors.category_id && <span>Categoría es requerida</span>}
            </div>
            <div>
              <label htmlFor="form-transmission">Tipo de transmisión:</label>
              <select
                id="form-transmission"
                disabled={mode === "view"}
                {...register("vehicle_transmission", { required: true })}
              >
                <option value="">Seleccionar</option>
                <option value="manual">Manual</option>
                <option value="automatica">Automática</option>
                <option value="semiautomatica">Semiautomática</option>
                <option value="cvt">CVT (Transmisión Variable Continua)</option>
                <option value="dual_clutch">Doble Embrague</option>
                <option value="tiptronic">Tiptronic</option>
              </select>
              {errors.vehicle_transmission && (
                <span>Tipo de transmisión es requerido</span>
              )}
            </div>
            <div>
              <label htmlFor="form-hour-rate">Precio por hora:</label>
              <input
                id="form-hour-rate"
                type="decimal"
                placeholder="Precio por hora"
                disabled={mode === "view"}
                {...register("vehicle_hour_rate", { required: true })}
              />
              {errors.vehicle_hour_rate && (
                <span>Precio por hora es requerido</span>
              )}
            </div>
            <div>
              <label htmlFor="form-description">Descripcion:</label>
              <textarea
                id="form-description"
                type="text"
                placeholder="Descripcion"
                disabled={mode === "view"}
                {...register("vehicle_description", { required: true })}
              />
              {errors.vehicle_description && (
                <span>Descripcion es requerida</span>
              )}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="form-brand">Marca:</label>
              <input
                id="form-brand"
                type="text"
                placeholder="Marca"
                disabled={mode === "view"}
                {...register("vehicle_brand", { required: true })}
              />
              {errors.vehicle_brand && <span>Marca es requerida</span>}
            </div>
            <div>
              <label htmlFor="form-year">Año:</label>
              <input
                id="form-year"
                type="number"
                placeholder="Año"
                disabled={mode === "view"}
                {...register("vehicle_year", { required: true })}
              />
              {errors.vehicle_year && <span>Año es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-seats">Asientos:</label>
              <input
                id="form-seats"
                type="number"
                placeholder="Asientos"
                disabled={mode === "view"}
                {...register("vehicle_seats", { required: true })}
              />
              {errors.vehicle_seats && <span>Asientos es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-enginetype">Tipo de motor:</label>
              <select
                id="form-enginetype"
                disabled={mode === "view"}
                {...register("vehicle_engine_type", { required: true })}
              >
                <option value="">Seleccionar</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="hibrido">Híbrido</option>
                <option value="electrico">Eléctrico</option>
                <option value="gas_natural">Gas Natural</option>
                <option value="glp">GLP (Gas Licuado de Petróleo)</option>
                <option value="etanol">Etanol</option>
                <option value="hidrogeno">Hidrógeno</option>
              </select>
              {errors.vehicle_engine_type && (
                <span>Tipo de motor es requerido</span>
              )}
            </div>
            <div>
              <label htmlFor="form-mileage">Kilometraje:</label>
              <input
                id="form-mileage"
                type="number"
                placeholder="Kilometraje"
                disabled={mode === "view"}
                {...register("vehicle_mileage", { required: true })}
              />
              {errors.vehicle_mileage && <span>Kilometraje es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-location">Ubicación:</label>
              <input
                id="form-location"
                type="text"
                placeholder="Ubicación"
                disabled={mode === "view"}
                {...register("vehicle_location", { required: true })}
              />
              {errors.vehicle_location && <span>Ubicación es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-image">Imagen:</label>
              <input
                id="form-image"
                type="text"
                placeholder="Imagen"
                disabled={mode === "view"}
                {...register("vehicle_image", { required: true })}
              />
              {errors.vehicle_image && <span>Imagen es requerido</span>}
            </div>
            <div>
              <label htmlFor="form-status">Estado:</label>
              <select
                id="form-status"
                disabled={mode === "view"}
                {...register("status_id", { required: true })}
              >
                <option value="">Seleccionar</option>
                {estados.map((estado) => (
                  <option key={estado.status_id} value={estado.status_id}>
                    {estado.status_name}
                  </option>
                ))}
              </select>
              {errors.status_id && <span>Estado es requerido</span>}
            </div>
          </div>
        </div>
        <div>
          {(mode === "create" || mode === "edit") && (
            <button>{buttonText}</button>
          )}
          <button type="button" onClick={() => navigate("/vehiculos")}>
            Volver
          </button>
          {mode === "edit" && (
            <button type="button" onClick={handleDelete}>
              Eliminar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
