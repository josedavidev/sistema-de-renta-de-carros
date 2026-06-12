import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ReservaProvider } from "./context/ReservaContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReservaProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReservaProvider>
  </React.StrictMode>,
);
