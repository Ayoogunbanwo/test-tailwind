import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import "../assets/PhoneNumber.css"; // Custom CSS overrides for styling

const PhoneNumber = ({ phoneNumber, handleInputChange }) => {
  const [formattedPhone, setFormattedPhone] = useState(phoneNumber || "");

  useEffect(() => {
    // Update the formatted phone number if the phoneNumber prop changes
    if (phoneNumber !== formattedPhone) {
      setFormattedPhone(phoneNumber || "");
    }
  }, [phoneNumber]); // Only include phoneNumber as dependency

  const formatPhoneNumber = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");  // Remove all non-numeric characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.match(/^[0-9 ()-]*$/)) {  // Allows only numeric values and formatting characters
      const formattedValue = formatPhoneNumber(value);
      setFormattedPhone(formattedValue);
      handleInputChange(e); // Pass change event back to parent
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        name="phoneNumber"
        id="phone"
        value={formattedPhone}
        onChange={handleChange}
        required
        inputMode="tel" // Improve input behavior on mobile
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="(123) 456-7890"
      />
    </div>
  );
};

PhoneNumber.propTypes = {
  phoneNumber: PropTypes.string, // Validate phone number prop
  handleInputChange: PropTypes.func.isRequired, // Ensure handleInputChange is passed as a function
};

export default PhoneNumber;
