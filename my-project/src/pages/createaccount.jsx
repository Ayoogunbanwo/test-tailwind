import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "../component/address";
import { useUser } from "../config/useUser";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase"; // Import Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CreateAccount = () => {
  const { updateProfile } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Preview
  const [imageURL, setImageURL] = useState(""); // Cloudinary URL
  const [isImageUploading, setIsImageUploading] = useState(false); // Image upload status
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview while uploading
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);

    setIsImageUploading(true);

    // Prepare Cloudinary upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        setImageURL(data.secure_url); // Save the Cloudinary URL
        console.log("Image URL:", data.secure_url); // Log the image URL
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please check your connection.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!firstName || !lastName || !phone || !address.street || !address.country || !role) {
      alert("Please fill out all required fields");
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
      profileImage: imageURL || "https://avatar.iran.liara.run/public/boy", // Use default if no image
      createdAt: new Date(),
    };

    try {
      // Save data to Firebase Firestore
      const userDoc = doc(db, "users", phone); // Use phone as document ID
      await setDoc(userDoc, profileData);

      console.log("Profile data saved to Firestore:", profileData); // Log the profile data

      // Optionally update local user profile
      if (updateProfile) {
        await updateProfile(profileData);
      }

      navigate("/signin"); // Redirect to sign-in page
    } catch (error) {
      console.error("Error saving user data to Firestore:", error);
      alert("Error occurred while creating your account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50">
      <div className="w-full max-w-lg px-6 py-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl"></div>
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
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Customer">Customer</option>
            <option value="Driver">Driver</option>
            <option value="Mover">Mover</option>
          </select>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Preview"
              className="w-24 h-24 mt-4 rounded-full object-cover border-2 border-teal-500"
            />
          )}
          {isImageUploading && <p className="text-sm text-teal-500 mt-2">Uploading image...</p>}
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
