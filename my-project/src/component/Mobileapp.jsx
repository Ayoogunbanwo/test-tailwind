import React from 'react';
import PropTypes from 'prop-types';
import Appstoreimg from "../assets/App Store PNG.png";
import Playstoreimg from "../assets/Play Store PNG.png";
import imgblack from "../assets/Group 4.png";
import logoSrc from "../assets/Logo whie - Drivewise.svg";

const Appsoon = ({ mainText, descriptionText }) => {
  return (
    <section className="hero flex flex-col sm:flex-row md:flex-row lg:flex-row items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 lg:p-6 md:p-6 md:mt-3 sm:mt-3 lg:mx-6 md:mx-6 sm:mx-auto">
      {/* Content Section */}
      <div className="hero-content w-full lg:w-1/2 mb-6 mt-6 lg:mb-0 text-center lg:text-left animate-fade-in">
        <h1 className="GetMovingToday text-black text-2xl text-left font-bold font-['Open Sans'] px-8 py-4 lg:text-4xl md:text-3xl sm:text-2xl">
          {mainText}
        </h1>
        <p className="text-gray-700 text-sm md:text-base mb-8 lg:mb-12 text-justify px-8 leading-relaxed">
          {descriptionText}
        </p>
        <div className="buttons flex flex-row gap-4 justify-start px-8">
          <a href="#" className="btn-primary w-full sm:w-auto bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 ease-in-out text-center text-sm sm:text-base">
            Download the app
          </a>
        </div>
        <div className="buttons flex flex-row gap-4 justify-start mt-6 px-8">
          <a href="#" aria-label="Download on Play Store" className="hover:opacity-80 transition-opacity duration-200">
            <img className="AppStorePng w-48 h-14 sm:w-32 sm:h-10" src={Playstoreimg} alt="Download on Play Store" />
          </a>
          <a href="#" aria-label="Download on App Store" className="hover:opacity-80 transition-opacity duration-200">
            <img className="AppStorePng w-48 h-14 sm:w-32 sm:h-10" src={Appstoreimg} alt="Download on App Store" />
          </a>
        </div>
      </div>

      {/* Image Section */}
      <div className="hero-image w-full lg:w-1/2 flex justify-center lg:pl-6">
        <div className="relative inline-block">
          <img className="Main w-full max-w-[100%] h-auto shadow-lg rounded-lg" src={imgblack} alt="App Preview" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="LogoDrivewise w-56 h-28 mb-4">
              <img src={logoSrc} alt="Drivewise Logo" />
            </div>
            <div className="ComingSoon text-center text-white text-4xl font-extrabold font-['Open Sans']">
              Coming Soon..
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Prop Validation
Appsoon.propTypes = {
  mainText: PropTypes.string.isRequired,
  descriptionText: PropTypes.string.isRequired,
};

export default Appsoon;