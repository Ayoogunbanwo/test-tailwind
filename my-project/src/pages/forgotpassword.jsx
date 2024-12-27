import React from "react";
import logo from "../assets/Vector.png";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Container */}
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
            Forgot Password
          </h1>
          <p className="mt-4">
            Enter your email address to receive a link to reset your password
          </p>

          {/* Form */}
          <form action="#" className="flex flex-col gap-4">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email address"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 mt-6"
            />

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Send
            </button>
          </form>

          {/* Go Back Link */}
          <a
            href="/forgotpasswordphone"
            className="mt-4 inline-block text-teal-600 text-sm hover:underline"
          >
            Try another way
          </a>
          <div className="text-center text-slate-600 text-sm font-normal font-['Open Sans'] leading-tight mt-4">
            Your new Code must be different from the previously used Code.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
