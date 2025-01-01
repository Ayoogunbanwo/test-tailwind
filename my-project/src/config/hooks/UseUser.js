import { useContext } from "react";
import { UserContext } from '.././UserContext';

const useUser = () => {
  const context = useContext(UserContext); // Access the context using useContext

  // You can return the context data from this custom hook
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context; // Return the data (user, accessToken, formData, etc.)
};

export default useUser;