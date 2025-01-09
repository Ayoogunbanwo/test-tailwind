// Configuration for error messages
export const SESSION_CONFIG = {
  ERROR_MESSAGES: {
    // Authentication Errors
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': 'No account found with this email. Please register.',
    'auth/invalid-credential': 'Invalid email or password. Please check your credentials and try again.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/email-already-in-use': 'This email address is already registered. Please sign in or reset your password.',
    'auth/weak-password': 'Password is too weak. It should be at least 8 characters long.',
    'auth/operation-not-allowed': 'Email/password sign up is not enabled. Please contact support.',
    'auth/too-many-requests': 'Too many requests. Please try again later.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled. Please try again.',
    'auth/cancelled-popup-request': 'Multiple sign-in requests were cancelled.',
    'auth/popup-blocked': 'Sign-in popup was blocked by your browser. Please allow popups for this site.',
    'auth/timeout': 'The operation has timed out. Please try again.',
    
    // Firestore Errors
    'firestore/invalid-data': 'Invalid user data. Please ensure all required fields are provided.',
    
    // Validation Errors
    'validation/email-invalid': 'Please enter a valid email address.',
    'validation/password-requirements': 'Password must meet all requirements.',
    'validation/terms-not-accepted': 'Please accept the terms and conditions.',
    
    // Session Errors
    'session/expired': 'Your session has expired. Please sign in again.',
    'session/invalid': 'Invalid session. Please sign in again.',
    
    // Default error
    default: 'An unexpected error occurred. Please try again later.'
  }
};

/**
 * Get a user-friendly error message based on the error code or message.
 * @param {Error} error - The error object from Firebase or other sources.
 * @returns {string} - A user-friendly error message.
 */
export const getErrorMessage = (error) => {
  if (!error) return SESSION_CONFIG.ERROR_MESSAGES.default;
  
  let finalErrorCode = error.code;
  
  // If no error code but has message, try to extract code from message
  if (!finalErrorCode && error.message) {
    const match = error.message.match(/\(([^)]+)\)/);
    finalErrorCode = match?.[1];
  }
  
  return SESSION_CONFIG.ERROR_MESSAGES[finalErrorCode] || SESSION_CONFIG.ERROR_MESSAGES.default;
};

/**
 * Validate an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate a password.
 * @param {string} password - The password to validate.
 * @returns {true|string[]} - Returns `true` if the password is valid, or an array of error messages if invalid.
 */
export const validatePassword = (password) => {
  if (!password) return ['Password is required.'];
  
  const errors = [];
  const requirements = {
    length: { test: p => p.length >= 8, message: 'Password must be at least 8 characters long.' },
    letter: { test: p => /[A-Za-z]/.test(p), message: 'Password must contain at least one letter.' },
    number: { test: p => /\d/.test(p), message: 'Password must contain at least one number.' },
    special: { 
      test: p => /[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]/.test(p), 
      message: 'Password must contain at least one special character.'
    }
  };

  Object.values(requirements).forEach(({ test, message }) => {
    if (!test(password)) errors.push(message);
  });

  return errors.length === 0 ? true : errors;
};