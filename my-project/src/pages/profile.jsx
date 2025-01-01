import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import useUser from "../config/hooks/useUser";
import useAuth from "../config/hooks/useAuth";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import imageprofile from "../assets/Truckitprofile.png";

const ProfileForm = () => {
  const { signout } = useAuth(); // Sign-out function
  const { formData, loading } = useUser(); // Access user data from UserContext
  const [avatar, setAvatar] = useState("https://avatar.iran.liara.run/public/boy" || formData?.avatar); // Set default avatar

  const navigate = useNavigate();


  // Handle avatar image change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Display loading state until data is ready
  if (loading) {
    return <div>Loading...</div>;
  }
console.log ("User data:", formData);
  
  const handleLogout = () => {
      signout();
    console.log("Logout clicked");
    navigate("/customer");
  };

    
    
return (
<div className="bg-white">

        <header>
        <NavBar isLoggedIn={true} avatar={avatar} onLogout={handleLogout} />
        </header>
        
        
        <main className="flex flex-row justify-center items-stretch p-8 bg-white min-h-screen">
                {/* Form and Profile Section */}
                <div className="w-full lg:w-3/4 flex flex-col items-center lg:items-right h-full">
                    <div className="relative mb-6">
                    <img
                        src={avatar}
                        alt="Profile"
                        className="w-36 h-36 rounded-full object-cover shadow-md"
                    />
                    <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-teal-500 text-white text-sm px-3 py-1 rounded-full shadow-lg cursor-pointer"
                    >
                        Edit
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                    </div>

                <form className="w-full max-w-md space-y-4">
                    <p className='text-teal-500 font-bold'>First Name </p>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName || ''}
                        required
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className='text-teal-500 font-bold'>Last Name </p>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName || ''}
                        required
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className='text-teal-500 font-bold'>Email </p>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email || ''}
                        required
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className='text-teal-500 font-bold'>Phone no </p>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phoneNumber || ''}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className='text-teal-500 font-bold'>House/Apartment Number</p>
                    <input
                        type="text"
                        placeholder="Apartment"
                        value={formData.address?.apartment || ''}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className='text-teal-500 font-bold'>Address</p>
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={formData.address?.street || ''}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className='text-teal-500 font-bold'>Province</p>
                    <input
                        type="text"
                        placeholder="Province"
                        value={formData.address?.province || ''}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className='text-teal-500 font-bold'>Country </p>
                    <input
                        type="text"
                        placeholder="Country"
                        value={formData.address?.country || ''}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <Link to="/dashboard"> <button type="submit" className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600" > Back </button> </Link>
                    </form>
                </div>

        
        </main>






        <footer>
        <Footer />
        </footer>
</div>
  );
};

export default ProfileForm;
