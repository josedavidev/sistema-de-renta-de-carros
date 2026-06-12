import React from "react";
import { Navbar } from "../../components/nav-bar/Navbar";
import { Footer } from "../../components/footer/Footer";
import "./CustomerLayout.css";

export function CustomerLayout({ children }) {
  return (
    <div className="page-container">
      <Navbar />
      {/* Contenido principal (lo que viene de Home, Ayuda, etc.) */}
      <div className="content-wrap">{children}</div>
      <Footer />
    </div>
  );
}
