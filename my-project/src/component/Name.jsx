// NameInput.js
import React from "react";

const NameInput = () => {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        required
        className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        required
        className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
};

export default NameInput;
