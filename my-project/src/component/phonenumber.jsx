import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Default styles from the library
import "../assets/PhoneNumber.css"; // Custom CSS overrides for styling

const PhoneNumber = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <PhoneInput
        country={"ca"} // Default country as Canada
        value={phone}
        onChange={(value) => setPhone(value)}
        inputProps={{
          name: "phone",
          required: true,
          className:
            "w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500",
        }}
        containerClass="phone-input-container"
        inputClass="phone-input"
        dropdownClass="phone-dropdown"
      />
    </div>
  );
};

export default PhoneNumber;
