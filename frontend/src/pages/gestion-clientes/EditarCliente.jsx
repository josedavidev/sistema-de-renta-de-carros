import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../services/users.api";
import { Formulario } from "../../components/formulario/Formulario";
import { toast } from "react-hot-toast";

export function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    async function fetchCliente() {
      try {
        const res = await getUser(id);
        const data = res.data;

        const mappedCliente = {
          user_username: data.user_username,
          user_firstname: data.user_firstname,
          user_secondname: data.user_secondname,
          user_lastname: data.user_lastname,
          user_second_lastname: data.user_second_lastname,
          user_dateofbirth: data.user_dateofbirth,
          user_cedula: data.user_cedula,
          user_email: data.user_email,
          user_phone: data.user_phone,
        };

        setCliente(mappedCliente);
      } catch (error) {
        toast.error("Error al cargar cliente", {
          position: "bottom-right",
          style: {
            background: "#ff3a3a",
            color: "#fff",
          },
        });
        console.error(error);
      }
    }

    fetchCliente();
  }, [id]);

  const handleUpdate = async (data) => {
    const { confirmPassword, ...clienteData } = data;

    try {
      await updateUser(id, {
        ...clienteData,
        role: 2,
      });
      toast.success("Cliente actualizado correctamente", {
        position: "bottom-right",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      navigate("/clientes");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error al actualizar cliente", {
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
      {cliente && (
        <>
          <Formulario
            mode="edit"
            defaultValues={cliente}
            onSubmit={handleUpdate}
            title="Editar Cliente"
            buttonText="Editar"
            userId={id}
          />
        </>
      )}
    </div>
  );
}
