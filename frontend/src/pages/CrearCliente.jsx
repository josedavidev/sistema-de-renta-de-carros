import React from "react";
import { useNavigate } from "react-router-dom";
import { Formulario } from "../components/Formulario";
import { registerUser } from "../services/users.api";
import { toast } from "react-hot-toast";

export function CrearCliente() {
  const navigate = useNavigate();

  const handleCrearCliente = async (data) => {
    const { confirmPassword, ...clienteData } = data;

    const finalData = {
      ...clienteData,
      role: 2,
    };

    await registerUser(finalData);
    toast.success("Cliente creado correctamente", {
      position: "bottom-right",
    });
    navigate("/clientes");
  };

  return (
    <div>
      <Formulario
        mode="create"
        onSubmit={handleCrearCliente}
        title="Crear Cliente"
        buttonText="Crear"
      />
    </div>
  );
}
