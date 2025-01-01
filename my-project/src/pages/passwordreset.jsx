import React, { useState } from "react";
import logo from "../assets/Vector.png";

const ResetPassword = () => {
  const [password1Visible, setPassword1Visible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  const togglePasswordVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="max-h-full max-w-full" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mt-8 mb-6">Reset Password</h1>

        {/* Form */}
        <form className="space-y-4">
          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              id="password1"
              type={password1Visible ? "text" : "password"}
              placeholder="Enter new Password"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(setPassword1Visible)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <svg
                id="eyeIcon1"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  password1Visible ? "text-teal-600" : "text-gray-400"
                } hover:text-gray-600`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 7C7.5 19 3.5 15 3.5 12S7.5 5 12 5s8.5 4 8.5 7-4 7-8.5 7z"
                />
              </svg>
            </button>
          </div>

          {/* Confirm Password Input with Toggle */}
          <div className="relative">
            <input
              id="password2"
              type={password2Visible ? "text" : "password"}
              placeholder="Confirm new Password"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(setPassword2Visible)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <svg
                id="eyeIcon2"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  password2Visible ? "text-teal-600" : "text-gray-400"
                } hover:text-gray-600`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 7C7.5 19 3.5 15 3.5 12S7.5 5 12 5s8.5 4 8.5 7-4 7-8.5 7z"
                />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
