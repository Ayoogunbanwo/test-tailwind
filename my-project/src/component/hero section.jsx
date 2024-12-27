import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const HeroSection = ({ title, description, imageSrc, buttons }) => {
  return (
    <section className="hero flex flex-col md:flex-row lg:flex-row items-center justify-between bg-white">
      {/* Content Section */}
      <div className="hero-content flex-1 p-8 lg:w-1/2 text-left">
        {title && <h2 className="text-xl md:text-3xl mb-4 font-bold">{title}</h2>}
        {description && <p className="text-gray-600 text-sm md:text-base mb-8 lg:mb-16 text-justify pr-3">{description}</p>}
        <div className="buttons flex flex-row gap-4 justify-start">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.to} // Use 'to' instead of 'href'
              className={`py-2 px-4 sm:px-6 sm:py-3 rounded-lg font-semibold transition duration-300 ease-in-out text-center text-xs sm:text-sm ${
                button.isPrimary
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-600 hover:text-white'
              }`}
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="hero-image flex-1 lg:w-1/2">
        <img
          src={imageSrc ? imageSrc : '/template/images/Vanimage 2.png'}
          alt="Moving van with boxes"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  imageSrc: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired, // Changed from href to to
      text: PropTypes.string.isRequired,
      isPrimary: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

HeroSection.defaultProps = {
  title: (
    <>
      Simplify Your Move with New
      <span className="text-teal-600 font-bold"> Mover App</span>
    </>
  ),
  description:
    'Connecting customers with reliable drivers and movers, the New Mover App simplifies the moving process with transparent pricing, real-time updates, and professional support for a seamless experience.',
  imageSrc: '/template/images/Vanimage 2.png',
};

export default HeroSection;
