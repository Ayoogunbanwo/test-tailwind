import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import imgstep1 from "../assets/Wavy_Bus-09_Single-10 1.png";
import imgstep2 from "../assets/man-moving-5-stars.png";
import imgstep3 from "../assets/image 3.png";
import Arrow from "../assets/1672149593Curved_solid_arrow 1.png"; // Import Arrow image

const images = {
  step1: imgstep1,
  step2: imgstep2,
  step3: imgstep3,
};

// The HowItWorks component that accepts `images` as a prop
const HowItWorks = ({ images }) => {
  return (
    <div className="How-itworks bg-white pb-12 px-8 sm:px-8 mx-3 flex justify-center">
      <div className="container flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 lg:space-x-6">
        {/* Step 1: Customers */}
        <div className="flex flex-col items-center p-4">
          <div className="w-60 h-60 border-2 border-teal-500 rounded-full sm:w-60 sm:h-60 md:w-60 md:h-60 lg:w-60 lg:h-60 md:border-4 mb-4">
            <img src={images.step1} alt="Customer" className="w-full h-full rounded-full" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Customers</p>
            <p>Post a move request.</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="arrow text-xl text-orange-600 transform -translate-y-1/2 hidden md:hidden lg:block">
          <img src={Arrow} alt="Arrow" />
        </div>

        {/* Step 2: Drivers & Movers */}
        <div className="flex flex-col items-center p-4">
          <div className="w-60 h-60 border-2 border-teal-500 rounded-full sm:w-60 sm:h-60 md:w-60 md:h-60 lg:w-60 lg:h-60 md:border-4 mb-4">
            <img src={images.step2} alt="Drivers & Movers" className="w-full h-full rounded-full" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Drivers & Movers</p>
            <p>Accepts request.</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="arrow text-xl text-orange-600 transform -translate-y-1/2 hidden lg:block">
          <img src={Arrow} alt="Arrow" />
        </div>

        {/* Step 3: Completion */}
        <div className="flex flex-col items-center p-4">
          <div className="w-60 h-60 border-2 border-teal-500 rounded-full sm:w-60 sm:h-60 md:w-60 md:h-60 lg:w-60 lg:h-60 md:border-4 mb-4">
            <img src={images.step3} alt="Payment completion" className="w-full h-full rounded-full" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Completion/Payment</p>
            <p>Review the service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop Validation for HowItWorks component
HowItWorks.propTypes = {
  images: PropTypes.shape({
    step1: PropTypes.string.isRequired,  // Validate that step1 is a string (URL)
    step2: PropTypes.string.isRequired,  // Validate that step2 is a string (URL)
    step3: PropTypes.string.isRequired,  // Validate that step3 is a string (URL)
  }).isRequired,  // Ensures that the images prop is passed and contains the required keys
};

export default HowItWorks ;
