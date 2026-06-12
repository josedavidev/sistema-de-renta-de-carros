import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function ClientHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function capitalize(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return (
    <div className="clienthome-container">
      <h1>
        ¡Hola {`${capitalize(user.firstname)} ${capitalize(user.lastname)}`}!
        Bienvenido.
      </h1>
    </div>
  );
}
