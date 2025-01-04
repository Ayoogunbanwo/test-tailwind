import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "../component/address";
import { TruckIcon } from "lucide-react"; // Import TruckIcon
import { useUser  } from '@/config/hooks/useUser';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Import your Firestore configuration
import PhoneInput from "react-phone-number-input"; // Import PhoneInput
import "react-phone-number-input/style.css"; // Import styles for the phone input

const CreateAccount = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(""); // State for phone number
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    province: "",
    country: "",
  });
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState(null); // State to store the uploaded image
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Function to handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the uploaded image as a base64 string
      };
      reader.readAsDataURL(file);
    }
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
    setIsLoading(true);

    // Validate that all fields are filled out
    if (!firstName || !lastName || !phone || !address.street || !address.country || !role) {
      alert("Please fill out all fields");
      setIsLoading(false);
      return;
    }

    // Prepare form data
    const formData = {
      firstName,
      lastName,
      phone, // Use the formatted phone number
      address,
      role,
      profileimage: profileImage || "https://avatar.iran.liara.run/public/boy", // Use uploaded image or default
    };

    console.log("Submitted Data:", formData);
    console.log(user); // Log user info from the `useUser` hook

    try {
      // Update user data in Firestore
      await updateUserInFirestore(user, formData);

      // Navigate after form submission (optional)
      navigate("/congratulations");
    } catch (error) {
      console.error("Error while updating user data:", error);
      alert("Error while updating user data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50">
      <div className="w-full max-w-lg px-6 py-8 bg-white rounded-xl shadow-lg">
        {/* Updated Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <TruckIcon className="h-8 w-8 text-teal-600" />
            <span className="font-bold text-teal-600 text-2xl">Truckit</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={firstName}
              required
              onChange={handleFirstNameChange}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              required
              onChange={handleLastNameChange}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          <AddressInput setAddress={setAddress} />

          <div className="w-full">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="CA" // Set default country
              value={phone}
              onChange={setPhone} // Update phone state
              placeholder="Enter phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>Select Role</option>
              <option value="Customer">Customer</option>
              <option value="Driver">Driver</option>
              <option value="Mover">Mover</option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-24 h-24 mt-2 rounded-full object-cover border-2 border-teal-500"
              />
            ) : (
              <div
                className="w-24 h-24 mt-2 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-400"
              >
                No Image
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 disabled:opacity-50 transition-all"
          >
            {isLoading ? "Submitting..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;