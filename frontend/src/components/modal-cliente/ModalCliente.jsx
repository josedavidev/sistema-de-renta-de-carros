import React from "react";
import "./ModalCliente.css";

export function ModalCliente({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Formulario del Cliente</h2>
        <form className="formulario-cliente">
          <div className="form-row">
            <div className="form-group">
              <label>Nombre completo</label>
              <input type="text" placeholder="Ej: Juan Pérez" />
            </div>
            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input type="date" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cédula del usuario</label>
              <input type="text" placeholder="Ej: 123456789" />
            </div>
            <div className="form-group">
              <label>Licencia de conducción</label>
              <input type="text" placeholder="Ej: ABC123" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" placeholder="Ej: correo@ejemplo.com" />
            </div>
            <div className="form-group">
              <label>Dirección de residencia</label>
              <input type="text" placeholder="Ej: Calle 123, Ciudad" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha vencimiento licencia</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Teléfono de contacto</label>
              <input type="tel" placeholder="Ej: 3001234567" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Documentación</label>
              <input type="file" accept="application/pdf" />
            </div>
          </div>

          <div className="botones">
            <button type="button" className="btn-cerrar" onClick={onClose}>
              Cerrar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
