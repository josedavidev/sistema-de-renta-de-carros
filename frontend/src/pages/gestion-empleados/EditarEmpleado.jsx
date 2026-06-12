import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../services/users.api";
import { Formulario } from "../../components/formulario/Formulario";
import { toast } from "react-hot-toast";

export function EditarEmpleado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    async function fetchEmpleado() {
      try {
        const res = await getUser(id);
        const data = res.data;

        const mappedEmpleado = {
          user_username: data.user_username,
          user_firstname: data.user_firstname,
          user_secondname: data.user_secondname,
          user_lastname: data.user_lastname,
          user_second_lastname: data.user_second_lastname,
          user_dateofbirth: data.user_dateofbirth,
          user_cedula: data.user_cedula,
          user_email: data.user_email,
          user_phone: data.user_phone,
          role: data.role, // necesario para el <select>
        };

        setEmpleado(mappedEmpleado);
      } catch (error) {
        toast.error("Error al cargar empleado", {
          position: "bottom-right",
          style: {
            background: "#ff3a3a",
            color: "#fff",
          },
        });
        console.error(error);
      }
    }

    fetchEmpleado();
  }, [id]);

  const handleUpdate = async (data) => {
    const { confirmPassword, ...empleadoData } = data;

    try {
      await updateUser(id, empleadoData);
      toast.success("Empleado actualizado correctamente", {
        position: "bottom-right",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      navigate("/empleados");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error al actualizar empleado", {
        position: "bottom-right",
        style: {
          background: "#ff3a3a",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div>
      {empleado && (
        <Formulario
          mode="edit"
          defaultValues={empleado}
          onSubmit={handleUpdate}
          title="Editar Empleado"
          buttonText="Editar"
          userId={id}
          esEmpleado={true}
        />
      )}
    </div>
  );
}
