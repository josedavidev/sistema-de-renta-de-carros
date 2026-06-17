import React from "react";
import { useNavigate } from "react-router-dom";
import { Formulario } from "../components/Formulario";
import { registerUser } from "../services/users.api";
import { toast } from "react-hot-toast";

export function CrearEmpleado() {
  const navigate = useNavigate();

  const handleCrearEmpleado = async (data) => {
    const { confirmPassword, ...empleadoData } = data;

    await registerUser(empleadoData);
    toast.success("Empleado creado correctamente", {
      position: "bottom-right",
    });
    navigate("/empleados");
  };

  return (
    <div>
      <Formulario
        mode="create"
        onSubmit={handleCrearEmpleado}
        title="Crear Empleado"
        buttonText="Crear"
        esEmpleado={true}
      />
    </div>
  );
}
