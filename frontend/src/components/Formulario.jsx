import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser } from "../services/users.api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export function Formulario({
  mode = "create",
  defaultValues = {},
  onSubmit,
  title = "",
  buttonText = "",
  userId,
  esEmpleado = false,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleVolver = () => {
    if (location.pathname === "/register") {
      navigate("/home");
    } else if (esEmpleado) {
      navigate("/empleados");
    } else {
      navigate("/clientes");
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const password = watch("user_password", "");

  useEffect(() => {
    if (mode !== "create") {
      for (const key in defaultValues) {
        setValue(key, defaultValues[key]);
      }
    }
  }, [defaultValues, mode, setValue]);

  const isRegisterPage = location.pathname === "/register";
  const isViewMode = mode === "view";

  const handleInternalSubmit = handleSubmit(async (data) => {
    if (!onSubmit) return;
    try {
      const { confirmPassword, ...cleanData } = data;
      const transformedData = {
        ...cleanData,
        user_username: cleanData.user_username?.trim(),
        user_firstname: cleanData.user_firstname?.toLowerCase().trim(),
        user_lastname: cleanData.user_lastname?.toLowerCase().trim(),
        user_secondname: cleanData.user_secondname?.toLowerCase().trim(),
        user_second_lastname: cleanData.user_second_lastname
          ?.toLowerCase()
          .trim(),
        user_cedula: cleanData.user_cedula?.trim(),
        user_email: cleanData.user_email?.toLowerCase().trim(),
        user_phone: cleanData.user_phone?.trim(),
        user_address: cleanData.user_address?.trim(),
      };

      await onSubmit(transformedData);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error al procesar el formulario", {
        position: "bottom-right",
      });
    }
  });

  const handleDelete = async () => {
    const confirmado = window.confirm(
      "¿Estás seguro/a de que deseas eliminar este cliente?",
    );
    if (!confirmado) return;

    try {
      await deleteUser(userId);
      toast.success("Cliente eliminado correctamente");
      if (esEmpleado) {
        navigate("/empleados");
      } else {
        navigate("/clientes");
      }
    } catch (error) {
      console.error("Error al eliminar cliente", error);
      toast.error("Error al eliminar cliente");
    }
  };

  return (
    <form onSubmit={handleInternalSubmit}>
      <div>
        <div>
          <div>{title && <h1>{title}</h1>}</div>
          <div>
            <div>
              <label htmlFor="form-username">Usuario:</label>
              <input
                id="form-username"
                type="text"
                placeholder="Usuario"
                {...register("user_username", { required: true })}
                disabled={isViewMode}
              />
              {errors.user_username && <span>Usuario es requerido</span>}
            </div>
            {mode === "create" && (
              <>
                <div>
                  <label htmlFor="form-password">Contraseña:</label>
                  <input
                    id="form-password"
                    type="password"
                    placeholder="Contraseña"
                    {...register("user_password", { required: true })}
                  />
                  {errors.user_password && <span>Contraseña es requerida</span>}
                </div>
                <div>
                  <label htmlFor="form-confirm-password">
                    Confirmar Contraseña:
                  </label>
                  <input
                    id="form-confirm-password"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === password || "Las contraseñas no coinciden",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                  )}
                </div>
              </>
            )}
          </div>
          <div>
            <div>
              <div>
                <label htmlFor="form-firstname">Primer Nombre:</label>
                <input
                  id="form-firstname"
                  type="text"
                  placeholder="Primer Nombre"
                  {...register("user_firstname", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_firstname && (
                  <span>Primer Nombre es requerido</span>
                )}
              </div>
              <div>
                <label htmlFor="form-lastname">Primer Apellido:</label>
                <input
                  id="form-lastname"
                  type="text"
                  placeholder="Primer Apellido"
                  {...register("user_lastname", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_lastname && (
                  <span>Primer Apellido es requerido</span>
                )}
              </div>
              <div>
                <label htmlFor="form-dateofbirth">Fecha de Nacimiento:</label>
                <input
                  id="form-dateofbirth"
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  {...register("user_dateofbirth", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_dateofbirth && (
                  <span>Fecha de Nacimiento es requerida</span>
                )}
              </div>
              <div>
                <label htmlFor="form-cedula">Cédula:</label>
                <input
                  id="form-cedula"
                  type="text"
                  placeholder="Cédula"
                  {...register("user_cedula", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_cedula && <span>Cédula es requerida</span>}
              </div>
              <div>
                <label htmlFor="form-email">Email:</label>
                <input
                  id="form-email"
                  type="email"
                  placeholder="Email"
                  {...register("user_email", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_email && <span>Email es requerido</span>}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="form-secondname">Segundo Nombre:</label>
                <input
                  id="form-secindname"
                  type="text"
                  placeholder="Segundo Nombre"
                  {...register("user_secondname")}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label htmlFor="form-secondlastname">Segundo Apellido:</label>
                <input
                  id="form-secondlastname"
                  type="text"
                  placeholder="Segundo Apellido"
                  {...register("user_second_lastname")}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label htmlFor="form-genre">Genero:</label>
                <select
                  id="form-genre"
                  {...register("user_genre", { required: true })}
                  disabled={isViewMode}
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
                {errors.user_genre && <span>Genero es requerido</span>}
              </div>
              <div>
                <label htmlFor="form-phone">Teléfono:</label>
                <input
                  id="form-phone"
                  type="text"
                  placeholder="Teléfono"
                  {...register("user_phone", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_phone && <span>Teléfono es requerido</span>}
              </div>
              <div>
                <label htmlFor="form-address">Dirección:</label>
                <input
                  id="form-address"
                  type="text"
                  placeholder="Dirección"
                  {...register("user_address", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_address && <span>Dirección es requerida</span>}
              </div>
            </div>
          </div>
          <div>
            <div>
              {esEmpleado && (
                <>
                  <label htmlFor="form-role">Role:</label>
                  <select
                    id="form-role"
                    {...register("role", { required: true })}
                    disabled={isViewMode}
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">Admin</option>
                    <option value="3">Recepcionista</option>
                    <option value="4">Personal de entrega</option>
                    <option value="5">Personal de recepción</option>
                  </select>
                  {errors.role && <span>Role es requerido</span>}
                </>
              )}
            </div>
          </div>
          <div>
            {!isViewMode && <button type="submit">{buttonText}</button>}
            {(mode === "edit" || mode === "create" || mode === "view") && (
              <button type="button" onClick={handleVolver}>
                Volver
              </button>
            )}
            {mode === "edit" && (
              <button type="button" onClick={handleDelete}>
                Eliminar
              </button>
            )}
          </div>
          <div>
            {isRegisterPage && (
              <p>
                ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
