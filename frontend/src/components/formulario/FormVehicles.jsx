import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteVehicle } from "../../services/vehicles.api";
import { getAllCategories, getAllStatuses } from "../../services/vehicles.api";
import { toast } from "react-hot-toast";
import "./FormVehicles.css";

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
        <div className="formvehicles-div-title">
          <h1 className="formvehicles-title">{title}</h1>
        </div>
        <div className="formvehicles-column">
          <div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-plate" className="formvehicles-label">
                Placa:
              </label>
              <input
                id="form-plate"
                className="formvehicles-input"
                type="text"
                placeholder="Placa"
                disabled={mode === "view"}
                {...register("vehicle_license_plate", { required: true })}
              />
              {errors.vehicle_license_plate && (
                <span className="formvehicles-error">Placa es requerida</span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-model" className="formvehicles-label">
                Modelo:
              </label>
              <input
                id="form-model"
                className="formvehicles-input"
                type="text"
                placeholder="Modelo"
                disabled={mode === "view"}
                {...register("vehicle_model", { required: true })}
              />
              {errors.vehicle_model && (
                <span className="formvehicles-error">Modelo es requerido</span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-color" className="formvehicles-label">
                Color:
              </label>
              <input
                id="form-color"
                className="formvehicles-input"
                type="text"
                placeholder="Color"
                disabled={mode === "view"}
                {...register("vehicle_color", { required: true })}
              />
              {errors.vehicle_color && (
                <span className="formvehicles-error">Color es requerido</span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-doors" className="formvehicles-label">
                Puertas:
              </label>
              <input
                id="form-doors"
                className="formvehicles-input"
                type="number"
                placeholder="Puertas"
                disabled={mode === "view"}
                {...register("vehicle_doors", { required: true })}
              />
              {errors.vehicle_doors && (
                <span className="formvehicles-error">Puertas es requerido</span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-category" className="formvehicles-label">
                Categoría:
              </label>
              <select
                id="form-category"
                className="formvehicles-input"
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
              {errors.category_id && (
                <span className="formvehicles-error">
                  Categoría es requerida
                </span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-transmission" className="formvehicles-label">
                Tipo de transmisión:
              </label>
              <select
                id="form-transmission"
                className="formvehicles-input"
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
                <span className="formvehicles-error">
                  Tipo de transmisión es requerido
                </span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-hour-rate" className="formvehicles-label">
                Precio por hora:
              </label>
              <input
                id="form-hour-rate"
                className="formvehicles-input"
                type="decimal"
                placeholder="Precio por hora"
                disabled={mode === "view"}
                {...register("vehicle_hour_rate", { required: true })}
              />
              {errors.vehicle_hour_rate && (
                <span className="formvehicles-error">
                  Precio por hora es requerido
                </span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-description" className="formvehicles-label">
                Descripcion:
              </label>
              <textarea
                id="form-description"
                className="formvehicles-input"
                type="text"
                placeholder="Descripcion"
                disabled={mode === "view"}
                {...register("vehicle_description", { required: true })}
              />
              {errors.vehicle_description && (
                <span className="formvehicles-error">
                  Descripcion es requerida
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-brand" className="formvehicles-label">
                Marca:
              </label>
              <input
                id="form-brand"
                className="formvehicles-input"
                type="text"
                placeholder="Marca"
                disabled={mode === "view"}
                {...register("vehicle_brand", { required: true })}
              />
              {errors.vehicle_brand && (
                <span className="formvehicles-error">Marca es requerida</span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-year" className="formvehicles-label">
                Año:
              </label>
              <input
                id="form-year"
                className="formvehicles-input"
                type="number"
                placeholder="Año"
                disabled={mode === "view"}
                {...register("vehicle_year", { required: true })}
              />
              {errors.vehicle_year && (
                <span className="formvehicles-error">Año es requerido</span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-seats" className="formvehicles-label">
                Asientos:
              </label>
              <input
                id="form-seats"
                className="formvehicles-input"
                type="number"
                placeholder="Asientos"
                disabled={mode === "view"}
                {...register("vehicle_seats", { required: true })}
              />
              {errors.vehicle_seats && (
                <span className="formvehicles-error">
                  Asientos es requerido
                </span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-enginetype" className="formvehicles-label">
                Tipo de motor:
              </label>
              <select
                id="form-enginetype"
                className="formvehicles-input"
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
                <span className="formvehicles-error">
                  Tipo de motor es requerido
                </span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-mileage" className="formvehicles-label">
                Kilometraje:
              </label>
              <input
                id="form-mileage"
                className="formvehicles-input"
                type="number"
                placeholder="Kilometraje"
                disabled={mode === "view"}
                {...register("vehicle_mileage", { required: true })}
              />
              {errors.vehicle_mileage && (
                <span className="formvehicles-error">
                  Kilometraje es requerido
                </span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-location" className="formvehicles-label">
                Ubicación:
              </label>
              <input
                id="form-location"
                className="formvehicles-input"
                type="text"
                placeholder="Ubicación"
                disabled={mode === "view"}
                {...register("vehicle_location", { required: true })}
              />
              {errors.vehicle_location && (
                <span className="formvehicles-error">
                  Ubicación es requerido
                </span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-image" className="formvehicles-label">
                Imagen:
              </label>
              <input
                id="form-image"
                className="formvehicles-input"
                type="text"
                placeholder="Imagen"
                disabled={mode === "view"}
                {...register("vehicle_image", { required: true })}
              />
              {errors.vehicle_image && (
                <span className="formvehicles-error">Imagen es requerido</span>
              )}
            </div>
            <div className="formvehicles-div-input">
              <label htmlFor="form-status" className="formvehicles-label">
                Estado:
              </label>
              <select
                id="form-status"
                className="formvehicles-input"
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
              {errors.status_id && (
                <span className="formvehicles-error">Estado es requerido</span>
              )}
            </div>
          </div>
        </div>
        <div className="formvehicles-div-buttons">
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
