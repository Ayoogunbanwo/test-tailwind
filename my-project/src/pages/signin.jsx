import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TruckIcon } from 'lucide-react';
import googlelogo from '../assets/icons8-google-50.png';
import useAuth from "../config/hooks/useAuth";
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { useSessionTimeout } from '../config/useSessionTimeout';
import { validateEmail, validatePassword, getErrorMessage } from '../authutils/utils';
import { auth } from '../config/firebase';

const SignIn = () => {
  const { signinWithEmail, handleGoogleSignin } = useAuth();
  const navigate = useNavigate();
  const { resetTimeout } = useSessionTimeout(30);

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Handle email/password sign-in
  const handleSignin = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    // Validate password
    const passwordErrors = validatePassword(password);
    if (Array.isArray(passwordErrors)) {
      setError(passwordErrors.join(' '));
      return;
    }

    setError("");
    setEmailLoading(true);

    try {
      // Sign in with email and password
      await signinWithEmail(email, password);
      resetTimeout();
      navigate("/CustomerDashboard");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await handleGoogleSignin();
      resetTimeout();
      navigate("/CustomerDashboard");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  // Set session persistence based on "Remember Me"
  useEffect(() => {
    const setAuthPersistence = async () => {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
    };
    setAuthPersistence();
  }, [rememberMe]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 p-8">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <Link to="#" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl transform transition-transform group-hover:rotate-12">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent text-xl">
              Truckit
            </span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                email && !validateEmail(email) ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
              }`}
              aria-describedby="email-error"
            />
            {email && !validateEmail(email) && (
              <p id="email-error" className="text-red-500 text-sm mt-1">Invalid email format.</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  password && !validatePassword(password) ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                }`}
                aria-describedby="password-errors"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-3 right-3 text-sm text-teal-600 hover:text-teal-700"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            {password && (
              <div id="password-errors" className="text-sm text-gray-600 mt-1">
                <p className={password.length >= 8 ? 'text-green-500' : 'text-red-500'}>
                  {password.length >= 8 ? '✓' : '✗'} At least 8 characters
                </p>
                <p className={/[A-Za-z]/.test(password) ? 'text-green-500' : 'text-red-500'}>
                  {/[A-Za-z]/.test(password) ? '✓' : '✗'} Contains a letter
                </p>
                <p className={/\d/.test(password) ? 'text-green-500' : 'text-red-500'}>
                  {/\d/.test(password) ? '✓' : '✗'} Contains a number
                </p>
                <p className={/[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]/.test(password) ? 'text-green-500' : 'text-red-500'}>
                  {/[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]/.test(password) ? '✓' : '✗'} Contains a special character
                </p>
              </div>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox h-4 w-4 text-teal-600 rounded focus:ring-teal-500"
                aria-label="Remember Me"
              />
              <span className="text-sm text-gray-700">Remember Me</span>
            </label>
            <Link to="/verifyemail" className="text-sm text-amber-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={emailLoading}
            aria-label={emailLoading ? "Signing in..." : "Sign in"}
            className={`${
              emailLoading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            } text-white font-bold py-3 rounded-lg w-full transition duration-300`}
          >
            {emailLoading ? "Signing in..." : "Sign in"}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            disabled={googleLoading}
            onClick={handleGoogleLogin}
            className={`${
              googleLoading ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-50"
            } flex items-center justify-center text-gray-700 font-medium py-3 rounded-lg text-base border border-gray-300 shadow-sm gap-2 w-full transition duration-300`}
            aria-label={googleLoading ? "Signing in with Google..." : "Sign in with Google"}
          >
            <img src={googlelogo} alt="Google Logo" className="w-6 h-6" />
            <span>{googleLoading ? "Signing in..." : "Sign in with Google"}</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-600 font-medium hover:text-teal-700">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;