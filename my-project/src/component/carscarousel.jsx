import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import fallbackImage from '../assets/300 x 400.png'; // Local fallback image

const CarCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState({});

  const cars = [
    // ... (your car data)
  ];

  const handleImageError = (carId) => {
    setImageError((prev) => ({ ...prev, [carId]: true }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="relative">
          {/* Main Image */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg" role="region" aria-label="Car Carousel">
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              aria-live="polite"
            >
              {cars.map((car) => (
                <div key={car.id} className="min-w-full h-full" role="group" aria-label={`Slide ${car.id}`}>
                  <Image
                    src={imageError[car.id] ? fallbackImage : car.image}
                    alt={car.name}
                    onError={() => handleImageError(car.id)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={400}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-xl font-semibold">{car.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons and Thumbnails */}
          {/* ... (same as before) */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCarousel;