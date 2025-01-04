import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TruckIcon } from 'lucide-react';
import googlelogo from "../assets/icons8-google-50.png";
import useAuth from "../config/hooks/useAuth";

// Validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,}$/.test(password);




const SignUp = () => {
  const { verifyEmail, signupWithEmail, handleGoogleSignin} = useAuth();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain at least one number and one special character.");
      return;
    }

    setError(""); // Clear previous error messages
    setLoading(true); // Show loading state

    try {
      // Call the signupWithEmail function
      const newUser = await signupWithEmail(email, password, navigate);
      console.log("User signed up:", newUser);

      // You can skip saving user to Firestore here since it's handled in signupWithEmail
      // The newUser already contains the data we need
      await verifyEmail(newUser); // Send verification email
      console.log("Verification email sent successfully to:", newUser.userEmail);

      // Clear form fields
      setEmail("");
      setPassword("");

      // Navigate to the email verification page
      navigate("/emailverification");
    } catch (error) {
      setError(error.message); // Display the user-friendly error message
      console.error("Signup failed:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { result, error } = await handleGoogleSignin();

      if (error) {
        // Display the custom error message for unregistered email
        alert(error);
        return;
      }

      const user = result.user;
      console.log("Google login successful:", user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("An error occurred during Google sign-in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 overflow-auto">
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

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-4 rounded-lg text-center text-sm" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form id="signupForm" className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-label="Enter your email address"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                email && !validateEmail(email) ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
              }`}
            />
            {email && !validateEmail(email) && (
              <p className="text-red-500 text-xs mt-1">Invalid email format</p>
            )}
          </div>

          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              aria-label="Enter your password"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                password && !validatePassword(password) ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"
              }`}
            />
            <button
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              className="absolute top-3 right-3 text-sm text-teal-600 hover:text-teal-700"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
            {password && !validatePassword(password) && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters, include one number, and one special character.
              </p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <input type="checkbox" required className="h-4 w-4 border-gray-300 rounded focus:ring-teal-500" />
            <span className="ml-2 text-gray-700 text-sm">
              I agree to the{" "}
              <Link to="/terms" className="underline text-teal-600 hover:text-teal-700">
                terms and Privacy
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            aria-disabled={loading}
            className={`${
              loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            } text-white font-bold py-3 rounded-lg w-full transition duration-300`}
          >
            {loading ? "Signing up..." : "Sign up"}
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
            <img className="w-6 h-6" src={googlelogo} alt="Google Logo" />
            <span>Sign up with Google</span>
          </button>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-teal-600 font-medium hover:text-teal-700">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;