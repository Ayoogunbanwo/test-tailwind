import React from "react";
import congratimg from "../assets/welcome.gif";
import imgicon from "../assets/check-circle.svg";

const Congratulations = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Container */}
      <div className="relative w-[600px] h-[704px] bg-white overflow-hidden rounded-md">
        {/* Confetti Background */}
        <img
          src={congratimg}
          alt="Confetti Background"
          className="absolute top-0 left-0 w-full h-3/4 object-cover"
        />

        {/* Success Icon */}
        <img
          src={imgicon}
          alt="Success Icon"
          className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-32 h-32 mb-4"
        />

        {/* Text Section */}
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 text-center px-8">
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Congratulations</h1>
          <p className="text-base text-gray-600 mt-4 mb-8">
            Your Email has been successfully verified. Click below to continue.
          </p>

          {/* Continue Button */}
          <a
            href="/createaccount"
            className="inline-block w-full bg-teal-600 text-white text-center py-4 rounded-md hover:bg-teal-700 transition duration-200"
          >
            Continue
          </a>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
