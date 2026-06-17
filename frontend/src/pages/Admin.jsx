import React from "react";

export function Admin() {
  return (
    <div>
      <div>
        <h1>Buenas Señor 'name'</h1>
      </div>

      <div>
        <div>
          <h2>Estadísticas</h2>
        </div>
        <div>
          <div>
            <h3>Clientes</h3>
            <p>120</p>
          </div>
          <div>
            <h3>Empleados</h3>
            <p>15</p>
          </div>
          <div>
            <h3>Vehículos</h3>
            <p>42</p>
          </div>
          <div>
            <h3>Reservas activas</h3>
            <p>8</p>
          </div>
          <div>
            <h3>Soporte</h3>
            <p>12</p>
          </div>
        </div>
      </div>

      {/* Sección de Últimas Actividades */}
      <div>
        <div>
          <h2>Últimas Actividades</h2>
        </div>
        <ul>
          <li>Cliente 'John Doe' registró una nueva reserva</li>
          <li>Empleado 'Carlos' actualizó el vehículo con ID #235</li>
          <li>Se añadió un nuevo vehículo (Toyota Camry) al catálogo</li>
          <li>Cliente 'Maria' terminó su alquiler de vehículo</li>
        </ul>
      </div>

      {/* Sección de Alertas / Recordatorios */}
      <div>
        <h3>Alertas / Recordatorios</h3>
        <ul>
          <li>Verificar documento de identidad para el cliente 'Laura'</li>
          <li>Reserva #1016 pendiente de confirmación</li>
          <li>Devolución retrasada para el vehículo con ID #459</li>
          <li>El pago del cliente 'Michael' falló, requiere atención</li>
        </ul>
      </div>

      {/* Botones de Gestión */}
      <div>
        <div>
          <button>Gestionar Clientes</button>
        </div>
        <div>
          <button>Gestionar Empleados</button>
        </div>
        <div>
          <button>Gestionar Vehiculos</button>
        </div>
        <div>
          <button>Ver Informes</button>
        </div>
      </div>
    </div>
  );
}
