import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/users.api";
import { useNavigate } from "react-router-dom";
import "./GestionClientes.css";

export function GestionClientes() {
  const navigate = useNavigate();
  const [cantidadRegistros, setCantidadRegistros] = useState(10);
  const [campoBusqueda, setCampoBusqueda] = useState("");
  const [searchTexto, setSearchTexto] = useState("");
  const [clientes, setClientes] = useState([]);
  const [camposFiltro, setCamposFiltro] = useState({
    user_id: true,
    user_cedula: true,
    user_firstname: true,
    user_lastname: true,
    edad: true,
    user_email: true,
    user_phone: true,
    user_created: true,
  });

  useEffect(() => {
    async function fetchClientes() {
      try {
        const res = await getAllUsers();
        const clientesSolo = res.data.filter((user) => user.role === 2);
        setClientes(clientesSolo);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    }

    fetchClientes();
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

  const filteredClientes = clientes.filter((cliente) => {
    if (!campoBusqueda || !searchTexto) return true;
    if (campoBusqueda === "edad") {
      const edad = calcularEdad(cliente.user_dateofbirth);
      return edad.toString().includes(searchTexto);
    }
    const valor = cliente[campoBusqueda];
    if (!valor) return false;
    return valor.toString().toLowerCase().includes(searchTexto.toLowerCase());
  });

  const handleCrearCliente = () => {
    navigate("/clientes/crear");
  };

  return (
    <div className="gtclientes-container">
      <h2 className="gtclientes-title">Gestión de Clientes</h2>
      <div className="gtclientes-filter-section">
        <div>
          <label className="gtclientes-filter-label">Filtrar columnas:</label>
          <div className="gtclientes-checkbox-group">
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.user_id}
                onChange={() => toggleCampoFiltro("user_id")}
              />{" "}
              ID
            </label>
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.user_cedula}
                onChange={() => toggleCampoFiltro("user_cedula")}
              />{" "}
              Cédula
            </label>
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.user_firstname}
                onChange={() => toggleCampoFiltro("user_firstname")}
              />{" "}
              Nombre
            </label>
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.user_lastname}
                onChange={() => toggleCampoFiltro("user_lastname")}
              />{" "}
              Apellido
            </label>
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.edad}
                onChange={() => toggleCampoFiltro("edad")}
              />{" "}
              Edad
            </label>
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.user_email}
                onChange={() => toggleCampoFiltro("user_email")}
              />{" "}
              Email
            </label>
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.user_phone}
                onChange={() => toggleCampoFiltro("user_phone")}
              />{" "}
              Teléfono
            </label>
            <label className="gtclientes-checkbox-label">
              <input
                type="checkbox"
                checked={camposFiltro.user_created}
                onChange={() => toggleCampoFiltro("user_created")}
              />{" "}
              Creado
            </label>
          </div>
        </div>
      </div>

      <div className="gtclientes-search-section">
        <div>
          <label htmlFor="campoBusqueda" className="gtclientes-label">
            Buscar por:
          </label>
          <select
            id="campoBusqueda"
            className="gtclientes-select"
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
            <option value="user_created">Creado</option>
          </select>

          <input
            className="gtclientes-input"
            type={campoBusqueda === "user_created" ? "date" : "text"}
            placeholder="Buscar..."
            value={searchTexto}
            onChange={(e) => setSearchTexto(e.target.value)}
          />
        </div>

        <label htmlFor="select-cantidad" className="gtclientes-label">
          Cantidad de registros:
        </label>
        <select
          id="select-cantidad"
          className="gtclientes-select"
          value={cantidadRegistros}
          onChange={(e) => setCantidadRegistros(parseInt(e.target.value))}
        >
          {[0, 10, 20, 30, 40, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button className="gtclientes-btn-crear" onClick={handleCrearCliente}>
          Crear Cliente
        </button>
      </div>

      <table className="gtclientes-table">
        <thead>
          <tr>
            {camposFiltro.user_id && <th>ID</th>}
            {camposFiltro.user_cedula && <th>Cédula</th>}
            {camposFiltro.user_firstname && <th>Nombre</th>}
            {camposFiltro.user_lastname && <th>Apellido</th>}
            {camposFiltro.edad && <th>Edad</th>}
            {camposFiltro.user_email && <th>Email</th>}
            {camposFiltro.user_phone && <th>Teléfono</th>}
            {camposFiltro.user_created && <th>Creado</th>}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.slice(0, cantidadRegistros).map((cliente) => (
            <tr key={cliente.user_id}>
              {camposFiltro.user_id && <td>{cliente.user_id}</td>}
              {camposFiltro.user_cedula && <td>{cliente.user_cedula}</td>}
              {camposFiltro.user_firstname && <td>{cliente.user_firstname}</td>}
              {camposFiltro.user_lastname && <td>{cliente.user_lastname}</td>}
              {camposFiltro.edad && (
                <td>{calcularEdad(cliente.user_dateofbirth)}</td>
              )}
              {camposFiltro.user_email && <td>{cliente.user_email}</td>}
              {camposFiltro.user_phone && <td>{cliente.user_phone}</td>}
              {camposFiltro.user_created && (
                <td>{new Date(cliente.user_created).toLocaleDateString()}</td>
              )}
              <td>
                <button
                  className="gtclientes-btn-ver"
                  onClick={() => navigate(`/clientes/ver/${cliente.user_id}`)}
                >
                  Ver
                </button>
                <button
                  className="gtclientes-btn-ver"
                  onClick={() =>
                    navigate(`/clientes/editar/${cliente.user_id}`)
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
