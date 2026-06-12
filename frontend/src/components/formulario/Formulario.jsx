import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/users.api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "./Formulario.css";

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
        style: {
          background: "#ff3a3a",
          color: "#fff",
        },
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
      <div className="formulario-container">
        <div className="formulario-box">
          <div>{title && <h1 className="formulario-title">{title}</h1>}</div>
          <div>
            <div className="formulario-div-input">
              <label htmlFor="form-username" className="formulario-label">
                Usuario:
              </label>
              <input
                id="form-username"
                className="formulario-input"
                type="text"
                placeholder="Usuario"
                {...register("user_username", { required: true })}
                disabled={isViewMode}
              />
              {errors.user_username && (
                <span className="formulario-error">Usuario es requerido</span>
              )}
            </div>
            {mode === "create" && (
              <>
                <div className="formulario-div-input">
                  <label htmlFor="form-password" className="formulario-label">
                    Contraseña:
                  </label>
                  <input
                    id="form-password"
                    className="formulario-input"
                    type="password"
                    placeholder="Contraseña"
                    {...register("user_password", { required: true })}
                  />
                  {errors.user_password && (
                    <span className="formulario-error">
                      Contraseña es requerida
                    </span>
                  )}
                </div>
                <div className="formulario-div-input">
                  <label
                    htmlFor="form-confirm-password"
                    className="formulario-label"
                  >
                    Confirmar Contraseña:
                  </label>
                  <input
                    id="form-confirm-password"
                    className="formulario-input"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === password || "Las contraseñas no coinciden",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="formulario-error">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="formulario-div-column">
            <div className="formulario-subdiv-column">
              <div className="formulario-div-input">
                <label htmlFor="form-firstname" className="formulario-label">
                  Primer Nombre:
                </label>
                <input
                  id="form-firstname"
                  className="formulario-input"
                  type="text"
                  placeholder="Primer Nombre"
                  {...register("user_firstname", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_firstname && (
                  <span className="formulario-error">
                    Primer Nombre es requerido
                  </span>
                )}
              </div>
              <div className="formulario-div-input">
                <label htmlFor="form-lastname" className="formulario-label">
                  Primer Apellido:
                </label>
                <input
                  id="form-lastname"
                  className="formulario-input"
                  type="text"
                  placeholder="Primer Apellido"
                  {...register("user_lastname", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_lastname && (
                  <span className="formulario-error">
                    Primer Apellido es requerido
                  </span>
                )}
              </div>
              <div className="formulario-div-input">
                <label htmlFor="form-dateofbirth" className="formulario-label">
                  Fecha de Nacimiento:
                </label>
                <input
                  id="form-dateofbirth"
                  className="formulario-input"
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  {...register("user_dateofbirth", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_dateofbirth && (
                  <span className="formulario-error">
                    Fecha de Nacimiento es requerida
                  </span>
                )}
              </div>
              <div className="formulario-div-input">
                <label htmlFor="form-cedula" className="formulario-label">
                  Cédula:
                </label>
                <input
                  id="form-cedula"
                  className="formulario-input"
                  type="text"
                  placeholder="Cédula"
                  {...register("user_cedula", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_cedula && (
                  <span className="formulario-error">Cédula es requerida</span>
                )}
              </div>
              <div className="formulario-div-input">
                <label htmlFor="form-email" className="formulario-label">
                  Email:
                </label>
                <input
                  id="form-email"
                  className="formulario-input"
                  type="email"
                  placeholder="Email"
                  {...register("user_email", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_email && (
                  <span className="formulario-error">Email es requerido</span>
                )}
              </div>
            </div>
            <div className="formulario-subdiv-column">
              <div className="formulario-div-input">
                <label htmlFor="form-secondname" className="formulario-label">
                  Segundo Nombre:
                </label>
                <input
                  id="form-secindname"
                  className="formulario-input"
                  type="text"
                  placeholder="Segundo Nombre"
                  {...register("user_secondname")}
                  disabled={isViewMode}
                />
              </div>
              <div className="formulario-div-input">
                <label
                  htmlFor="form-secondlastname"
                  className="formulario-label"
                >
                  Segundo Apellido:
                </label>
                <input
                  id="form-secondlastname"
                  className="formulario-input"
                  type="text"
                  placeholder="Segundo Apellido"
                  {...register("user_second_lastname")}
                  disabled={isViewMode}
                />
              </div>
              <div className="formulario-div-input">
                <label htmlFor="form-genre" className="formulario-label">
                  Genero:
                </label>
                <select
                  id="form-genre"
                  className="formulario-input"
                  {...register("user_genre", { required: true })}
                  disabled={isViewMode}
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
                {errors.user_genre && (
                  <span className="formulario-error">Genero es requerido</span>
                )}
              </div>
              <div className="formulario-div-input">
                <label htmlFor="form-phone" className="formulario-label">
                  Teléfono:
                </label>
                <input
                  id="form-phone"
                  className="formulario-input"
                  type="text"
                  placeholder="Teléfono"
                  {...register("user_phone", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_phone && (
                  <span className="formulario-error">
                    Teléfono es requerido
                  </span>
                )}
              </div>
              <div className="formulario-div-input">
                <label htmlFor="form-address" className="formulario-label">
                  Dirección:
                </label>
                <input
                  id="form-address"
                  className="formulario-input"
                  type="text"
                  placeholder="Dirección"
                  {...register("user_address", { required: true })}
                  disabled={isViewMode}
                />
                {errors.user_address && (
                  <span className="formulario-error">
                    Dirección es requerida
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="formulario-div-input">
              {esEmpleado && (
                <>
                  <label htmlFor="form-role" className="formulario-label">
                    Role:
                  </label>
                  <select
                    id="form-role"
                    className="formulario-input"
                    {...register("role", { required: true })}
                    disabled={isViewMode}
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">Admin</option>
                    <option value="3">Recepcionista</option>
                    <option value="4">Personal de entrega</option>
                    <option value="5">Personal de recepción</option>
                  </select>
                  {errors.role && (
                    <span className="formulario-error">Role es requerido</span>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {!isViewMode && (
              <button className="formulario-button" type="submit">
                {buttonText}
              </button>
            )}
            {(mode === "edit" || mode === "create" || mode === "view") && (
              <button
                className="formulario-button-volver"
                type="button"
                onClick={handleVolver}
              >
                Volver
              </button>
            )}
            {mode === "edit" && (
              <button
                className="formulario-button-eliminar"
                type="button"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            )}
          </div>
          <div>
            {isRegisterPage && (
              <p className="formulario-ptext">
                ¿Ya tienes cuenta?{" "}
                <a className="formulario-atext" href="/login">
                  Iniciar sesión
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
