import React from 'react';
import PropTypes from 'prop-types';
import Appstoreimg from "../assets/App Store PNG.png";
import Playstoreimg from "../assets/Play Store PNG.png";
import imgblack from "../assets/Group 4.png"
import logoSrc from "../assets/Logo whie - Drivewise.svg"

const Appsoon = ({ mainText, descriptionText }) => {
  return (
    <section className="hero flex flex-col sm:flex-row md:flex-row lg:flex-row items-center justify-between sm:bg-white lg:bg-orange-100 md:bg-orange-100 lg:p-6 md:p-6 md:mt-3 sm:mt-3 lg:mx-6 md:mx-6 sm:mx-auto">
  <div className="hero-content w-full lg:w-1/2 mb-6 mt-6 lg:mb-0 text-center">
    <h1 className="GetMovingToday text-black text-2xl text-left text-justify font-bold font-['Open Sans'] px-8 py-4 lg:text-4xl md:text-2xl sm:text-justify text-center">
      {mainText}
    </h1>

    <p className="text-black-600 text-sm md:text-base mb-8 lg:mb-16 text-justify text-center px-8">
      {descriptionText}
    </p>
    <div className="buttons flex flex-row gap-4 justify-start px-8">
      <a href="#" className="btn-primary w-full sm:w-auto bg-teal-600 text-white py-2 px-4 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 ease-in-out text-center text-xs sm:text-sm">
        Download the app
      </a>
    </div>

    <div className="buttons flex flex-row gap-4 justify-start mt-6 px-8">
      <a href="#" aria-label="Download on Play Store">
        <img className="AppStorePng w-64 h-20 sm:w-32 h-9 sm:justify-center block" src={Playstoreimg} alt="Download on Play Store" />
      </a>
      <a href="#" aria-label="Download on App Store">
        <img className="AppStorePng w-64 h-20 sm:w-32 h-9 sm:justify-center block" src={Appstoreimg} alt="Download on App Store" />
      </a>
    </div>
  </div>

  {/* Image Section */}
  <div className="hero-image justify-between w-full lg:w-1/2 justify-center text-center lg:pl-6">
  <div className="relative inline-block">
    <img className="Main w-full max-w-[100%] h-auto justify-center sm:w-32 md:w-auto lg:w-auto" src={imgblack} alt="App Preview" />
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
