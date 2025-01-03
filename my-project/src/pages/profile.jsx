import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../config/hooks/useUser';
import useAuth from '../config/hooks/useAuth';
import NavBar from '../component/navbar';
import Footer from '../component/footer';
import imageprofile from '../assets/Truckitprofile.png';
import TopNavBar from '../component/TopNavBar';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage

const ProfileForm = () => {
  const { signout, updateUserInFirestore } = useAuth(); // Sign-out and update functions
  const { formData, loading } = useUser(); // Access user data from UserContext
  const [avatar, setAvatar] = useState('https://avatar.iran.liara.run/public/boy'); // Default avatar
  const [avatarFile, setAvatarFile] = useState(null); // Store the selected avatar file
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      apartment: '',
      street: '',
      province: '',
      country: '',
    },
  });
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  const navigate = useNavigate();
  const storage = getStorage(); // Initialize Firebase Storage

  // Update formValues when formData is available
  useEffect(() => {
    if (formData) {
      setFormValues({
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        address: {
          apartment: formData.address?.apartment || '',
          street: formData.address?.street || '',
          province: formData.address?.province || '',
          country: formData.address?.country || '',
        },
      });
      setAvatar(formData.avatar || 'https://avatar.iran.liara.run/public/boy');
    }
  }, [formData]);

  // Handle avatar image change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file); // Store the file for later upload
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormValues({
        ...formValues,
        address: {
          ...formValues.address,
          [addressField]: value,
        },
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      let avatarUrl = avatar; // Default to the current avatar URL

      // Upload new avatar if a file is selected
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${avatarFile.name}`);
        await uploadBytes(storageRef, avatarFile);
        avatarUrl = await getDownloadURL(storageRef); // Get the download URL
      }

      // Prepare updated user data
      const updatedUserData = {
        ...formValues,
        avatar: avatarUrl, // Include the new avatar URL
      };

      // Update user data in Firestore
      await updateUserInFirestore(updatedUserData);

      console.log('Profile updated successfully!');
      alert('Profile updated successfully!');
      setIsEditing(false); // Switch back to read-only mode
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    signout();
    navigate('/customer');
  };

  // Display loading state until data is ready
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header>
        <TopNavBar />
      </header>

      <main className="flex-grow flex flex-col items-center p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <img
                src={avatar}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover shadow-md border-4 border-white"
              />
              {isEditing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-teal-500 text-white text-sm px-3 py-1 rounded-full shadow-lg cursor-pointer hover:bg-teal-600 transition duration-300"
                >
                  Edit
                </label>
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{formValues.firstName} {formValues.lastName}</h1>
            <p className="text-gray-600">{formValues.email}</p>
          </div>

          <form className="space-y-6" onSubmit={handleSaveEdit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.phone}</p>
                )}
              </div>

              {/* House/Apartment Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">House/Apartment Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.apartment"
                    placeholder="Apartment"
                    value={formValues.address.apartment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.address.apartment}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.street"
                    placeholder="Street Address"
                    value={formValues.address.street}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.address.street}</p>
                )}
              </div>

              {/* Province */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Province</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.province"
                    placeholder="Province"
                    value={formValues.address.province}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.address.province}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.country"
                    placeholder="Country"
                    value={formValues.address.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <p className="mt-1 px-4 py-2 text-gray-900">{formValues.address.country}</p>
                )}
              </div>
            </div>

            {/* Responsive Button Group */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-between">
              <Link to="/CustomerDashboard" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                >
                  Back
                </button>
              </Link>
              {isEditing ? (
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
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