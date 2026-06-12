import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin" />;
      case "cliente":
        return <Navigate to="/home" />;
      case "recepcionista":
        return <Navigate to="/recepcionista" />;
      case "personal_entrega":
        return <Navigate to="/employee-home" />;
      case "personal_recepcion":
        return <Navigate to="/employee-home" />;
      default:
        return <Navigate to="/home" />;
    }
  }

  return children;
}
