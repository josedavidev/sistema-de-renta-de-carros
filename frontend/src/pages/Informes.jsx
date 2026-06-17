import React, { useState } from "react";

export function Informes() {
  // Estados para capturar los datos del formulario.
  const [documento, setDocumento] = useState("");
  const [codigoReserva, setCodigoReserva] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [fechaRecepcion, setFechaRecepcion] = useState("");
  const [horaRecepcion, setHoraRecepcion] = useState("");
  const [daño, setDaño] = useState("");
  const [estadoVehiculo, setEstadoVehiculo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [descripcionDaño, setDescripcionDaño] = useState("");

  // Opcional: Mostrar la descripción del daño solo si se selecciona un daño
  const showDescripcion = daño && daño !== "Sin daño";

  const handleConfirm = () => {
    // Aquí se procesarían los datos; en este ejemplo, el botón no es funcional.
    alert("Informe confirmado (simulado)");
  };

  return (
    <div>
      <div>
        <h1>Informe de Clientes</h1>
        <div>
          {/* Fila 1: Documento y Nombre */}
          <div>
            <div>
              <label>Documento del usuario*</label>
              <div>
                <input
                  type="text"
                  placeholder=""
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
                <span>🔍</span>
              </div>
            </div>
            <div>
              <label>Nombre del usuario*</label>
              <input
                type="text"
                placeholder=""
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
          </div>
          {/* Fila 2: Fecha y hora de recepción */}
          <div>
            <div>
              <label>Fecha de recepción*</label>
              <input
                type="date"
                value={fechaRecepcion}
                onChange={(e) => setFechaRecepcion(e.target.value)}
              />
            </div>
            <div>
              <label>Hora de recepción*</label>
              <input
                type="time"
                value={horaRecepcion}
                onChange={(e) => setHoraRecepcion(e.target.value)}
              />
            </div>
          </div>
          {/* Fila 3: Daño y Estado del vehículo */}
          <div>
            <div>
              <label>Daño*</label>
              <select value={daño} onChange={(e) => setDaño(e.target.value)}>
                <option value="">Selecciona</option>
                <option value="Sin daño">Sin daño</option>
                <option value="Rayadura">Rayadura</option>
                <option value="Abolladura">Abolladura</option>
                <option value="Cristal roto">Cristal roto</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label>Estado del vehículo*</label>
              <input
                type="text"
                placeholder=""
                value={estadoVehiculo}
                onChange={(e) => setEstadoVehiculo(e.target.value)}
              />
            </div>
          </div>
          {/* Fila 4: Observaciones */}
          <div>
            <div>
              <label>Observaciones</label>
              <textarea
                placeholder=""
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              ></textarea>
            </div>
          </div>
          {/* Condicional: Descripción del daño */}
          {showDescripcion && (
            <div>
              <div>
                <label>Descripción del daño</label>
                <textarea
                  placeholder=""
                  value={descripcionDaño}
                  onChange={(e) => setDescripcionDaño(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
          {/* Botón de Confirmar */}
          <button type="button" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
