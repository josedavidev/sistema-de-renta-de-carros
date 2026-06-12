export function validarHoras(
  horaRecogida,
  horaDevolucion,
  fechaRecogida,
  fechaDevolucion
) {
  if (fechaRecogida !== fechaDevolucion) return true;

  const [hrRec, minRec] = horaRecogida.split(":").map(Number);
  const [hrDev, minDev] = horaDevolucion.split(":").map(Number);
  const minutosRecogida = hrRec * 60 + minRec;
  const minutosDevolucion = hrDev * 60 + minDev;

  return minutosDevolucion > minutosRecogida
    ? true
    : "La hora de devolución debe ser mayor a la de recogida";
}
