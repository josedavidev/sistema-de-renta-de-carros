import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const menuRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleScroll = () => {
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/home");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div>
        <Link to="/home">
          <h1>Rent a Car</h1>
        </Link>
      </div>

      <div>
        {!user && (
          <>
            <Link to="/catalogo">Catálogo Carros</Link>
            <div>
              {location.pathname !== "/login" && (
                <Link to="/login">Iniciar Sesión</Link>
              )}
              {location.pathname !== "/login" &&
                location.pathname !== "/register" && <span> | </span>}
              {location.pathname !== "/register" && (
                <Link to="/register">Registrarse</Link>
              )}
            </div>
          </>
        )}
        {(user?.role === "cliente" ||
          user?.role === "admin" ||
          user?.role === "recepcionista") && (
          <>
            {location.pathname !== "/catalogo" && (
              <Link to="/catalogo">Catálogo Carros</Link>
            )}
            <div ref={menuRef}>
              <div>
                <div onClick={toggleMenu}>
                  {`${user.firstname?.charAt(0) || ""}${
                    user.lastname?.charAt(0) || ""
                  }`.toUpperCase()}
                </div>
                <div onClick={toggleMenu}>▾</div>
              </div>
              {menuOpen && (
                <div>
                  {user?.role === "cliente" && (
                    <>
                      <Link to="/cliente">Mi Perfil</Link>
                    </>
                  )}
                  {user?.role === "admin" && (
                    <>
                      <Link to="/clientes">Gestionar Clientes</Link>
                      <Link to="/vehiculos">Gestionar Vehiculos</Link>
                      <Link to="/empleados">Gestionar Empleados</Link>
                    </>
                  )}
                  {user?.role === "recepcionista" && (
                    <>
                      <Link></Link>
                    </>
                  )}
                  {user?.role === "personal_entrega" && (
                    <>
                      <Link></Link>
                    </>
                  )}
                  {user?.role === "personal_recepcion" && (
                    <>
                      <Link></Link>
                    </>
                  )}
                  <hr />
                  <span onClick={handleLogout}>Cerrar sesión</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
