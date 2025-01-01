import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signlogo from "../assets/vector.png";
import googlelogo from "../assets/icons8-google-50.png";
import useAuth from "../config/hooks/useAuth";
import useUser from "../config/hooks/useUser";


// Validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,}$/.test(password);

const SignUp = () => {
  const { user, verifyEmail, signupWithEmail, handleGoogleSignin,saveUserToFirestore } = useAuth();
  const { setUser } = useUser();

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
    <div className="flex items-center justify-center min-h-screen bg-white overflow-auto">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center mb-4">
          <img src={signlogo} alt="Company Logo" className="max-w-full max-h-full" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">Sign up</h1>

        {error && (
          <div
            className="bg-white text-red-300 p-4 mb-4 rounded text-center"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        <form id="signupForm" className="space-y-4" onSubmit={handleSignUp}>
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
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                email && !validateEmail(email) ? "border-red-500" : "border-gray-300"
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
              className={`p-2 text-base border rounded-lg w-full focus:outline-none ${
                password && !validatePassword(password) ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              className="absolute top-2 right-2 text-sm text-teal-500 hover:underline"
            >
              {isPasswordVisible ? "Hide" : ""}
            </button>
            {password && !validatePassword(password) && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters, include one number, and one special character.
              </p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <input type="checkbox" required className="h-4 w-4 border-gray-300" />
            <span className="ml-2 text-gray-700 text-sm">
              I agree to the{" "}
              <Link to="/terms" className="underline text-teal-600">
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
            } text-white font-bold py-2 rounded-lg w-full mb-6`}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          <div className="text-center mx-auto text-black text-xl font-semibold">or</div>

          <div className="flex justify-center items-center w-full">
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleLogin}
              className={`${
                loading ? "bg-gray-200 cursor-not-allowed" : "bg-white"
              } flex items-center justify-center text-gray-600 font-medium py-2 rounded-lg text-base hover:bg-gray-100 active:bg-gray-200 border border-gray-300 shadow-md gap-2 w-full mt-6`}
            >
              <img className="w-6 h-6" src={googlelogo} alt="Google Logo" />
              <span>Sign up with Google</span>
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-teal-600 font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
