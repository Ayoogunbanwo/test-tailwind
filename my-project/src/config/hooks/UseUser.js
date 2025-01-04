import { useContext } from "react";
import { UserContext } from './UserContext.jsx';

/**
 * A custom hook to access the user context.
 * 
 * @returns {Object} The user context, containing:
 * - user: The authenticated user object (or null if not logged in).
 * - accessToken: The Firebase access token (or null if not logged in).
 * - formData: The user's profile data.
 * - loading: A boolean indicating if the context is still loading.
 * - updateFormData: A function to update the user's profile data.
 * - fetchUserData: A function to fetch user data from Firestore.
 * - saveMoveDataToFirestore: A function to save move data to Firestore.
 * - deleteMoveDataFromFirestore: A function to delete move data from Firestore.
 * 
 * @throws {Error} If the hook is used outside of a UserProvider.
 */
const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default useUser;