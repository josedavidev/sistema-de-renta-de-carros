import React, { useState } from "react";
import axios from "axios";

export function StarRating({ initialRating = 0, carId }) {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (index) => {
    setRating(index);
    // Ejemplo de llamada al backend para guardar la calificación:
    // axios.post(`/api/cars/${carId}/rate`, { rating: index })
    //   .then(res => console.log("Calificación guardada:", res.data))
    //   .catch(err => console.error("Error:", err));
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span key={starIndex} onClick={() => handleStarClick(starIndex)}>
          ★
        </span>
      ))}
    </div>
  );
}
