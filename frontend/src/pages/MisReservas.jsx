import React from "react";

export function MisReservas() {
  return (
    <div>
      <div>
        <h1>Consultar Reserva</h1>
        <p>
          Informa tu código y tu número de documento para consultar tus
          reservas.
        </p>

        <div>
          <label>
            <input type="radio" name="docType" defaultChecked />
            <span>CC</span>
          </label>
          <label>
            <input type="radio" name="docType" />
            <span>Doc. Extranjero</span>
          </label>
          <label>
            <input type="radio" name="docType" />
            <span>Pasaporte</span>
          </label>
        </div>

        <div>
          <label>Número de documento*</label>
          <input type="text" placeholder="" />
        </div>

        <div>
          <label>Código de la reserva*</label>
          <input type="text" placeholder="" />
        </div>

        <button>CONSULTAR</button>
      </div>
    </div>
  );
}
