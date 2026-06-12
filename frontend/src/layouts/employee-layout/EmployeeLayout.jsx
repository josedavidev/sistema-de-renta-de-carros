// src/layouts/EmployeeLayout.jsx
import React from "react";
import { NavbarEmployee } from "../../components/navbar-employee/NavbarEmployee";

export function EmployeeLayout({ children }) {
  return (
    <>
      <NavbarEmployee />
      {children}
    </>
  );
}
