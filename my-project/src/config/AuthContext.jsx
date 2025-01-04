import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider } from 'firebase/auth'
import { collection, getDocs, query, where, doc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase"; 
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updatePassword,
    signOut,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    onAuthStateChanged,
} from 'firebase/auth';
import {auth} from './firebase';
import { Move } from 'lucide-react';

// Create context
export const AuthContext = createContext({
    user: null,
    signupWithEmail: () => {},
    signinWithEmail: () => {},
    verifyEmail: () => {},
    resetPassword: () => {},
    updateUserPassword: () => {},
    handleGoogleAuth: () => {},
    signout: () => {},
    checkEmailProviders: () => {},
    loading: true,
});



const provider = new GoogleAuthProvider();

// AuthProvider component
export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setAuthenticated] = useState(false);
  
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  // Signup with email and password
  
const signupWithEmail = async (email, password, navigate) => {
  const ERROR_MESSAGES = {
    'auth/email-already-in-use': 'This email address is already in use. Please try logging in.',
    'auth/weak-password': 'The password is too weak. It should be at least 6 characters long.',
    'auth/invalid-email': 'The email address is invalid. Please provide a valid email.',
    'auth/user-not-found': 'No user found with this email address.',
    'auth/wrong-password': 'The password you entered is incorrect.',
    'auth/operation-not-allowed': 'This sign-up method is not enabled. Please try another method.',
    'auth/too-many-requests': 'Too many requests. Please try again later.',
    'auth/expired-action-code': 'The action code has expired. Please try again.',
    'auth/invalid-action-code': 'The action code is invalid. Please check the link or try again.',
    'auth/invalid-credential': 'The provided credential is invalid.',
    'auth/account-exists-with-different-credential': 'An account already exists with the same email address, but it was registered using a different login method.',
    'auth/invalid-api-key': 'API key is invalid. Please check your configuration.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'firestore/invalid-data': 'Invalid user data. Please ensure all required fields are provided.',
    default: 'An unexpected error occurred. Please try again later.'
  };

  try {
    // Validate input parameters
    if (!email || typeof email !== 'string' || !email.trim()) {
      throw new Error('A valid email is required');
    }
    if (!password || typeof password !== 'string' || !password.trim() || password.length < 6) {
      throw new Error('A valid password is required (at least 6 characters)');
    }

    // Create user account
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = result;

    // Validate user object
    if (!user || !user.uid) {
      throw new Error('Failed to create user account');
    }

    // Prepare user data
    const newUser = {
      email: user.email || email,
      uid: user.uid,
      createdAt: Timestamp.now(),
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      emailVerified: user.emailVerified || false,
      lastLoginAt: Timestamp.now()
    };

    // Validate newUser object before saving
    const requiredFields = ['email', 'uid', 'createdAt'];
    for (const field of requiredFields) {
      if (newUser[field] === undefined) {
        console.error(`Missing required field: ${field}`);
        throw new Error(ERROR_MESSAGES['firestore/invalid-data']);
      }
    }

    // Save user to Firestore and send email verification
    await saveUserToFirestore(newUser);
    await sendEmailVerification(auth.currentUser);

    // Navigate to email verification page
    navigate('/emailverification');

    return {
      uid: user.uid,
      accessToken: result.credential?.accessToken || null,
      userEmail: user.email || email,
    };
  } catch (error) {
    console.error("Error during signup:", error);

    // Map Firebase error to a user-friendly message
    const errorMessage = ERROR_MESSAGES[error.code] || error.message || ERROR_MESSAGES.default;

    // If there's an auth user created before error, delete the user
    if (error.code !== 'firestore/invalid-data' && error.code !== 'auth/email-already-in-use') {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.delete();
      }
    }

    throw new Error(errorMessage);
  }
};


// Signin with email and password
    const signinWithEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            console.error("Error during sign-in:", error);
            throw error;
        }
    };



// Handle Google Authentication
    const handleGoogleAuth = async () => {
        
        try {
            const result = await signInWithPopup(auth, provider); // Using the correct provider
            const user = result.user;
            
            console.log("Google login successful:", user);

            // Redirect to "/createaccount" after successful login
            navigate("/emailverification");

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            throw error;
        }
    };




// Handle Google Authentication

const handleGoogleSignin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Google login successful:", user);

    if (!user.email) {
      throw new Error("User email not found");
    }

    // Check if the email exists in the Firestore database
    const userQuery = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.log("Email not found in database");
      
      // Create new user object
      const newUser = {
        email: user.email,
        uid: user.uid,
        createdAt: Timestamp.now(),
      };

      // Save new user to Firestore
      await saveUserToFirestore(newUser);
      
      // Set timeout for navigation
      setTimeout(() => navigate("/createaccount"), 3000);
      
      // Return result but with custom error for UI
      return {
        result,
        error: "Email not registered. Please proceed to register your Account"
      };
    }

    // If email exists, redirect to dashboard
    console.log("Email found, redirecting to dashboard...");
    navigate("/CustomerDashboard");
    return { result, error: null };
    
  } catch (error) {
    console.error("Error during Google sign-in:", error.message);
    throw error;
  }
};



const saveUserToFirestore = async (user) => {
  if (!user || !user.uid) throw new Error("Invalid user data");

  const userRef = doc(db, "users", user.uid); // Use UID as the document ID
  const userData = {
    email: user.email,
    uid: user.uid,
    createdAt: new Date().toISOString(),
  };

  try {
    // Use merge: true to avoid overwriting existing fields
    await setDoc(userRef, userData, { merge: true });
    console.log("User data saved to Firestore:", userData);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
    throw new Error("Failed to save user data to Firestore");
  }
};


  
  

  
const updateUserInFirestore = async (user, formData) => {
  const userRef = doc(db, "users", user.uid); // Reference to the user's document

  try {
    await updateDoc(userRef, formData); // Update the user's data with the new fields
    console.log("User data updated successfully:", formData);
  } catch (error) {
    console.error("Error updating user data in Firestore:", error);
    throw new Error("Failed to update user data in Firestore");
  }
};



    // Other authentication utilities
    const verifyEmail = () => sendEmailVerification(auth.currentUser);
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);
    const updateUserPassword = (newPassword) => updatePassword(auth.currentUser, newPassword);
    
    const signout = async () => {
        try {
          localStorage.removeItem('authToken');
          await signOut(auth);
          setUser(null);

          window.location.href = '/signin';
        } catch (error) {
          console.error('Error during sign-out:', error);
          alert('Failed to sign out. Please try again.');
        }
  };
  
  
    const checkEmailProviders = (email) => fetchSignInMethodsForEmail(auth, email);

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe; // Cleanup on unmount
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                saveUserToFirestore,
                updateUserInFirestore,
                signupWithEmail,
                handleGoogleSignin,
                signinWithEmail,
                verifyEmail,
                resetPassword,
                updateUserPassword,
                handleGoogleAuth,
                signout,
                checkEmailProviders,
                loading,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
