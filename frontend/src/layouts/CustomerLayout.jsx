import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function CustomerLayout({ children }) {
  return (
    <div>
      <Navbar />
      {/* Contenido principal (lo que viene de Home, Ayuda, etc.) */}
      <div>{children}</div>
      <Footer />
    </div>
  );
}
