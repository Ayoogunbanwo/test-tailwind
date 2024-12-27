import React from "react";
import logo from "../assets/Vector.png";

const OtpReceived = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Form Section */}
        <div className="text-center">
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Enter OTP
          </h1>
          <p className="mt-4 mb-6">
            Enter OTP received to reset your password
          </p>

          {/* OTP Input */}
          <form action="#" method="POST" className="space-y-4">
            <div className="flex gap-2 justify-center">
              {/* Individual Digit Inputs */}
              <input
                type="text"
                maxLength="1"
                className="h-14 w-12 text-center border border-neutral-400 rounded-xl text-base font-normal text-zinc-500 focus:outline-teal-600"
                aria-label="First digit"
              />
              <input
                type="text"
                maxLength="1"
                className="h-14 w-12 text-center border border-neutral-400 rounded-xl text-base font-normal text-zinc-500 focus:outline-teal-600"
                aria-label="Second digit"
              />
              <input
                type="text"
                maxLength="1"
                className="h-14 w-12 text-center border border-neutral-400 rounded-xl text-base font-normal text-zinc-500 focus:outline-teal-600"
                aria-label="Third digit"
              />
              <input
                type="text"
                maxLength="1"
                className="h-14 w-12 text-center border border-neutral-400 rounded-xl text-base font-normal text-zinc-500 focus:outline-teal-600"
                aria-label="Fourth digit"
              />
              <input
                type="text"
                maxLength="1"
                className="h-14 w-12 text-center border border-neutral-400 rounded-xl text-base font-normal text-zinc-500 focus:outline-teal-600"
                aria-label="Fifth digit"
              />
              <input
                type="text"
                maxLength="1"
                className="h-14 w-12 text-center border border-neutral-400 rounded-xl text-base font-normal text-zinc-500 focus:outline-teal-600"
                aria-label="Sixth digit"
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Confirm OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpReceived;
