// src/contexts/UserContext.js
import React, { 
  createContext, 
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from 'react';
import { 
  getAuth, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  updateDoc
} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

import { db } from "../config/firebase"; 

// Initial User State Structure
const INITIAL_USER_STATE = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null
};

const INITIAL_PROFILE_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    apartment: "",
    country: "",
    province: "",
    street: "",
  },
  role: 'Customer',
  createdAt: null,
  uid: '',
};

// Create Context
export const UserContext = createContext({
  currentUser: INITIAL_USER_STATE,
  profile: INITIAL_PROFILE_DATA,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

// User Provider Component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(INITIAL_USER_STATE);
  const [profile, setProfile] = useState(INITIAL_PROFILE_DATA);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  // Fetch User Profile
  const fetchUserProfile = useCallback(async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfile({
          ...INITIAL_PROFILE_DATA,
          ...userData,
          createdAt: userData.createdAt || new Date()
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  // Update User Profile
  const updateProfile = useCallback(async (updatedData) => {
  if (!currentUser?.uid) {
    throw new Error('No authenticated user');
  }

  try {
    // Update Firestore
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });

    // Update local state
    setProfile(prev => ({
      ...prev,
      ...updatedData,
      updatedAt: new Date()
    }));

    return true;
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
}, [currentUser]);

  // Logout Method
  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      setCurrentUser(INITIAL_USER_STATE);
      setProfile(INITIAL_PROFILE_DATA);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [auth]);

 
  // Authentication Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const sanitizedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };

        setCurrentUser(sanitizedUser);
        setIsAuthenticated(true);
        await fetchUserProfile(user.uid);
      } else {
        setCurrentUser(INITIAL_USER_STATE);
        setProfile(INITIAL_PROFILE_DATA);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, fetchUserProfile]);

  // Memoized Context Value
  const contextValue = useMemo(() => ({
    currentUser,
    profile,
    isAuthenticated,
    isLoading,
    updateProfile,
    logout
  }), [
    currentUser, 
    profile, 
    isAuthenticated, 
    isLoading, 
    updateProfile, 
    logout
  ]);

  return (
    <UserContext.Provider value={contextValue}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};
















