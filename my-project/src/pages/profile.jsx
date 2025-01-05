import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../config/useUser';
import useAuth from '../config/hooks/useAuth';
import Footer from '../component/footer';
import TopNavBar from '../component/TopNavBar';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Globe,
  Building,
  Camera,
  ArrowLeft,
  LogOut,
  Edit2,
  Save
} from 'lucide-react';

const ProfileForm = () => {
  const { signout, updateUserInFirestore } = useAuth();
  const { profile, loading } = useUser();
  const [avatar, setAvatar] = useState('https://avatar.iran.liara.run/public/boy');
  const [avatarFile, setAvatarFile] = useState(null);
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
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    if (profile) {
      setFormValues({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: {
          apartment: profile.address?.apartment || '',
          street: profile.address?.street || '',
          province: profile.address?.province || '',
          country: profile.address?.country || '',
        },
      });
      setAvatar(profile.avatar || 'https://avatar.iran.liara.run/public/boy');
    }
  }, [profile]);

  const handleAvatarChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
      setAvatarFile(file);
    } else {
      alert('Please upload a valid image file (max 5MB).');
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      if (name.includes('address.')) {
        const addressField = name.split('.')[1];
        return {
          ...prevValues,
          address: {
            ...prevValues.address,
            [addressField]: value,
          },
        };
      }
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }, []);

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let avatarUrl = avatar;
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${avatarFile.name}`);
        await uploadBytes(storageRef, avatarFile);
        avatarUrl = await getDownloadURL(storageRef);
      }
      const updatedUserData = { ...formValues, avatar: avatarUrl };
      await updateUserInFirestore(updatedUserData);
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    signout();
    localStorage.removeItem('authToken');
    navigate('/customer');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const renderInput = (label, name, value, icon, placeholder) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
        />
      ) : (
        <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{value}</p>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-teal-200 to-gray-100 min-h-screen flex flex-col">
      <header>
      <TopNavBar />
      </header>
      <main className="flex-grow flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6 group">
              <img
                src={avatar}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover shadow-md border-4 border-white group-hover:border-teal-200 transition duration-300"
              />
              {isEditing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-2 right-2 bg-teal-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-teal-600 transition duration-300"
                >
                  <Camera size={20} />
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
            <h1 className="text-3xl font-bold text-gray-800">{formValues.firstName} {formValues.lastName}</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Mail size={16} className="text-teal-500" />
              {formValues.email}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSaveEdit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('First Name', 'firstName', formValues.firstName, <User size={16} className="text-teal-500" />, 'First Name')}
              {renderInput('Last Name', 'lastName', formValues.lastName, <User size={16} className="text-teal-500" />, 'Last Name')}
              {renderInput('Email', 'email', formValues.email, <Mail size={16} className="text-teal-500" />, 'Email')}
              {renderInput('Phone', 'phone', formValues.phone, <Phone size={16} className="text-teal-500" />, 'Phone')}
              {renderInput('Apartment', 'address.apartment', formValues.address.apartment, <Building size={16} className="text-teal-500" />, 'Apartment')}
              {renderInput('Street', 'address.street', formValues.address.street, <Home size={16} className="text-teal-500" />, 'Street')}
              {renderInput('Province', 'address.province', formValues.address.province, <MapPin size={16} className="text-teal-500" />, 'Province')}
              {renderInput('Country', 'address.country', formValues.address.country, <Globe size={16} className="text-teal-500" />, 'Country')}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link to="/CustomerDashboard">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              </Link>
              {isEditing ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 flex items-center gap-2"
                >
                  <Save size={20} />
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 flex items-center gap-2"
                >
                  <Edit2 size={20} />
                  Edit
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 flex items-center gap-2"
              >
                <LogOut size={20} />
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
