import React from "react";
import { StarRating } from "./StarRating";

export function CarCard({ carId, imageSrc, carName, initialRating }) {
  return (
    <div>
      <div>
        {/* El rating se maneja en StarRating */}
        <StarRating initialRating={initialRating} carId={carId} />
      </div>
      <div>
        {/* Si prefieres, puedes usar backgroundImage en lugar de <img> */}
        <img src={imageSrc} alt={carName} />
      </div>
      <div>{carName}</div>
    </div>
  );
}
