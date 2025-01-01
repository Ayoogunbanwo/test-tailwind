import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signinlogo from '../assets/vector.png';
import googlelogo from '../assets/icons8-google-50.png';
import useAuth from "../config/hooks/useAuth";
import useUser from "../config/hooks/useUser";
import { auth } from '../config/firebase'; // Import auth instance directly
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
      //setUser(currentUser);

      // Clear form
      setEmail("");
      setPassword("");
      
      // Navigate to dashboard
      navigate("/dashboard");
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
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("An error occurred during Google sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center">
          <img src={signinlogo} alt="Logo" className="max-w-full max-h-full p-8" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">Sign in</h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignin} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 text-base border ${
                email && !validateEmail(email) ? 'border-red-500' : 'border-gray-300'
              } rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-gray-400`}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`p-2 text-base border ${
                  password && !validatePassword(password) ? 'border-red-500' : 'border-gray-300'
                } rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-gray-400`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-2 right-2 text-sm text-teal-500 hover:underline"
              >
                {isPasswordVisible ? 'Hide' : ''}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox text-teal-600"
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
            className="bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700 w-full disabled:bg-teal-300 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <img src={googlelogo} alt="Google Logo" className="w-6 h-6" />
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;