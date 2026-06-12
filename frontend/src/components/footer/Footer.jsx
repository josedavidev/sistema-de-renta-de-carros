// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

export function Footer(){
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="#sobre-nosotros">Sobre Nosotros</a>
        <a href="/ayuda">Ayuda</a>
        <a href="#terminos">Términos y condiciones</a>
      </div>
      <p>© 2025 Rent a Car. Todos los derechos reservados.</p>
    </footer>
  );
};
