import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useReserva } from "../../context/ReservaContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./DataUser.css";

export function DataUser({ defaultValues }) {
  const { setReserva } = useReserva();
  const { reserva } = useReserva();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });
  useEffect(() => {
    reset({
      pickup_location: reserva.pickup_location || "",
      pickup_date: reserva.pickup_date || "",
      pickup_time: reserva.pickup_time || "",
      dropoff_location: reserva.dropoff_location || "",
      dropoff_date: reserva.dropoff_date || "",
      dropoff_time: reserva.dropoff_time || "",
      reservation_firstname: user?.firstname || "",
      reservation_secondname: user?.secondname || "",
      reservation_lastname: user?.lastname || "",
      reservation_second_lastname: user?.second_lastname || "",
      reservation_dateofbirth: user?.dateofbirth || "",
      reservation_cedula: user?.cedula || "",
      reservation_email: user?.email || "",
      reservation_phone: user?.phone || "",
      reservation_genre: user?.genre || "",
      reservation_address: user?.address || "",
      license_number: "",
      license_expiry_date: "",
      license_country: "",
      acepto_terminos: false,
      ...defaultValues,
    });
  }, [user, reserva, reset, defaultValues]);

  const validateLicenseExpiry = (value) => {
    const expiryDate = new Date(value);
    const currentDate = new Date();
    if (expiryDate < currentDate) {
      return "La fecha de vencimiento de la licencia ya ha pasado.";
    }
    return true;
  };

  const onSubmit = handleSubmit((data) => {
    const nuevaReserva = {
      ...data,
      status: "pendiente",
      vehicle: reserva.selectedVehicle,
    };

    if (user) {
      nuevaReserva.user_id = user.id;
    }

    setReserva(nuevaReserva);
    navigate("/reservar/pago");
  });

  return (
    <div className="datos-user-form">
      <form onSubmit={onSubmit}>
        <div className="datos-user-wrapper">
          {/* Sección de recogida */}
          <div className="datos-user-section">
            <div className="datos-user-group">
              <div className="datos-user-columns">
                <div className="datos-user-column">
                  <label
                    htmlFor="form-pickup_location"
                    className="datos-user-label"
                  >
                    Lugar de recogida:
                  </label>
                  <select
                    id="form-pickup_location"
                    className="datos-user-input"
                    {...register("pickup_location", { required: true })}
                  >
                    <option value="">Selecciona</option>
                    <option value="central">Oficina Central</option>
                  </select>
                  {errors.pickup_location && (
                    <span className="datos-user-error">
                      Lugar de recogida es requerido
                    </span>
                  )}
                </div>
                <div className="datos-user-column">
                  <label
                    htmlFor="form-pickup_date"
                    className="datos-user-label"
                  >
                    Fecha de recogida:
                  </label>
                  <input
                    id="form-pickup_date"
                    className="datos-user-input"
                    type="date"
                    {...register("pickup_date", { required: true })}
                  />
                  {errors.pickup_date && (
                    <span className="datos-user-error">
                      Fecha de recogida es requerida
                    </span>
                  )}
                </div>
                <div className="datos-user-column">
                  <label
                    htmlFor="form-pickup_time"
                    className="datos-user-label"
                  >
                    Hora de recogida:
                  </label>
                  <input
                    id="form-pickup_time"
                    className="datos-user-input"
                    type="time"
                    {...register("pickup_time", { required: true })}
                  />
                  {errors.pickup_time && (
                    <span className="datos-user-error">
                      Hora de recogida es requerida
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Sección de devolución */}
            <div className="datos-user-group">
              <div className="datos-user-columns">
                <div className="datos-user-column">
                  <label
                    htmlFor="form-dropoff_location"
                    className="datos-user-label"
                  >
                    Lugar de devolución:
                  </label>
                  <select
                    id="form-dropoff_location"
                    className="datos-user-input"
                    {...register("dropoff_location", { required: true })}
                  >
                    <option value="">Selecciona</option>
                    <option value="central">Oficina Central</option>
                  </select>
                  {errors.dropoff_location && (
                    <span className="datos-user-error">
                      Lugar de devolución es requerido
                    </span>
                  )}
                </div>
                <div className="datos-user-column">
                  <label
                    htmlFor="form-dropoff_date"
                    className="datos-user-label"
                  >
                    Fecha de devolución:
                  </label>
                  <input
                    id="form-dropoff_date"
                    className="datos-user-input"
                    type="date"
                    {...register("dropoff_date", { required: true })}
                  />
                  {errors.dropoff_date && (
                    <span className="datos-user-error">
                      Fecha de devolución es requerida
                    </span>
                  )}
                </div>
                <div className="datos-user-column">
                  <label
                    htmlFor="form-dropoff_time"
                    className="datos-user-label"
                  >
                    Hora de devolución:
                  </label>
                  <input
                    id="form-dropoff_time"
                    className="datos-user-input"
                    type="time"
                    {...register("dropoff_time", { required: true })}
                  />
                  {errors.dropoff_time && (
                    <span className="datos-user-error">
                      Hora de devolución es requerida
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Datos personales */}
          <div className="datos-user-section">
            <div className="datos-user-group datos-user-columns">
              <div className="datos-user-column">
                <label htmlFor="form-firstname" className="datos-user-label">
                  Primer Nombre:
                </label>
                <input
                  id="form-firstname"
                  className="datos-user-input"
                  type="text"
                  placeholder="Primer Nombre"
                  readOnly={user}
                  {...register("reservation_firstname", { required: true })}
                />
                {errors.reservation_firstname && (
                  <span className="datos-user-error">
                    Primer Nombre es requerido
                  </span>
                )}
              </div>
              <div className="datos-user-column">
                <label htmlFor="form-lastname" className="datos-user-label">
                  Primer Apellido:
                </label>
                <input
                  id="form-lastname"
                  className="datos-user-input"
                  type="text"
                  placeholder="Primer Apellido"
                  readOnly={user}
                  {...register("reservation_lastname", { required: true })}
                />
                {errors.reservation_lastname && (
                  <span className="datos-user-error">
                    Primer Apellido es requerido
                  </span>
                )}
              </div>
              <div className="datos-user-column">
                <label htmlFor="form-dateofbirth" className="datos-user-label">
                  Fecha de Nacimiento:
                </label>
                <input
                  id="form-dateofbirth"
                  className="datos-user-input"
                  type="date"
                  readOnly={user}
                  {...register("reservation_dateofbirth", { required: true })}
                />
                {errors.reservation_dateofbirth && (
                  <span className="datos-user-error">
                    Fecha de Nacimiento es requerida
                  </span>
                )}
              </div>
              <div className="datos-user-column">
                <label htmlFor="form-email" className="datos-user-label">
                  Email:
                </label>
                <input
                  id="form-email"
                  className="datos-user-input"
                  type="email"
                  readOnly={user}
                  {...register("reservation_email", { required: true })}
                />
                {errors.reservation_email && (
                  <span className="datos-user-error">Email es requerido</span>
                )}
              </div>
              <div className="datos-user-column">
                <label htmlFor="form-genre" className="datos-user-label">
                  Género:
                </label>
                <select
                  id="form-genre"
                  className="datos-user-input"
                  readOnly={user}
                  {...register("reservation_genre", { required: true })}
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
                {errors.reservation_genre && (
                  <span className="datos-user-error">Género es requerido</span>
                )}
              </div>
            </div>

            <div className="datos-user-group datos-user-columns">
              <div className="datos-user-column">
                <label htmlFor="form-secondname" className="datos-user-label">
                  Segundo Nombre:
                </label>
                <input
                  id="form-secondname"
                  className="datos-user-input"
                  type="text"
                  readOnly={user}
                  {...register("reservation_secondname")}
                />
              </div>
              <div className="datos-user-column">
                <label
                  htmlFor="form-secondlastname"
                  className="datos-user-label"
                >
                  Segundo Apellido:
                </label>
                <input
                  id="form-secondlastname"
                  className="datos-user-input"
                  type="text"
                  readOnly={user}
                  {...register("reservation_second_lastname")}
                />
              </div>
              <div className="datos-user-column">
                <label htmlFor="form-cedula" className="datos-user-label">
                  Cédula:
                </label>
                <input
                  id="form-cedula"
                  className="datos-user-input"
                  type="text"
                  readOnly={user}
                  {...register("reservation_cedula", { required: true })}
                />
                {errors.reservation_cedula && (
                  <span className="datos-user-error">Cédula es requerida</span>
                )}
              </div>
              <div className="datos-user-column">
                <label htmlFor="form-phone" className="datos-user-label">
                  Teléfono:
                </label>
                <input
                  id="form-phone"
                  className="datos-user-input"
                  type="text"
                  readOnly={user}
                  {...register("reservation_phone", { required: true })}
                />
                {errors.reservation_phone && (
                  <span className="datos-user-error">
                    Teléfono es requerido
                  </span>
                )}
              </div>
              <div className="datos-user-column">
                <label htmlFor="form-address" className="datos-user-label">
                  Dirección:
                </label>
                <input
                  id="form-address"
                  className="datos-user-input"
                  type="text"
                  readOnly={user}
                  {...register("reservation_address", { required: true })}
                />
                {errors.reservation_address && (
                  <span className="datos-user-error">
                    Dirección es requerida
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Datos licencia */}
          <div className="datos-user-section">
            <div className="datos-user-group datos-user-columns">
              <div className="datos-user-column">
                <label
                  htmlFor="form-license_number"
                  className="datos-user-label"
                >
                  Número de Licencia:
                </label>
                <input
                  id="form-license_number"
                  className="datos-user-input"
                  type="text"
                  {...register("license_number", { required: true })}
                />
                {errors.license_number && (
                  <span className="datos-user-error">
                    Número de Licencia es requerido
                  </span>
                )}
              </div>
              <div className="datos-user-column">
                <label
                  htmlFor="form-license_expiry_date"
                  className="datos-user-label"
                >
                  Fecha de Vencimiento:
                </label>
                <input
                  id="form-license_expiry_date"
                  className="datos-user-input"
                  type="date"
                  {...register("license_expiry_date", {
                    required:
                      "Fecha de Vencimiento de la Licencia es requerida",
                    validate: validateLicenseExpiry,
                  })}
                />
                {errors.license_expiry_date && (
                  <span className="datos-user-error">
                    {errors.license_expiry_date.message}
                  </span>
                )}
              </div>
              <div className="datos-user-column">
                <label
                  htmlFor="form-license_country"
                  className="datos-user-label"
                >
                  País de Emisión:
                </label>
                <input
                  id="form-license_country"
                  className="datos-user-input"
                  type="text"
                  {...register("license_country", { required: true })}
                />
                {errors.license_country && (
                  <span className="datos-user-error">
                    País de Emisión de la Licencia es requerido
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Términos y envío */}
          <div className="datos-user-section">
            <div className="datos-user-checkbox">
              <label className="datos-user-label">
                <input
                  type="checkbox"
                  {...register("acepto_terminos", { required: true })}
                />{" "}
                Acepto los términos y condiciones
              </label>
              {errors.acepto_terminos && (
                <span className="datos-user-error">
                  Debes aceptar los términos
                </span>
              )}
            </div>
          </div>

          <div className="datos-user-submit">
            <button type="submit" className="datos-user-button">
              Confirmar Datos
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
