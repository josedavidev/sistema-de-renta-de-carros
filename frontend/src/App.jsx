import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { ChoiceVehicle } from "./pages/ChoiceVehicle";
import { DataUser } from "./pages/DataUser";
import { Payment } from "./pages/Payment";
import { Invoice } from "./pages/Invoice";
import { CatalogoCarros } from "./pages/CatalogoCarros";
import { MisReservas } from "./pages/MisReservas";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Ayuda } from "./pages/Ayuda";

import { Admin } from "./pages/Admin";
import { Receptionist } from "./pages/receptionist";
import { Informes } from "./pages/Informes";
import { HistorialReservas } from "./pages/HistorialReservas";
import { GestionClientes } from "./pages/GestionClientes";
import { CrearCliente } from "./pages/CrearCliente";
import { EditarCliente } from "./pages/EditarCliente";
import { VerCliente } from "./pages/VerCliente";
import { GestionVehiculos } from "./pages/GestionVehiculos";
import { CrearVehiculo } from "./pages/CrearVehiculo";
import { EditarVehiculo } from "./pages/EditarVehiculo";
import { VerVehiculo } from "./pages/VerVehiculo";
import { GestionEmpleados } from "./pages/GestionEmpleados";
import { CrearEmpleado } from "./pages/CrearEmpleado";
import { EditarEmpleado } from "./pages/EditarEmpleado";
import { VerEmpleado } from "./pages/VerEmpleado";
import { CarrosPorCategoria } from "./pages/CarrosPorCategoria";
import { ClientHome } from "./pages/ClientHome";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Todos */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vehiculo" element={<ChoiceVehicle />} />
        <Route path="/datos" element={<DataUser />} />
        <Route path="/pago" element={<Payment />} />
        <Route path="/factura" element={<Invoice />} />
        <Route path="/catalogo" element={<CatalogoCarros />} />
        <Route path="/catalogo/:categoria" element={<CarrosPorCategoria />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/ayuda" element={<Ayuda />} />
        {/* Rutas protegidas para el admin */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/clientes" element={<GestionClientes />} />
          <Route path="/clientes/crear" element={<CrearCliente />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} />
          <Route path="/clientes/ver/:id" element={<VerCliente />} />
          <Route path="/vehiculos" element={<GestionVehiculos />} />
          <Route path="/vehiculos/crear" element={<CrearVehiculo />} />
          <Route path="/vehiculos/editar/:id" element={<EditarVehiculo />} />
          <Route path="/vehiculos/ver/:id" element={<VerVehiculo />} />
          <Route path="/empleados" element={<GestionEmpleados />} />
          <Route path="/empleados/crear" element={<CrearEmpleado />} />
          <Route path="/empleados/editar/:id" element={<EditarEmpleado />} />
          <Route path="/empleados/ver/:id" element={<VerEmpleado />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["cliente"]} />}>
          <Route path="/cliente" element={<ClientHome />} />
        </Route>
        {/* Rutas protegidas para el recepcionista y admin */}
        <Route
          element={<PrivateRoute allowedRoles={["admin", "recepcionista"]} />}
        >
          <Route path="/recepcionista" element={<Receptionist />} />
          <Route path="/historial-reservas" element={<HistorialReservas />} />
        </Route>
        {/* Rutas protegidas para el personal de recepción */}
        <Route element={<PrivateRoute allowedRoles={["personal_recepcion"]} />}>
          <Route path="/informes" element={<Informes />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
