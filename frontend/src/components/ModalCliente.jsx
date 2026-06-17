import React from "react";

export function ModalCliente({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h2>Formulario del Cliente</h2>
        <form>
          <div>
            <div>
              <label>Nombre completo</label>
              <input type="text" placeholder="Ej: Juan Pérez" />
            </div>
            <div>
              <label>Fecha de nacimiento</label>
              <input type="date" />
            </div>
          </div>

          <div>
            <div>
              <label>Cédula del usuario</label>
              <input type="text" placeholder="Ej: 123456789" />
            </div>
            <div>
              <label>Licencia de conducción</label>
              <input type="text" placeholder="Ej: ABC123" />
            </div>
          </div>

          <div>
            <div>
              <label>Correo electrónico</label>
              <input type="email" placeholder="Ej: correo@ejemplo.com" />
            </div>
            <div>
              <label>Dirección de residencia</label>
              <input type="text" placeholder="Ej: Calle 123, Ciudad" />
            </div>
          </div>

          <div>
            <div>
              <label>Fecha vencimiento licencia</label>
              <input type="date" />
            </div>
            <div>
              <label>Teléfono de contacto</label>
              <input type="tel" placeholder="Ej: 3001234567" />
            </div>
          </div>

          <div>
            <div>
              <label>Documentación</label>
              <input type="file" accept="application/pdf" />
            </div>
          </div>

          <div>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
