import React from "react";

export function Receptionist() {
  return (
    <div>
      <div>
        <span>🔍</span>
        <input type="text" placeholder="Cedula del usuario" />
        <select>
          <option>Estado de reserva</option>
        </select>
        <button>Buscar usuario</button>
      </div>

      <div>
        <div>
          <h3>Próximas Devoluciones</h3>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div></div>

        <div>
          <h3>Próximas Entregas</h3>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
