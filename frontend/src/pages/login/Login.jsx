import React from "react";
import { loginUser } from "../../services/users.api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUser(data);

      if (response.access) {
        localStorage.setItem("access", response.access);
        localStorage.setItem("refresh", response.refresh);
        login({
          id: response.user_id,
          username: response.username,
          firstname: response.firstname,
          secondname: response.secondname,
          lastname: response.lastname,
          second_lastname: response.second_lastname,
          dateofbirth: response.dateofbirth,
          cedula: response.cedula,
          email: response.email,
          phone: response.phone,
          genre: response.genre,
          address: response.address,
          role: response.role,
        });
        toast.success("Incio de sesion exitoso", {
          position: "bottom-right",
          style: {
            background: "#000",
            color: "#fff",
          },
        });

        switch (response.role) {
          case "admin":
            navigate("/admin");
            break;
          case "cliente":
            navigate("/home");
            break;
          case "recepcionista":
            navigate("/recepcionista");
            break;
          case "personal_entrega":
          case "personal_recepcion":
            navigate("/employee-home");
            break;
          default:
            navigate("/home");
        }
      } else {
        toast.error("Error al iniciar sesión", {
          position: "bottom-right",
          style: {
            background: "#ff3a3a",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Error al iniciar sesión", {
        position: "bottom-right",
        style: {
          background: "#ff3a3a",
          color: "#fff",
        },
      });
      console.error(error.response?.data || error.message);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Iniciar Sesión</h2>
          <input
            className="input-user"
            type="text"
            placeholder="Usuario"
            {...register("user_username", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.user_username && <span>{errors.user_username.message}</span>}

          <input
            className="input-pass"
            type="password"
            placeholder="Contraseña"
            {...register("user_password", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.user_password && <span>{errors.user_password.message}</span>}

          <a className="forgot-pass" href="#">
            ¿Olvidaste la contraseña?
          </a>
          <button className="login-btn">Iniciar Sesión</button>
          <p className="p-text-login">
            ¿No tienes cuenta?{" "}
            <a className="text-register" href="/register">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
