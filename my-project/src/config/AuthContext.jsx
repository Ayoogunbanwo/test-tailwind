import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { collection, getDocs, query, where, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
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

// Constants
const ROUTES = {
    EMAIL_VERIFICATION: '/emailverification',
    DASHBOARD: '/CustomerDashboard',
    SIGN_OUT: '/customer',
    CREATE_ACCOUNT: '/createaccount'
};

// Custom error class
class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'AuthError';
        this.code = code;
    }
}

const provider = new GoogleAuthProvider();

// Initial context state
const initialAuthState = {
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
    isOperationInProgress: false,
};

export const AuthContext = createContext(initialAuthState);

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

// Normalize user data
const normalizeUserData = (user, provider = 'email') => ({
    email: user.email,
    uid: user.uid,
    createdAt: Timestamp.now(),
    provider,
    lastLogin: Timestamp.now(),
    deviceType: getDeviceType(),
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    emailVerified: user.emailVerified || false
});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [operationInProgress, setOperationInProgress] = useState(false);

    // Derived state
    const isAuthenticated = !!user;

    // Save user data to Firestore
    const saveUserToFirestore = useCallback(async (userData) => {
        if (!userData?.uid) {
            throw new AuthError('Invalid user data', 'invalid_user');
        }

        const userRef = doc(db, 'users', userData.uid);
        try {
            await setDoc(userRef, userData, { merge: true });
            return userData;
        } catch (error) {
            throw new AuthError('Failed to save user data', 'firestore_error');
        }
    }, []);

    // Sign up with email and password
    const signupWithEmail = useCallback(async (email, password) => {
        setOperationInProgress(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const userData = normalizeUserData(result.user);
            await saveUserToFirestore(userData);
            await sendEmailVerification(auth.currentUser);
            navigate(ROUTES.EMAIL_VERIFICATION);

            return {
                uid: result.user.uid,
                email: result.user.email
            };
        } catch (error) {
            throw new AuthError(error.message, error.code);
        } finally {
            setOperationInProgress(false);
        }
    }, [saveUserToFirestore, navigate]);

    // Sign in with email and password
    const signinWithEmail = useCallback(async (email, password) => {
        setOperationInProgress(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const userData = normalizeUserData(result.user);
            await saveUserToFirestore({ ...userData, lastLogin: Timestamp.now() });
            navigate(ROUTES.DASHBOARD);
            return result.user;
        } catch (error) {
            throw new AuthError(error.message, error.code);
        } finally {
            setOperationInProgress(false);
        }
    }, [navigate, saveUserToFirestore]);

    // Google sign-in handler
    const handleGoogleSignin = useCallback(async () => {
        setOperationInProgress(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const userData = normalizeUserData(result.user, 'google');

            const userQuery = query(
                collection(db, 'users'), 
                where('email', '==', userData.email)
            );
            const querySnapshot = await getDocs(userQuery);

            if (querySnapshot.empty) {
                await saveUserToFirestore(userData);
                navigate(ROUTES.CREATE_ACCOUNT);
                return { result, isNewUser: true };
            }

            await saveUserToFirestore({ ...userData, lastLogin: Timestamp.now() });
            navigate(ROUTES.DASHBOARD);
            return { result, isNewUser: false };
        } catch (error) {
            throw new AuthError(error.message, error.code);
        } finally {
            setOperationInProgress(false);
        }
    }, [saveUserToFirestore, navigate]);

    // Sign out function
    const signout = useCallback(async () => {
        setOperationInProgress(true);
        try {
            await signOut(auth);
            setUser(null);
            navigate(ROUTES.SIGN_OUT);
        } catch (error) {
            throw new AuthError('Failed to sign out', 'signout_error');
        } finally {
            setOperationInProgress(false);
        }
    }, [navigate]);

    // Additional user methods with operation progress tracking
    const verifyEmail = useCallback(async () => {
        setOperationInProgress(true);
        try {
            await sendEmailVerification(auth.currentUser);
        } catch (error) {
            throw new AuthError('Failed to send verification email', 'verification_error');
        } finally {
            setOperationInProgress(false);
        }
    }, []);

    const resetPassword = useCallback(async (email) => {
        setOperationInProgress(true);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw new AuthError('Failed to send password reset email', 'reset_error');
        } finally {
            setOperationInProgress(false);
        }
    }, []);

    const updateUserPassword = useCallback(async (newPassword) => {
        setOperationInProgress(true);
        try {
            await updatePassword(auth.currentUser, newPassword);
        } catch (error) {
            throw new AuthError('Failed to update password', 'password_update_error');
        } finally {
            setOperationInProgress(false);
        }
    }, []);

    const checkEmailProviders = useCallback(async (email) => {
        try {
            return await fetchSignInMethodsForEmail(auth, email);
        } catch (error) {
            throw new AuthError('Failed to check email providers', 'provider_check_error');
        }
    }, []);

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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
        operationInProgress,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;