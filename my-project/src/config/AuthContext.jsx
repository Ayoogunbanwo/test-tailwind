import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
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
import { auth } from './firebase';

// Session configuration
const SESSION_CONFIG = {
    TIMEOUT_MINUTES: 30,
    WARNING_BEFORE_TIMEOUT_MS: 5 * 60 * 1000, // 5 minutes warning
    ERROR_MESSAGES: {
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
        'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in method.',
        'auth/invalid-api-key': 'API key is invalid. Please check your configuration.',
        'auth/user-disabled': 'This account has been disabled. Please contact support.',
        'firestore/invalid-data': 'Invalid user data. Please ensure all required fields are provided.',
        default: 'An unexpected error occurred. Please try again later.'
    }
};

// Create enhanced context
export const AuthContext = createContext({
    user: null,
    signupWithEmail: () => {},
    signinWithEmail: () => {},
    verifyEmail: () => {},
    resetPassword: () => {},
    updateUserPassword: () => {},
    handleGoogleSignin: () => {},
    signout: () => {},
    checkEmailProviders: () => {},
    loading: true,
    isAuthenticated: false,
    sessionTimeRemaining: null,
    extendSession: () => {},
    sessionMetadata: null,
});

const provider = new GoogleAuthProvider();

// Device detection utility
const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    // Start a new session
    const startSession = useCallback((userData) => {
        setAuthenticated(true);
        setUser(userData);
    }, []);

    // Sign out
    const signout = useCallback(async () => {
        try {
            await signOut(auth);
            setAuthenticated(false);
            setUser(null);
            window.location.href = '/customer';
        } catch (error) {
            console.error('Error during sign-out:', error);
            throw new Error(SESSION_CONFIG.ERROR_MESSAGES[error.code] || error.message);
        }
    }, []);

    // Save user data to Firestore
    const saveUserToFirestore = useCallback(async (user) => {
        if (!user || !user.uid) throw new Error("Invalid user data");

        const userRef = doc(db, "users", user.uid);
        const userData = {
            email: user.email,
            uid: user.uid,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            deviceType: getDeviceType()
        };

        try {
            await setDoc(userRef, userData, { merge: true });
            return userData;
        } catch (error) {
            console.error("Error saving user data to Firestore:", error);
            throw new Error(SESSION_CONFIG.ERROR_MESSAGES['firestore/invalid-data']);
        }
    }, []);

    // Sign up with email and password
    const signupWithEmail = useCallback(async (email, password, navigate) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = result;

            const userData = {
                email: user.email || email,
                uid: user.uid,
                createdAt: Timestamp.now(),
                displayName: user.displayName || null,
                photoURL: user.photoURL || null,
                emailVerified: user.emailVerified || false,
                lastLoginAt: Timestamp.now()
            };

            await saveUserToFirestore(userData);
            await sendEmailVerification(auth.currentUser);
            startSession(userData);
            navigate('/emailverification');

            return {
                uid: user.uid,
                accessToken: result.credential?.accessToken || null,
                userEmail: user.email || email,
            };
        } catch (error) {
            console.error("Error during signup:", error);
            throw new Error(SESSION_CONFIG.ERROR_MESSAGES[error.code] || error.message);
        }
    }, [saveUserToFirestore, startSession]);

    // Sign in with email and password
    const signinWithEmail = useCallback(async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            startSession(result.user);
            return result.user;
        } catch (error) {
            console.error("Error during sign-in:", error);
            throw new Error(SESSION_CONFIG.ERROR_MESSAGES[error.code] || error.message);
        }
    }, [startSession]);

    // Handle Google sign-in
    const handleGoogleSignin = useCallback(async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!user.email) {
                throw new Error("User email not found");
            }

            const userQuery = query(collection(db, "users"), where("email", "==", user.email));
            const querySnapshot = await getDocs(userQuery);

            if (querySnapshot.empty) {
                const userData = {
                    email: user.email,
                    uid: user.uid,
                    createdAt: Timestamp.now(),
                    provider: 'google'
                };
                await saveUserToFirestore(userData);
                startSession(userData);
                setTimeout(() => navigate("/createaccount"), 3000);
                return {
                    result,
                    error: "Email not registered. Please proceed to register your Account"
                };
            }

            startSession(user);
            navigate("/CustomerDashboard");
            return { result, error: null };
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            throw new Error(SESSION_CONFIG.ERROR_MESSAGES[error.code] || error.message);
        }
    }, [saveUserToFirestore, startSession, navigate]);

    // Verify email
    const verifyEmail = useCallback(() => sendEmailVerification(auth.currentUser), []);

    // Reset password
    const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email), []);

    // Update user password
    const updateUserPassword = useCallback((newPassword) => updatePassword(auth.currentUser, newPassword), []);

    // Check email providers
    const checkEmailProviders = useCallback((email) => fetchSignInMethodsForEmail(auth, email), []);

    // Authentication state monitoring
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                startSession(currentUser);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [startSession]);

    // Provide the context values to the children
    const contextValue = {
        user,
        signupWithEmail,
        signinWithEmail,
        verifyEmail,
        resetPassword,
        updateUserPassword,
        handleGoogleSignin,
        signout,
        checkEmailProviders,
        loading,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
