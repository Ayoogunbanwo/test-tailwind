import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "../component/address";
import logo from "../assets/Vector.png";
import useUser from "../config/hooks/useUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Import your Firestore configuration

const CreateAccount = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    province: "",
    country: "",
  });
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Format the phone number when the user finishes typing
  const formatPhoneNumber = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handlePhoneBlur = () => {
    setFormattedPhone(formatPhoneNumber(formattedPhone));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    if (value.match(/^[0-9 ()-]*$/)) {
      setFormattedPhone(value);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const updateUserInFirestore = async (user, formData) => {
    const userRef = doc(db, "users", user.uid); // Reference to the user's document

    try {
      await updateDoc(userRef, formData); // Update the user's data with the new fields
      console.log("User data updated successfully:", formData);
    } catch (error) {
      console.error("Error updating user data in Firestore:", error);
      throw new Error("Failed to update user data in Firestore");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled out
    if (!firstName || !lastName || !formattedPhone || !address.street || !address.country || !role) {
      alert("Please fill out all fields");
      return;
    }

    const formData = {
      firstName,
      lastName,
      phone: formattedPhone,
      address,
      role,
    };

    console.log("Submitted Data:", formData);
    console.log(user); // This will log the user info from the `useUser` hook

    try {
      // Update user data in Firestore
      await updateUserInFirestore(user, formData);

      // Navigate after form submission (optional)
      navigate("/congratulations");
    } catch (error) {
      alert("Error while updating user data.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-lg px-6">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-8" />
        </div>
        <h1 className="text-xl font-bold text-center mb-4">Create your account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={firstName}
              required
              onChange={handleFirstNameChange}
              placeholder="First Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              required
              onChange={handleLastNameChange}
              placeholder="Last Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <AddressInput setAddress={setAddress} />

          <div className="w-full">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phone"
              value={formattedPhone}
              required
              inputMode="tel"
              onBlur={handlePhoneBlur} // Format when user leaves the input
              onChange={handlePhoneChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="w-full">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              required
              onChange={handleRoleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="" disabled>Select Role</option>
              <option value="Customer">Customer</option>
              <option value="Driver">Driver</option>
              <option value="Mover">Mover</option>
            </select>
          </div>

          <button type="submit" className="w-full py-2 mt-4 bg-teal-500 text-white rounded-lg">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
