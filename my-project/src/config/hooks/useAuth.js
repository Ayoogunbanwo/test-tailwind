import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // import the context

const useAuth = () => {
  const context = useContext(AuthContext); // Access the context using useContext

  // You can return the context data from this custom hook
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context; // Return the data (user, accessToken, formData, etc.)
};

export default useAuth;