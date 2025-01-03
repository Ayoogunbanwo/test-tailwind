import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
import imgtest from '../assets/undraw_delivery-truck_mjui.svg';
import driver2 from '../assets/undraw_delivery-address_409g.svg';
import mover1 from '../assets/undraw_moving_2cfm.svg';
import mover2 from '../assets/undraw_order-delivered_puaw.svg';

const slides = [
  {
    left: {
      title: "DRIVE YOUR WAY TO EXTRA INCOME!",
      subtitle: "Sign up now and get started!",
      bgColor: "bg-gradient-to-br from-teal-400 to-teal-600",
      buttonLink: "/driver",
      product: imgtest,
      productAlt: "Driver illustration"
    },
    right: {
      title: "JOIN OUR GROWING NETWORK OF MOVERS",
      subtitle: "Sign up now and get started!",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      buttonLink: "/movers",
      product: mover1,
      productAlt: "Mover illustration"
    }
  },
  {
    left: {
      title: "MAKE EXTRA MONEY MOVING",
      subtitle: "Sign up now as a Driver and get started!",
      bgColor: "bg-gradient-to-br from-teal-400 to-teal-600",
      buttonLink: "/driver",
      product: driver2,
      productAlt: "Moving illustration"
    },
    right: {
      title: "TURN YOUR FREE TIME INTO STEADY INCOME ",
      subtitle: "Sign up now as a Mover and get started!",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      buttonLink: "/movers",
      product: mover2,
      productAlt: "Income illustration"
    }
  }
];

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const Panel = ({ data, side }) => (
    <div 
      className={`w-full ${data.bgColor} p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center transition-all duration-500 ease-in-out shadow-lg
        ${side === 'right' ? 'md:border-l border-t md:border-t-0' : ''}`}
    >
      <div className={`${data.textColor || 'text-white'} text-center`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
          {data.title}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 md:mb-8 font-light">
          {data.subtitle}
        </p>
        <Link 
          to={data.buttonLink}
          className={`inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold 
            transition-all duration-300 shadow-lg hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            ${side === 'left' 
              ? 'bg-white text-teal-600 hover:bg-opacity-90' 
              : 'bg-gradient-to-r from-teal-400 to-teal-600 text-white'}`}
        >
          Register Now
        </Link>
      </div>
      <div className="mt-6 sm:mt-8 md:mt-12 w-48 sm:w-56 md:w-64 lg:w-72">
        <img
          src={data.product}
          alt={data.productAlt}
          className={`object-contain w-full h-full rounded-lg shadow-lg
            ${side === 'left' ? 'transform rotate-12 hover:rotate-0' : 'hover:scale-110'} 
            transition-transform duration-500`}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full relative overflow-hidden">
      {isMobile ? (
        // Mobile View: Show only the first slide's panels (left and right)
        <div className="w-full flex flex-col">
          <Panel data={slides[0].left} side="left" />
          <Panel data={slides[0].right} side="right" />
        </div>
      ) : (
        // Desktop View: Show carousel
        <>
          <div
            className="w-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 flex">
                <Panel data={slide.left} side="left" />
                <Panel data={slide.right} side="right" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-6">
            <button 
              onClick={prevSlide}
              className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="text-teal-600" />
            </button>
            <button 
              onClick={nextSlide}
              className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="text-teal-600" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                  ${currentSlide === index 
                    ? 'bg-teal-500 w-6 sm:w-8' 
                    : 'bg-teal-300/50 w-2 sm:w-3 hover:bg-teal-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;