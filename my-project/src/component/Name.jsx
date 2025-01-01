import React from "react";
import PropTypes from "prop-types";

const NameInput = ({ firstName, lastName, onFirstNameChange, onLastNameChange }) => (
  <div>
    <input
      type="text"
      name="firstName"
      value={firstName}
      onChange={onFirstNameChange}
      placeholder="First Name"
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
    />
    <input
      type="text"
      name="lastName"
      value={lastName}
      onChange={onLastNameChange}
      placeholder="Last Name"
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

NameInput.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onFirstNameChange: PropTypes.func,
  onLastNameChange: PropTypes.func,
};

export default NameInput;
