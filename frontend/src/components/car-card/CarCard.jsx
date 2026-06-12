import React from "react";
import { StarRating } from "../star-rating/StarRating";
import "./CarCard.css";

export function CarCard({ carId, imageSrc, carName, initialRating }) {
  return (
    <div className="car-card">
      <div className="stars">
        {/* El rating se maneja en StarRating */}
        <StarRating initialRating={initialRating} carId={carId} />
      </div>
      <div className="car-image">
        {/* Si prefieres, puedes usar backgroundImage en lugar de <img> */}
        <img
          src={imageSrc}
          alt={carName}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="car-name">{carName}</div>
    </div>
  );
}
