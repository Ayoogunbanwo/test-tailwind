import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../config/useUser';
import useAuth from '../config/hooks/useAuth';
import Footer from '../component/footer';
import TopNavBar from '../component/TopNavBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEqual } from 'lodash';
import {
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Globe,
  Building,
  ArrowLeft,
  Edit2,
  Save,
  LogOut,
  Camera,
} from 'lucide-react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ProfileForm = () => {
  const { signout } = useAuth();
  const { updateProfile } = useUser();
  const { profile, loading } = useUser();
  const { user } = useAuth();
  const uid = user?.uid;

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      apartment: '',
      street: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
    },
    profileImage: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) return;

      try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profileData = docSnap.data();
          setFormValues({
            firstName: profileData.firstName || '',
            lastName: profileData.lastName || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            address: {
              apartment: profileData.address?.apartment || '',
              street: profileData.address?.street || '',
              city: profileData.address?.city || '',
              province: profileData.address?.province || '',
              country: profileData.address?.country || '',
              postalCode: profileData.address?.postalCode || '',
            },
            profileImage: profileData.profileImage || '',
          });
        } else {
          toast.error('Profile not found.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to fetch profile. Please try again.');
      }
    };

    fetchProfile();
  }, [uid]);

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

  const handleImageEdit = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB.');
      return;
    }

    setIsImageUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setFormValues((prevValues) => ({
          ...prevValues,
          profileImage: data.secure_url,
        }));
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please check your connection.');
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!formValues.firstName || !formValues.lastName || !formValues.email) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile(formValues);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormValues(profile);
  };

  const handleLogout = () => {
    signout();
    localStorage.removeItem('authToken');
    navigate('/customer');
  };

  const renderInput = (label, name, value, icon, placeholder) => (
    <div className="relative transition-all duration-300 hover:transform hover:scale-[1.01]">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <span className="bg-teal-50 p-2 rounded-lg">{icon}</span>
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition-all duration-300"
        />
      ) : (
        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 border border-gray-100">
          {value || 'Not provided'}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-50">
      <TopNavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-0 px-8">
          <div className="bg-white rounded-t-3xl shadow-lg p-8 relative">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-teal-500 ring-offset-4">
                  <img
                    src={formValues.profileImage || '/api/placeholder/128/128'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full cursor-pointer shadow-lg transition-transform duration-300 hover:scale-110">
                      <Camera size={20} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageEdit}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {isImageUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {formValues.firstName} {formValues.lastName}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} className="text-teal-500" />
                {formValues.email}
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-8 space-x-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
                {renderInput('First Name', 'firstName', formValues.firstName, <User size={16} className="text-teal-500" />, 'First Name')}
                {renderInput('Last Name', 'lastName', formValues.lastName, <User size={16} className="text-teal-500" />, 'Last Name')}
                {renderInput('Email', 'email', formValues.email, <Mail size={16} className="text-teal-500" />, 'Email')}
                {renderInput('Phone', 'phone', formValues.phone, <Phone size={16} className="text-teal-500" />, 'Phone')}
                {renderInput('Apartment', 'address.apartment', formValues.address.apartment, <Building size={16} className="text-teal-500" />, 'Apartment')}
                {renderInput('Street', 'address.street', formValues.address.street, <Home size={16} className="text-teal-500" />, 'Street')}
                {renderInput('City', 'address.city', formValues.address.city, <MapPin size={16} className="text-teal-500" />, 'City')}
                {renderInput('Province', 'address.province', formValues.address.province, <MapPin size={16} className="text-teal-500" />, 'Province')}
                {renderInput('Country', 'address.country', formValues.address.country, <Globe size={16} className="text-teal-500" />, 'Country')}
                {renderInput('Postal Code', 'address.postalCode', formValues.address.postalCode, <MapPin size={16} className="text-teal-500" />, 'Postal Code')}
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-8 border-t border-gray-100">
                <Link to="/CustomerDashboard">
                  <button
                    type="button"
                    className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 shadow-sm hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    Back
                  </button>
                </Link>

                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-6 py-3 bg-gray-500 rounded-xl text-white shadow-sm hover:bg-gray-600 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-teal-500 rounded-xl text-white shadow-sm hover:bg-teal-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={20} />
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="px-6 py-3 bg-teal-500 rounded-xl text-white shadow-sm hover:bg-teal-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <Edit2 size={20} />
                    Edit Profile
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-500 rounded-xl text-white shadow-sm hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(ProfileForm);
