import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

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
    <nav className="navbar-container">
      <div className="navbar-div-logo">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h1 className="navbar-logo">Rent a Car</h1>
        </Link>
      </div>

      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/catalogo" className="navbar-right-item">
              Catálogo Carros
            </Link>
            <div className="navbar-login">
              {location.pathname !== "/login" && (
                <Link to="/login" className="navbar-right-item">
                  Iniciar Sesión
                </Link>
              )}
              {location.pathname !== "/login" &&
                location.pathname !== "/register" && <span> | </span>}
              {location.pathname !== "/register" && (
                <Link to="/register" className="navbar-right-item">
                  Registrarse
                </Link>
              )}
            </div>
          </>
        )}
        {(user?.role === "cliente" ||
          user?.role === "admin" ||
          user?.role === "recepcionista") && (
          <>
            {location.pathname !== "/catalogo" && (
              <Link to="/catalogo" className="navbar-right-item">
                Catálogo Carros
              </Link>
            )}
            <div className="navbar-menu-container" ref={menuRef}>
              <div className="navbar-menu">
                <div className="navbar-menu-initials" onClick={toggleMenu}>
                  {`${user.firstname?.charAt(0) || ""}${
                    user.lastname?.charAt(0) || ""
                  }`.toUpperCase()}
                </div>
                <div className="navbar-dropdown-arrow" onClick={toggleMenu}>
                  ▾
                </div>
              </div>
              {menuOpen && (
                <div className="navbar-dropdown-menu">
                  {user?.role === "cliente" && (
                    <>
                      <Link to="/cliente" className="navbar-dropdown-item">
                        Mi Perfil
                      </Link>
                    </>
                  )}
                  {user?.role === "admin" && (
                    <>
                      <Link to="/clientes" className="navbar-dropdown-item">
                        Gestionar Clientes
                      </Link>
                      <Link to="/vehiculos" className="navbar-dropdown-item">
                        Gestionar Vehiculos
                      </Link>
                      <Link to="/empleados" className="navbar-dropdown-item">
                        Gestionar Empleados
                      </Link>
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
                  <hr className="navbar-dropdown-line" />
                  <span
                    className="navbar-dropdown-item"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Cerrar sesión
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
