import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../services/users.api";
import { Formulario } from "../components/Formulario";
import { toast } from "react-hot-toast";

export function VerEmpleado() {
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
          role: data.role,
        };

        setEmpleado(mappedEmpleado);
      } catch (error) {
        toast.error("Error al cargar empleado", {
          position: "bottom-right",
        });
        console.error(error);
      }
    }

    fetchEmpleado();
  }, [id]);

  return (
    <div>
      {empleado && (
        <Formulario
          mode="view"
          defaultValues={empleado}
          title="Detalles del Empleado"
          esEmpleado={true}
        />
      )}
    </div>
  );
}
