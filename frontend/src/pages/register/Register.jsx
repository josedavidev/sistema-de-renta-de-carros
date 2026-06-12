import React from "react";
import { registerUser } from "../../services/users.api";
import { toast } from "react-hot-toast";
import { Formulario } from "../../components/formulario/Formulario";

export function Register() {
  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const finalData = {
        ...userData,
        role: 2,
      };
      await registerUser(finalData);
      toast.success("Registro exitoso", {
        position: "bottom-right",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
    } catch (error) {
      if (
        error.response?.data?.error === "El nombre de usuario ya está en uso"
      ) {
        toast.error("Este nombre de usuario ya está en uso. Elija otro.", {
          position: "bottom-right",
          style: {
            background: "#ff3a3a",
            color: "#fff",
          },
        });
      } else {
        toast.error("Error al registrar usuario", {
          position: "bottom-right",
          style: {
            background: "#ff3a3a",
            color: "#fff",
          },
        });
      }
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="register-container">
      <Formulario
        mode="create"
        onSubmit={onSubmit}
        title="Registrarse"
        buttonText="Registrar"
      />
    </div>
  );
}
