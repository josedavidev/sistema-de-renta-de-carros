import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { getAllCategories, getAllVehicles } from "../services/vehicles.api";

export function CatalogoCarros() {
  const [categorias, setCategorias] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [resCats, resVehs] = await Promise.all([
          getAllCategories(),
          getAllVehicles(),
        ]);

        // 1) Filtrar sólo vehículos con status_id === 1
        const disponibles = resVehs.data.filter(
          (v) => v.status?.status_id === 1,
        );

        setVehiculos(disponibles);

        // 2) Mostrar sólo categorías que tengan al menos un vehículo disponible
        const catsConVehs = resCats.data.filter((cat) =>
          disponibles.some((v) => v.category?.category_id === cat.category_id),
        );

        setCategorias(catsConVehs);
      } catch (err) {
        console.error("Error cargando catálogo:", err);
      }
    };

    fetchDatos();
  }, []);

  const handleClick = (catId) => navigate(`/catalogo/${catId}`);

  return (
    <div>
      {categorias.map((cat) => (
        <CategoryCard
          key={cat.category_id}
          category_image={cat.category_image || "/img/default.jpg"}
          category_name={cat.category_name}
          category_description={cat.category_description}
          onClick={() => handleClick(cat.category_id)}
        />
      ))}
    </div>
  );
}
