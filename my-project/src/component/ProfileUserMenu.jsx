import React from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import useUser from "../config/hooks/useUser";
import useAuth from "../config/hooks/useAuth";

const UserMenu = () => {
  const { signout } = useAuth(); // Sign-out function
  const { formData, loading } = useUser();

  if (loading) {
    return (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border p-4">
        <p>Error: User data not available</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border">
      {/* User Info Section */}
      <div className="p-4 border-b">
        <p className="font-medium">{formData.firstName}</p>
        <p className="font-medium">{formData.lasttName}</p>
      </div>

      {/* Menu Options */}
      <div className="p-2">
       <a href="/profile" className="w-full">
        <button
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
          aria-label="Profile"
        >
          <User className="h-4 w-4" />
          View Profile
        </button>
        </a>

        <button
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
          View Profile
        </button>
        <button
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2"
          onClick={signout}
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
