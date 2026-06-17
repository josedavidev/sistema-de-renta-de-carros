import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useReserva } from "../context/ReservaContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {/* Sección de recogida */}
          <div>
            <div>
              <div>
                <div>
                  <label htmlFor="form-pickup_location">
                    Lugar de recogida:
                  </label>
                  <select
                    id="form-pickup_location"
                    {...register("pickup_location", { required: true })}
                  >
                    <option value="">Selecciona</option>
                    <option value="central">Oficina Central</option>
                  </select>
                  {errors.pickup_location && (
                    <span>Lugar de recogida es requerido</span>
                  )}
                </div>
                <div>
                  <label htmlFor="form-pickup_date">Fecha de recogida:</label>
                  <input
                    id="form-pickup_date"
                    type="date"
                    {...register("pickup_date", { required: true })}
                  />
                  {errors.pickup_date && (
                    <span>Fecha de recogida es requerida</span>
                  )}
                </div>
                <div>
                  <label htmlFor="form-pickup_time">Hora de recogida:</label>
                  <input
                    id="form-pickup_time"
                    type="time"
                    {...register("pickup_time", { required: true })}
                  />
                  {errors.pickup_time && (
                    <span>Hora de recogida es requerida</span>
                  )}
                </div>
              </div>
            </div>
            {/* Sección de devolución */}
            <div>
              <div>
                <div>
                  <label htmlFor="form-dropoff_location">
                    Lugar de devolución:
                  </label>
                  <select
                    id="form-dropoff_location"
                    {...register("dropoff_location", { required: true })}
                  >
                    <option value="">Selecciona</option>
                    <option value="central">Oficina Central</option>
                  </select>
                  {errors.dropoff_location && (
                    <span>Lugar de devolución es requerido</span>
                  )}
                </div>
                <div>
                  <label htmlFor="form-dropoff_date">
                    Fecha de devolución:
                  </label>
                  <input
                    id="form-dropoff_date"
                    type="date"
                    {...register("dropoff_date", { required: true })}
                  />
                  {errors.dropoff_date && (
                    <span>Fecha de devolución es requerida</span>
                  )}
                </div>
                <div>
                  <label htmlFor="form-dropoff_time">Hora de devolución:</label>
                  <input
                    id="form-dropoff_time"
                    type="time"
                    {...register("dropoff_time", { required: true })}
                  />
                  {errors.dropoff_time && (
                    <span>Hora de devolución es requerida</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Datos personales */}
          <div>
            <div>
              <div>
                <label htmlFor="form-firstname">Primer Nombre:</label>
                <input
                  id="form-firstname"
                  type="text"
                  placeholder="Primer Nombre"
                  readOnly={user}
                  {...register("reservation_firstname", { required: true })}
                />
                {errors.reservation_firstname && (
                  <span>Primer Nombre es requerido</span>
                )}
              </div>
              <div>
                <label htmlFor="form-lastname">Primer Apellido:</label>
                <input
                  id="form-lastname"
                  type="text"
                  placeholder="Primer Apellido"
                  readOnly={user}
                  {...register("reservation_lastname", { required: true })}
                />
                {errors.reservation_lastname && (
                  <span>Primer Apellido es requerido</span>
                )}
              </div>
              <div>
                <label htmlFor="form-dateofbirth">Fecha de Nacimiento:</label>
                <input
                  id="form-dateofbirth"
                  type="date"
                  readOnly={user}
                  {...register("reservation_dateofbirth", { required: true })}
                />
                {errors.reservation_dateofbirth && (
                  <span>Fecha de Nacimiento es requerida</span>
                )}
              </div>
              <div>
                <label htmlFor="form-email">Email:</label>
                <input
                  id="form-email"
                  type="email"
                  readOnly={user}
                  {...register("reservation_email", { required: true })}
                />
                {errors.reservation_email && <span>Email es requerido</span>}
              </div>
              <div>
                <label htmlFor="form-genre">Género:</label>
                <select
                  id="form-genre"
                  readOnly={user}
                  {...register("reservation_genre", { required: true })}
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
                {errors.reservation_genre && <span>Género es requerido</span>}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="form-secondname">Segundo Nombre:</label>
                <input
                  id="form-secondname"
                  type="text"
                  readOnly={user}
                  {...register("reservation_secondname")}
                />
              </div>
              <div>
                <label htmlFor="form-secondlastname">Segundo Apellido:</label>
                <input
                  id="form-secondlastname"
                  type="text"
                  readOnly={user}
                  {...register("reservation_second_lastname")}
                />
              </div>
              <div>
                <label htmlFor="form-cedula">Cédula:</label>
                <input
                  id="form-cedula"
                  type="text"
                  readOnly={user}
                  {...register("reservation_cedula", { required: true })}
                />
                {errors.reservation_cedula && <span>Cédula es requerida</span>}
              </div>
              <div>
                <label htmlFor="form-phone">Teléfono:</label>
                <input
                  id="form-phone"
                  type="text"
                  readOnly={user}
                  {...register("reservation_phone", { required: true })}
                />
                {errors.reservation_phone && <span>Teléfono es requerido</span>}
              </div>
              <div>
                <label htmlFor="form-address">Dirección:</label>
                <input
                  id="form-address"
                  type="text"
                  readOnly={user}
                  {...register("reservation_address", { required: true })}
                />
                {errors.reservation_address && (
                  <span>Dirección es requerida</span>
                )}
              </div>
            </div>
          </div>

          {/* Datos licencia */}
          <div>
            <div>
              <div>
                <label htmlFor="form-license_number">Número de Licencia:</label>
                <input
                  id="form-license_number"
                  type="text"
                  {...register("license_number", { required: true })}
                />
                {errors.license_number && (
                  <span>Número de Licencia es requerido</span>
                )}
              </div>
              <div>
                <label htmlFor="form-license_expiry_date">
                  Fecha de Vencimiento:
                </label>
                <input
                  id="form-license_expiry_date"
                  type="date"
                  {...register("license_expiry_date", {
                    required:
                      "Fecha de Vencimiento de la Licencia es requerida",
                    validate: validateLicenseExpiry,
                  })}
                />
                {errors.license_expiry_date && (
                  <span>{errors.license_expiry_date.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="form-license_country">País de Emisión:</label>
                <input
                  id="form-license_country"
                  type="text"
                  {...register("license_country", { required: true })}
                />
                {errors.license_country && (
                  <span>País de Emisión de la Licencia es requerido</span>
                )}
              </div>
            </div>
          </div>

          {/* Términos y envío */}
          <div>
            <div>
              <label>
                <input
                  type="checkbox"
                  {...register("acepto_terminos", { required: true })}
                />{" "}
                Acepto los términos y condiciones
              </label>
              {errors.acepto_terminos && (
                <span>Debes aceptar los términos</span>
              )}
            </div>
          </div>

          <div>
            <button type="submit">Confirmar Datos</button>
          </div>
        </div>
      </form>
    </div>
  );
}
