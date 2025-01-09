import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TruckIcon, Eye, EyeOff } from "lucide-react";
import googlelogo from "../assets/icons8-google-50.png";
import useAuth from "../config/hooks/useAuth";
import { validateEmail, validatePassword, getErrorMessage } from '../authutils/utils';

const SignUp = () => {
  const { signupWithEmail, handleGoogleSignin, verifyEmail } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptedTerms: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === "acceptedTerms" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear errors on input change
    setError("");

    // Update password validation errors
    if (name === "password") {
      const validationResult = validatePassword(value);
      if (Array.isArray(validationResult)) {
        setPasswordErrors(validationResult);
      } else {
        setPasswordErrors([]);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      // Validate form
      if (!validateEmail(formData.email)) {
        throw new Error("validation/email-invalid");
      }

      if (!formData.acceptedTerms) {
        throw new Error("validation/terms-not-accepted");
      }

      const passwordValidation = validatePassword(formData.password);
      if (Array.isArray(passwordValidation)) {
        throw new Error("validation/password-requirements");
      }

      const newUser = await signupWithEmail(formData.email, formData.password);
      await verifyEmail(newUser);

      // Reset form
      setFormData({
        email: "",
        password: "",
        acceptedTerms: false,
      });
      setPasswordErrors([]);

      navigate("/emailverification");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error("Signup Error:", {
        originalError: err,
        mappedMessage: errorMessage,
        errorCode: err.code,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const result = await handleGoogleSignin();

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.user) {
        navigate("/CustomerDashboard");
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error("Google Sign-in Error:", {
        originalError: err,
        mappedMessage: errorMessage,
        errorCode: err.code,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 p-8">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl transform transition-transform group-hover:rotate-12">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent text-xl">
              Truckit
            </span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                formData.email && !validateEmail(formData.email)
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-teal-500"
              }`}
              placeholder="your@email.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  passwordErrors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-teal-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Requirements */}
            {formData.password && passwordErrors.length > 0 && (
              <div className="mt-2 space-y-1">
                {passwordErrors.map((error, index) => (
                  <p key={index} className="text-sm text-red-600 flex items-center">
                    <span className="mr-2">•</span>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="acceptedTerms"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleInputChange}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="acceptedTerms" className="text-sm text-gray-700">
              I agree to the{" "}
              <Link to="/terms" className="text-teal-600 hover:text-teal-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-teal-600 hover:text-teal-700">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium ${
              loading ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            <img src={googlelogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-teal-600 hover:text-teal-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;