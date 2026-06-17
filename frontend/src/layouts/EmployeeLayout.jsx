import React from "react";
import { NavbarEmployee } from "../components/NavbarEmployee";

export function EmployeeLayout({ children }) {
  return (
    <>
      <NavbarEmployee />
      {children}
    </>
  );
}
