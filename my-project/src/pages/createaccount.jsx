import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "../component/address";
import { Truck } from "lucide-react";
import { useUser } from "../config/useUser";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const { updateProfile } = useUser(); // Import updateProfile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    province: "",
    country: "",
  });
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to set a cookie with expiry
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  // Function to get a cookie by name
  const getCookie = (name) => {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  // Function to delete a cookie by name
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
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

    // Prepare profile data
    const profileData = {
      firstName,
      lastName,
      phone,
      address,
      role,
      profileImage: profileImage || "https://avatar.iran.liara.run/public/boy",
    };

    try {
      // Update user profile
      await updateProfile(profileData);

      // Set a cookie with 1-day expiry
      setCookie("registeredThroughLanding", "true", 1);

      // Redirect to homepage
      navigate("/signin");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error while updating profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50">
      <div className="w-full max-w-lg px-6 py-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Truckit
            </span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={firstName}
            required
            onChange={handleFirstNameChange}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            value={lastName}
            required
            onChange={handleLastNameChange}
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <AddressInput setAddress={setAddress} />
          <PhoneInput
            international
            defaultCountry="CA"
            value={phone}
            onChange={setPhone}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={role}
            required
            onChange={handleRoleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="" disabled>Select Role</option>
            <option value="Customer">Customer</option>
            <option value="Driver">Driver</option>
            <option value="Mover">Mover</option>
          </select>
          <div className="w-full">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="cursor-pointer bg-gray-100 p-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-500">
                {profileImage ? "Image Selected" : "No image chosen"}
              </span>
            </div>
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-24 h-24 mt-4 rounded-full object-cover border-2 border-teal-500"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;