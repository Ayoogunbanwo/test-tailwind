import React, { createContext, useState, useCallback, useEffect } from 'react';

// Session configuration
const SESSION_CONFIG = {
    TIMEOUT_MINUTES: 30,
    WARNING_BEFORE_TIMEOUT_MS: 5 * 60 * 1000, // 5 minutes warning
    ERROR_MESSAGES: {
        'auth/invalid-email': 'The email address is not valid.',
        'auth/user-disabled': 'Your account has been disabled.',
        'auth/user-not-found': 'No user found with this email address.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/network-request-failed': 'Network error. Please try again later.',
        'auth/email-already-in-use': 'This email address is already in use. Please try logging in.',
        'auth/weak-password': 'The password is too weak. It should be at least 6 characters long.',
        'auth/operation-not-allowed': 'This sign-up method is not enabled. Please try another method.',
        'auth/too-many-requests': 'Too many requests. Please try again later.',
        'firestore/invalid-data': 'Invalid user data. Please ensure all required fields are provided.',
        default: 'An unexpected error occurred. Please try again later.'
    }
};


// Create Session Context
export const SessionContext = createContext({
    error: null,
    setError: () => {},
    sessionMetadata: null,
    startSession: () => {},
    endSession: () => {},
    SESSION_CONFIG,
});



// Session Provider component
export const SessionProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [sessionMetadata, setSessionMetadata] = useState(null);

    // Start a new session
    const startSession = useCallback((userData) => {
        const sessionData = {
            lastActivity: Date.now(),
            user: userData,
            role: userData.role || 'user', // Example: Add user role
            preferences: userData.preferences || {} // Example: Add user preferences
        };
        localStorage.setItem('session', JSON.stringify(sessionData));
        setSessionMetadata(sessionData);
    }, []);

    
    
    // End session
    const endSession = useCallback(() => {
        localStorage.removeItem('session');
        setSessionMetadata(null);
    }, []);

    
    
    // Restore session on page reload
    useEffect(() => {
        const savedSession = localStorage.getItem('session');
        if (savedSession) {
            const sessionData = JSON.parse(savedSession);
            setSessionMetadata(sessionData);
        }
    }, []);

    
    
    // Handle session timeout and warning
    useEffect(() => {
        let timeoutId;
        let warningTimeoutId;

        if (sessionMetadata) {
            warningTimeoutId = setTimeout(() => {
                alert("Your session will expire in 5 minutes. Please save your work.");
            }, SESSION_CONFIG.WARNING_BEFORE_TIMEOUT_MS);

            timeoutId = setTimeout(() => {
                alert("Your session has expired. Please log in again.");
                endSession();
            }, SESSION_CONFIG.TIMEOUT_MINUTES * 60 * 1000);
        }

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(warningTimeoutId);
        };
    }, [sessionMetadata, endSession]);

    
    
    // Track user activity to reset session timeout
    useEffect(() => {
        const handleUserActivity = () => {
            if (sessionMetadata) {
                setSessionMetadata((prev) => ({ ...prev, lastActivity: Date.now() }));
            }
        };

        window.addEventListener('click', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            window.removeEventListener('click', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, [sessionMetadata]);

    
    
    // Logout on window close
    useEffect(() => {
        const handleBeforeUnload = () => {
            endSession();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [endSession]);

    const contextValue = {
        error,
        setError,
        sessionMetadata,
        startSession,
        endSession,
        SESSION_CONFIG,
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};