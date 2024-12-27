// CreateAccount.js
import React, { useState } from "react";
import NameInput from "../component/Name";
import AddressInput from "../component/address";
import PasswordInput from "../component/password";
import RoleSelection from "../component/role";
import PhoneNumberInput from "../component/phonenumber";
import logo from "../assets/Vector.png";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    province: "",
    country: "",
    phoneNumber: "",
    password: "",
    role: "customer",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phone) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: phone,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-lg px-6">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-8" />
        </div>
        <h1 className="text-xl font-bold text-center mb-4">Create your account</h1>
        <form className="space-y-4" onChange={handleInputChange} onSubmit={handleSubmit}>
          <NameInput />
          <AddressInput />
          <div onChange={handlePhoneChange}>
            <PhoneNumberInput />
          </div>
          <PasswordInput />
          <RoleSelection />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-teal-500 text-white rounded-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
