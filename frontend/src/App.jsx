import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { Navbar } from "./components/nav-bar/Navbar";
import { Footer } from "./components/footer/Footer";

import { Home } from "./pages/home/Home";
import { ChoiceVehicle } from "./pages/reservar/ChoiceVehicle";
import { DataUser } from "./pages/reservar/DataUser";
import { Payment } from "./pages/reservar/Payment";
import { Invoice } from "./pages/reservar/Invoice";
import { CatalogoCarros } from "./pages/catalogo_carros/CatalogoCarros";
import { MisReservas } from "./pages/mis-reservas/MisReservas";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Ayuda } from "./pages/ayuda/Ayuda";

import { Admin } from "./pages/employees/Admin";
import { Receptionist } from "./pages/employees/receptionist";
import { Informes } from "./pages/informes/Informes";
import { HistorialReservas } from "./pages/historial-reservas/HistorialReservas";
import { GestionClientes } from "./pages/gestion-clientes/GestionClientes";
import { CrearCliente } from "./pages/gestion-clientes/CrearCliente";
import { EditarCliente } from "./pages/gestion-clientes/EditarCliente";
import { VerCliente } from "./pages/gestion-clientes/VerCliente";
import { GestionVehiculos } from "./pages/gestion-vehiculos/GestionVehiculos";
import { CrearVehiculo } from "./pages/gestion-vehiculos/CrearVehiculo";
import { EditarVehiculo } from "./pages/gestion-vehiculos/EditarVehiculo";
import { VerVehiculo } from "./pages/gestion-vehiculos/VerVehiculo";
import { GestionEmpleados } from "./pages/gestion-empleados/GestionEmpleados";
import { CrearEmpleado } from "./pages/gestion-empleados/CrearEmpleado";
import { EditarEmpleado } from "./pages/gestion-empleados/EditarEmpleado";
import { VerEmpleado } from "./pages/gestion-empleados/VerEmpleado";
import { CarrosPorCategoria } from "./pages/catalogo_carros/CarrosPorCategoria";
import { ClientHome } from "./pages/page-client/ClientHome";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Todos */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservar/vehiculo" element={<ChoiceVehicle />} />
        <Route path="/reservar/datos" element={<DataUser />} />
        <Route path="/reservar/pago" element={<Payment />} />
        <Route path="/reservar/factura" element={<Invoice />} />
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
