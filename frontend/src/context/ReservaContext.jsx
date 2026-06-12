import { createContext, useContext, useState } from "react";

const ReservaContext = createContext();

export const useReserva = () => useContext(ReservaContext);

export const ReservaProvider = ({ children }) => {
  const [reserva, setReserva] = useState({});

  return (
    <ReservaContext.Provider value={{ reserva, setReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};
