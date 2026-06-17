import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVehicles } from "../services/vehicles.api";

export function GestionVehiculos() {
  const navigate = useNavigate();
  const [cantidadRegistros, setCantidadRegistros] = useState(10);
  const [campoBusqueda, setCampoBusqueda] = useState("");
  const [searchTexto, setSearchTexto] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [camposFiltro, setCamposFiltro] = useState({
    vehicle_id: true,
    vehicle_license_plate: true,
    vehicle_brand: true,
    vehicle_model: true,
    vehicle_year: true,
    vehicle_color: true,
    vehicle_mileage: true,
    vehicle_hour_rate: true,
    category_name: true,
    status_name: true,
    vehicle_created: true,
  });

  useEffect(() => {
    async function fetchVehiculos() {
      try {
        const res = await getAllVehicles();
        setVehiculos(res.data);
      } catch (error) {
        console.error("Error al obtener vehículos:", error);
      }
    }
    fetchVehiculos();
  }, []);

  const toggleCampoFiltro = (campo) => {
    setCamposFiltro((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  const filteredVehiculos = vehiculos.filter((vehiculo) => {
    if (!campoBusqueda || !searchTexto) return true;
    const valor =
      campoBusqueda === "category_name"
        ? vehiculo.category.category_name
        : campoBusqueda === "status_name"
          ? vehiculo.status.status_name
          : vehiculo[campoBusqueda];
    if (!valor) return false;
    return valor.toString().toLowerCase().includes(searchTexto.toLowerCase());
  });

  const handleCrearVehiculo = () => {
    navigate("/vehiculos/crear");
  };

  return (
    <div>
      <h2>Gestión de Vehículos</h2>

      <section>
        <div>
          <label>Columnas a mostrar:</label>
          <div>
            {Object.keys(camposFiltro).map((campo) => (
              <label key={campo}>
                <input
                  type="checkbox"
                  checked={camposFiltro[campo]}
                  onChange={() => toggleCampoFiltro(campo)}
                />
                {
                  {
                    vehicle_id: "ID",
                    vehicle_license_plate: "Placa",
                    vehicle_brand: "Marca",
                    vehicle_model: "Modelo",
                    vehicle_year: "Año",
                    vehicle_color: "Color",
                    vehicle_mileage: "Kilometraje",
                    vehicle_hour_rate: "Tarifa/hora",
                    category_name: "Categoría",
                    status_name: "Estado",
                    vehicle_created: "Creado",
                  }[campo]
                }
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="campoBusqueda">Buscar por:</label>
          <select
            id="campoBusqueda"
            value={campoBusqueda}
            onChange={(e) => setCampoBusqueda(e.target.value)}
          >
            <option value="">Seleccionar campo</option>
            <option value="vehicle_id">ID</option>
            <option value="vehicle_license_plate">Placa</option>
            <option value="vehicle_brand">Marca</option>
            <option value="vehicle_model">Modelo</option>
            <option value="vehicle_year">Año</option>
            <option value="vehicle_color">Color</option>
            <option value="vehicle_mileage">Kilometraje</option>
            <option value="vehicle_hour_rate">Tarifa/hora</option>
            <option value="category_name">Categoría</option>
            <option value="status_name">Estado</option>
            <option value="vehicle_created">Creado</option>
          </select>

          <input
            type={campoBusqueda === "vehicle_created" ? "date" : "text"}
            placeholder="Buscar..."
            value={searchTexto}
            onChange={(e) => setSearchTexto(e.target.value)}
          />

          <label htmlFor="cantidad">Registros:</label>
          <select
            id="cantidad"
            value={cantidadRegistros}
            onChange={(e) => setCantidadRegistros(parseInt(e.target.value))}
          >
            {[0, 10, 20, 30, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <button onClick={handleCrearVehiculo}>Crear Vehículo</button>
        </div>
      </section>

      <table>
        <thead>
          <tr>
            {camposFiltro.vehicle_id && <th>ID</th>}
            {camposFiltro.vehicle_license_plate && <th>Placa</th>}
            {camposFiltro.vehicle_brand && <th>Marca</th>}
            {camposFiltro.vehicle_model && <th>Modelo</th>}
            {camposFiltro.vehicle_year && <th>Año</th>}
            {camposFiltro.vehicle_color && <th>Color</th>}
            {camposFiltro.vehicle_mileage && <th>Kilometraje</th>}
            {camposFiltro.vehicle_hour_rate && <th>Tarifa/hora</th>}
            {camposFiltro.category_name && <th>Categoría</th>}
            {camposFiltro.status_name && <th>Estado</th>}
            {camposFiltro.vehicle_created && <th>Creado</th>}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehiculos.slice(0, cantidadRegistros).map((veh) => (
            <tr key={veh.vehicle_id}>
              {camposFiltro.vehicle_id && <td>{veh.vehicle_id}</td>}
              {camposFiltro.vehicle_license_plate && (
                <td>{veh.vehicle_license_plate}</td>
              )}
              {camposFiltro.vehicle_brand && <td>{veh.vehicle_brand}</td>}
              {camposFiltro.vehicle_model && <td>{veh.vehicle_model}</td>}
              {camposFiltro.vehicle_year && <td>{veh.vehicle_year}</td>}
              {camposFiltro.vehicle_color && <td>{veh.vehicle_color}</td>}
              {camposFiltro.vehicle_mileage && <td>{veh.vehicle_mileage}</td>}
              {camposFiltro.vehicle_hour_rate && (
                <td>${veh.vehicle_hour_rate}</td>
              )}
              {camposFiltro.category_name && (
                <td>{veh.category?.category_name}</td>
              )}
              {camposFiltro.status_name && <td>{veh.status?.status_name}</td>}
              {camposFiltro.vehicle_created && (
                <td>{new Date(veh.vehicle_created).toLocaleDateString()}</td>
              )}
              <td>
                <button
                  onClick={() => navigate(`/vehiculos/ver/${veh.vehicle_id}`)}
                >
                  Ver
                </button>
                <button
                  onClick={() =>
                    navigate(`/vehiculos/editar/${veh.vehicle_id}`)
                  }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
