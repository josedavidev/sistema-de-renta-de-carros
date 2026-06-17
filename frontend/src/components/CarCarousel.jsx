import React, { useState, useEffect } from "react";
import { CarCard } from "./CarCard";

export function CarCarousel({ cars, interval = 3000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = Math.ceil(cars.length / 3); // 3 tarjetas por slide

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides);
    }, interval);
    return () => clearInterval(timer);
  }, [slides, interval]);

  return (
    <div>
      <div>
        {cars.map((car, index) => (
          <div key={car.carId}>
            <CarCard
              carId={car.carId}
              imageSrc={car.imageSrc}
              carName={car.carName}
              initialRating={car.stars}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
