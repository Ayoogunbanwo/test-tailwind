import React from 'react';
import { Link } from 'react-router-dom';

const MoverSection = ({
  title = 'BECOME A MOVER AND EARN EXTRA INCOME!',
  description = '',
  imageSrc = '/template/images/Moversng.jpg',
  buttons = [],
}) => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with image and gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 via-teal-50/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-600/90 via-teal-50/50 to-transparent z-10" />
        <img
          src={imageSrc}
          alt="Background"
          className="absolute right-0 top-0 h-full w-full lg:w-3/4 object-cover object-center"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center min-h-screen">
        {/* Text Content */}
        <div className="max-w-2xl mx-auto text-center lg:text-left space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-black/90 leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
            {buttons.map((button, index) => (
              <Link
                key={index}
                to={button.to}
                className={`px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 duration-300 ${
                  button.isPrimary
                    ? 'bg-white text-teal-900 hover:bg-gray-50'
                    : 'border-2 border-white text-white hover:bg-white/20'
                }`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block z-10">
          <div className="relative h-[400px] w-[400px]">
            <div className="absolute right-0 w-64 h-64 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="absolute right-20 w-48 h-48 bg-gradient-to-r from-purple-300 to-purple-400 rounded-full blur-lg opacity-20 animate-pulse delay-100" />
            <div className="absolute right-40 w-32 h-32 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full blur-md opacity-30 animate-pulse delay-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoverSection;