import React from 'react';
import PropTypes from 'prop-types';
import Appstoreimg from "../assets/App Store PNG.png";
import Playstoreimg from "../assets/Play Store PNG.png";
import imgblack from "../assets/NewMock.png";
import { Link } from 'react-router-dom';
import { TruckIcon, BellIcon, ChevronDown, SearchIcon } from 'lucide-react';

const Appsoon = ({ mainText, descriptionText }) => {
  return (
    <section className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]">
          {/* Content Section */}
          <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {mainText}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {descriptionText}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <a 
                href="#" 
                className="transform hover:scale-105 transition-transform duration-300"
                aria-label="Download on Play Store"
              >
                <img 
                  className="h-14 w-auto" 
                  src={Playstoreimg}
                  alt="Download on Play Store" 
                />
              </a>
              <a 
                href="#" 
                className="transform hover:scale-105 transition-transform duration-300"
                aria-label="Download on App Store"
              >
                <img 
                  className="h-14 w-auto" 
                  src={Appstoreimg}
                  alt="Download on App Store" 
                />
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 w-[80%] max-w-[400px]">
              <img 
                className="w-full h-auto"
                src={imgblack}
                alt="App Preview"
              />
              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Appsoon.propTypes = {
  mainText: PropTypes.string.isRequired,
  descriptionText: PropTypes.string.isRequired,
};

export default Appsoon;