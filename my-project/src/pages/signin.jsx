import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TruckIcon } from 'lucide-react';
import googlelogo from '../assets/icons8-google-50.png';
import useAuth from "../config/hooks/useAuth";
import { useUser  } from '@/config/hooks/useUser';
import { auth } from '../config/firebase';
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";

// Validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,}$/.test(password);

const SignIn = () => {
  const { signinWithEmail, handleGoogleSignin } = useAuth();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain at least one number and one special character.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Set persistence before signing in
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);

      // Sign in user
      const currentUser = await signinWithEmail(email, password);
      console.log("User signed in", currentUser);
      
      // Update user context if needed
      setUser(currentUser);

      // Clear form
      setEmail("");
      setPassword("");
      
      // Navigate to dashboard
      navigate("/CustomerDashboard");
    } catch (error) {
      console.error("Signin failed:", error);
      setError(error.message || "Signin failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await handleGoogleSignin();
      
      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.user) {
        console.log("Google login successful:", result.user);
        setUser(result.user);
        navigate("/CustomerDashboard");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("An error occurred during Google sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 p-8">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg">
        {/* Updated Logo Section */}
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
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                email && !validateEmail(email) ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
              }`}
            />
          </div>

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
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  password && !validatePassword(password) ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
                }`}
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
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox h-4 w-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">Remember Me</span>
            </label>
            <Link to="/verifyemail" className="text-sm text-amber-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            } text-white font-bold py-3 rounded-lg w-full transition duration-300`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex items-center justify-center my-6">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className={`${
              loading ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-50"
            } flex items-center justify-center text-gray-700 font-medium py-3 rounded-lg text-base border border-gray-300 shadow-sm gap-2 w-full transition duration-300`}
          >
            <img src={googlelogo} alt="Google Logo" className="w-6 h-6" />
            <span>Sign in with Google</span>
          </button>

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