import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for routing

const MoverSection = ({
  title = 'BECOME A MOVER AND EARN EXTRA INCOME!',
  description = 'Join our network of movers and start earning today. With flexible hours and competitive pay, you can turn your free time into a steady income stream. Sign up now and get started!',
  imageSrc = '/template/images/Moversng.jpg', // Default image
  buttons = [], // Default buttons
}) => {
  return (
    <section className="hero flex flex-col md:flex-col lg:flex-row items-center justify-between bg-white">
      {/* Content Section */}
      <div className="hero-content flex-1 p-8 lg:w-1/2 text-left">
        {title && <h2 className="text-xl md:text-3xl font-bold">{title}</h2>}
        {description && <p className="text-gray-600 text-sm md:text-base mb-8 lg:mb-16 text-justify pr-3">{description}</p>}
        <div className="buttons flex flex-row gap-4 justify-start">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.to}
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
      <div className="hero-image flex-1 lg:w-1/2 box-shadow">
        <img
          src={imageSrc}
          alt="Movers at work"
          className="w-full h-auto object-cover block" // Add `block`/>
        />
      </div>
    </section>
  );
};

export default MoverSection;
