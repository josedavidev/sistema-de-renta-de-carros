import React from "react";
import "./Home.css";
import { CarCarousel } from "../../components/car-carousel/CarCarousel";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { horasDisponibles } from "../../utils/horasHome";
import { validarHoras } from "../../utils/validacionHorasHome";
import { useReserva } from "../../context/ReservaContext";

export function Home() {
  const { setReserva } = useReserva();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const fecha_recogida = watch("fecha_recogida");

  const onSubmit = handleSubmit((data) => {
    setReserva((prev) => ({
      ...prev,
      pickup_location: data.pickup_location,
      pickup_date: data.pickup_date,
      pickup_time: data.pickup_time,
      dropoff_location: data.dropoff_location,
      dropoff_date: data.dropoff_date,
      dropoff_time: data.dropoff_time,
    }));
    navigate("/reservar/vehiculo");
  });

  const cars = [
    {
      carId: 1,
      imageSrc: "/ruta/de/imagen1.jpg",
      stars: 5,
      carName: "Carro A",
    },
    {
      carId: 2,
      imageSrc: "/ruta/de/imagen2.jpg",
      stars: 4,
      carName: "Carro B",
    },
    {
      carId: 3,
      imageSrc: "/ruta/de/imagen3.jpg",
      stars: 5,
      carName: "Carro C",
    },
    {
      carId: 4,
      imageSrc: "/ruta/de/imagen4.jpg",
      stars: 4,
      carName: "Carro D",
    },
    {
      carId: 5,
      imageSrc: "/ruta/de/imagen5.jpg",
      stars: 5,
      carName: "Carro E",
    },
    {
      carId: 6,
      imageSrc: "/ruta/de/imagen6.jpg",
      stars: 4,
      carName: "Carro F",
    },
  ];

  return (
    <div className="home-container">
      <section className="home-section">
        <div className="home-div-title">
          <h1 className="home-title">Bienvenido A Rent a Car</h1>
        </div>
        <form className="home-form" onSubmit={onSubmit}>
          <div className="form-div-recogida">
            <div className="home-div-subtitle-recogida">
              <h2 className="home-subtitle-recogida">Recogida</h2>
            </div>
            <div className="form-subdiv-recogida">
              <div className="form-div-lugar-recogida">
                <label
                  className="home-label-lugar-recogida"
                  htmlFor="lugar_recogida"
                >
                  Lugar:
                </label>
                <select
                  id="lugar_recogida"
                  className="home-select-lugar-recogida"
                  {...register("pickup_location", { required: true })}
                >
                  <option value="">Selecciona un lugar</option>
                  <option value="central">Oficina Central</option>
                </select>
                {errors.pickup_location && (
                  <span className="home-error-message">
                    Lugar de recogida es requerido
                  </span>
                )}
              </div>
              <div className="form-div-fecha-recogida">
                <label
                  className="home-label-fecha-recogida"
                  htmlFor="fecha_recogida"
                >
                  Fecha:
                </label>
                <input
                  type="date"
                  id="fecha_recogida"
                  className="home-input-fecha-recogida"
                  {...register("pickup_date", { required: true })}
                />
                {errors.pickup_date && (
                  <span className="home-error-message">
                    Fecha de recogida es requerida
                  </span>
                )}
              </div>
              <div className="form-div-hora-recogida">
                <label
                  className="home-label-hora-recogida"
                  htmlFor="hora_recogida"
                >
                  Hora:
                </label>
                <input
                  type="time"
                  id="hora_recogida"
                  className="home-input-hora-recogida"
                  {...register("pickup_time", { required: true })}
                />
                {errors.pickup_time && (
                  <span className="home-error-message">
                    Hora de recogida es requerida
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="form-div-devolucion">
            <div className="home-div-subtitle-devolucion">
              <h2 className="home-subtitle-devolucion">Devolución</h2>
            </div>
            <div className="form-subdiv-devolucion">
              <div className="form-div-lugar-devolucion">
                <label
                  className="home-label-lugar-devolucion"
                  htmlFor="lugar_devolucion"
                >
                  Lugar:
                </label>
                <select
                  id="lugar_devolucion"
                  className="home-select-lugar-devolucion"
                  {...register("dropoff_location", { required: true })}
                >
                  <option value="">Selecciona un lugar</option>
                  <option value="central">Oficina Central</option>
                </select>
                {errors.dropoff_location && (
                  <span className="home-error-message">
                    Lugar de devolución es requerido
                  </span>
                )}
              </div>
              <div className="form-div-fecha-devolucion">
                <label
                  className="home-label-fecha-devolucion"
                  htmlFor="fecha_devolucion"
                >
                  Fecha:
                </label>
                <input
                  type="date"
                  id="fecha_devolucion"
                  className="home-input-fecha-devolucion"
                  {...register("dropoff_date", {
                    required: "Fecha de devolución es requerida",
                    validate: (value) => {
                      const { pickup_date } = getValues();
                      if (!pickup_date) return true;
                      return (
                        value >= pickup_date ||
                        "La fecha de devolución debe ser igual o mayor a la de recogida"
                      );
                    },
                  })}
                />
                {errors.dropoff_date && (
                  <span className="home-error-message">
                    {errors.dropoff_date.message}
                  </span>
                )}
              </div>
              <div className="form-div-hora-devolucion">
                <label
                  className="home-label-hora-devolucion"
                  htmlFor="hora_devolucion"
                >
                  Hora:
                </label>
                <input
                  type="time"
                  id="hora_devolucion"
                  className="home-input-hora-devolucion"
                  {...register("dropoff_time", {
                    required: "Hora de devolución es requerida",
                    validate: (value) => {
                      const formValues = getValues();
                      return validarHoras(
                        formValues.pickup_time,
                        value,
                        formValues.pickup_date,
                        formValues.dropoff_date
                      );
                    },
                  })}
                />
                {errors.dropoff_time && (
                  <span className="home-error-message">
                    {errors.dropoff_time.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <button className="btn-reservar" type="submit">
              Reservar
            </button>
          </div>
        </form>
      </section>

      <section className="recommendation-section">
        <h2>Carros Destacados</h2>
        <CarCarousel cars={cars} interval={3000} />
      </section>

      <section className="hero-section">
        <div className="hero-content">
          <div className="reservation-form"></div>
        </div>
      </section>
    </div>
  );
}
