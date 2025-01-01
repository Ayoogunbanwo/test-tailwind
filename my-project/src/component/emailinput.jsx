import React, { useState } from "react";

const EmailInput = () => {
  const [email, setEmail] = useState(""); // Declare the state for the email

  const handleInputChange = (event) => {
    setEmail(event.target.value); // Update the email state when the input changes
  };

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      </label>
      <input
        type="email"
        id="email"
        name="personalInfo.email"
        value={email}
        onChange={handleInputChange}
        required
        className="mt-1 p-2 w-full border rounded-md"
        placeholder="Enter your email"
      />
    </div>
  );
};

export default EmailInput;
