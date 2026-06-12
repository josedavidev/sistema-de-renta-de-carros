import React, { useState } from "react";
import { createReporte } from "../../services/reports.api";
import "./Ayuda.css";

export function Ayuda() {
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError("");

    const reporte = {
      correo_usuario: email,
      descripcion: descripcion,
    };

    try {
      console.log("Enviando el siguiente reporte:", reporte);
      await createReporte(reporte);
      setSubmitted(true);
    } catch (err) {
      setError("Hubo un problema al enviar el reporte. Intenta nuevamente.");
      console.error("Error al enviar el reporte:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ayuda-container">
      <h1>Ayuda</h1>
      {!submitted ? (
        <form className="ayuda-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electronico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="descripcion">Descripcion del problema:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      ) : (
        <div className="ayuda-confirmation">
          <p>
            Uno de nuestros tecnicos se pondra en contacto con usted a traves de
            su correo.
          </p>
        </div>
      )}
    </div>
  );
}
