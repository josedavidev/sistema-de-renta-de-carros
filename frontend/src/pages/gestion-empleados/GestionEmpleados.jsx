import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/users.api";
import { useNavigate } from "react-router-dom";
import "./GestionEmpleados.css";

export function GestionEmpleados() {
  const navigate = useNavigate();
  const [cantidadRegistros, setCantidadRegistros] = useState(10);
  const [campoBusqueda, setCampoBusqueda] = useState("");
  const [searchTexto, setSearchTexto] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [camposFiltro, setCamposFiltro] = useState({
    user_id: true,
    user_cedula: true,
    user_firstname: true,
    user_lastname: true,
    edad: true,
    user_email: true,
    user_phone: true,
    role: true,
    user_created: true,
  });

  useEffect(() => {
    async function fetchEmpleados() {
      try {
        const res = await getAllUsers();
        const empleadosFiltrados = res.data.filter((user) =>
          [1, 3, 4, 5].includes(user.role),
        );
        setEmpleados(empleadosFiltrados);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    }
    fetchEmpleados();
  }, []);

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const toggleCampoFiltro = (campo) => {
    setCamposFiltro((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  const filteredEmpleados = empleados.filter((empleado) => {
    if (!campoBusqueda || !searchTexto) return true;
    if (campoBusqueda === "edad") {
      const edad = calcularEdad(empleado.user_dateofbirth);
      return edad.toString().includes(searchTexto);
    }
    const valor = empleado[campoBusqueda];
    if (!valor) return false;
    return valor.toString().toLowerCase().includes(searchTexto.toLowerCase());
  });

  const handleCrearEmpleado = () => {
    navigate("/empleados/crear");
  };

  return (
    <div className="gtempleados-container">
      <h2 className="gtempleados-title">Gestión de Empleados</h2>

      <section className="gtempleados-filtros">
        <div className="gtempleados-filtros-column">
          <label className="gtempleados-label">Columnas a mostrar:</label>
          <div className="gtempleados-checkboxes">
            {Object.keys(camposFiltro).map((campo) => (
              <label key={campo} className="gtempleados-checkbox-label">
                <input
                  type="checkbox"
                  checked={camposFiltro[campo]}
                  onChange={() => toggleCampoFiltro(campo)}
                />
                {
                  {
                    user_id: "ID",
                    user_cedula: "Cédula",
                    user_firstname: "Nombre",
                    user_lastname: "Apellido",
                    edad: "Edad",
                    user_email: "Email",
                    user_phone: "Teléfono",
                    role: "Role",
                    user_created: "Creado",
                  }[campo]
                }
              </label>
            ))}
          </div>
        </div>

        <div className="gtempleados-busqueda">
          <label
            className="gtempleados-label"
            htmlFor="gtempleados-campoBusqueda"
          >
            Buscar por:
          </label>
          <select
            id="gtempleados-campoBusqueda"
            className="gtempleados-select"
            value={campoBusqueda}
            onChange={(e) => setCampoBusqueda(e.target.value)}
          >
            <option value="">Seleccionar campo</option>
            <option value="user_id">ID</option>
            <option value="user_cedula">Cédula</option>
            <option value="user_firstname">Nombre</option>
            <option value="user_lastname">Apellido</option>
            <option value="edad">Edad</option>
            <option value="user_email">Email</option>
            <option value="user_phone">Teléfono</option>
            <option value="role">Role</option>
            <option value="user_created">Creado</option>
          </select>

          <input
            className="gtempleados-input"
            type={campoBusqueda === "user_created" ? "date" : "text"}
            placeholder="Buscar..."
            value={searchTexto}
            onChange={(e) => setSearchTexto(e.target.value)}
          />

          <label className="gtempleados-label" htmlFor="gtempleados-cantidad">
            Cantidad de registros:
          </label>
          <select
            id="gtempleados-cantidad"
            className="gtempleados-select"
            value={cantidadRegistros}
            onChange={(e) => setCantidadRegistros(parseInt(e.target.value))}
          >
            {[0, 10, 20, 30, 40, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <button
            className="gtempleados-btn-create"
            onClick={handleCrearEmpleado}
          >
            Crear Empleado
          </button>
        </div>
      </section>

      <table className="gtempleados-table">
        <thead>
          <tr>
            {camposFiltro.user_id && <th>ID</th>}
            {camposFiltro.user_cedula && <th>Cédula</th>}
            {camposFiltro.user_firstname && <th>Nombre</th>}
            {camposFiltro.user_lastname && <th>Apellido</th>}
            {camposFiltro.edad && <th>Edad</th>}
            {camposFiltro.user_email && <th>Email</th>}
            {camposFiltro.user_phone && <th>Teléfono</th>}
            {camposFiltro.role && <th>Role</th>}
            {camposFiltro.user_created && <th>Creado</th>}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmpleados.slice(0, cantidadRegistros).map((emp) => (
            <tr key={emp.user_id}>
              {camposFiltro.user_id && <td>{emp.user_id}</td>}
              {camposFiltro.user_cedula && <td>{emp.user_cedula}</td>}
              {camposFiltro.user_firstname && <td>{emp.user_firstname}</td>}
              {camposFiltro.user_lastname && <td>{emp.user_lastname}</td>}
              {camposFiltro.edad && (
                <td>{calcularEdad(emp.user_dateofbirth)}</td>
              )}
              {camposFiltro.user_email && <td>{emp.user_email}</td>}
              {camposFiltro.user_phone && <td>{emp.user_phone}</td>}
              {camposFiltro.role && <td>{emp.role}</td>}
              {camposFiltro.user_created && (
                <td>{new Date(emp.user_created).toLocaleDateString()}</td>
              )}
              <td className="gtempleados-actions">
                <button
                  className="gtempleados-btn-ver"
                  onClick={() => navigate(`/empleados/ver/${emp.user_id}`)}
                >
                  Ver
                </button>
                <button
                  className="gtempleados-btn-edit"
                  onClick={() => navigate(`/empleados/editar/${emp.user_id}`)}
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
