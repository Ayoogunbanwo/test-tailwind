// PasswordInput.js
import React, { useState } from "react";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute inset-y-0 right-3 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400 hover:text-gray-600"
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
  );
};

export default PasswordInput;
