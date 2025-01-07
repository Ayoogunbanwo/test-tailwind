import React, { useState } from "react";

// Utility function to validate email format
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const EmailInput = ({ label = "Email", placeholder = "Enter your email", className = "", onEmailChange }) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    // Validate email format
    const isValidEmail = validateEmail(value);
    setIsValid(isValidEmail);

    // Notify parent component of the email change
    if (onEmailChange) {
      onEmailChange(value, isValidEmail);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        required
        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
          isValid ? "focus:ring-teal-500 border-gray-300" : "focus:ring-red-500 border-red-500"
        }`}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={!isValid}
      />
      {!isValid && email.length > 0 && (
        <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
      )}
    </div>
  );
};

export default EmailInput;