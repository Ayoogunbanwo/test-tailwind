import React from 'react';
import { Link } from 'react-router-dom';
import signinlogo from "../assets/truckit.svg";
import googlelogo from "../assets/icons8-google-50.png"

const SignIn = () => {
  const handleGoogleSignIn = () => {
    // Placeholder for Google sign-in functionality
    alert("Google Sign-In functionality is not implemented yet.");
  };

  const togglePassword = () => {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.add("text-teal-500");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("text-teal-500");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white max auto p-8" >
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={signinlogo} alt="Logo" className="max-w-full max-h-full p-8" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Sign in</h1>

        {/* Form */}
        <form id="signinForm" className="space-y-4">
          {/* Email */}
          <label className="text-gray-700 text-stone-900 text-base font-medium mb-1">Email address</label>
          <input
            type="email"
            placeholder="Email"
            required
            className="p-2 text-zinc-500 text-base border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          {/* Password */}
          <label className="text-gray-700 text-stone-900 text-base font-medium mb-1">Password</label>
          <div className="relative mb-4">
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              className="p-2 text-zinc-500 text-base border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                id="eyeIcon"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 7C7.5 19 3.5 15 3.5 12S7.5 5 12 5s8.5 4 8.5 7-4 7-8.5 7z"
                />
              </svg>
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-4 px-2 sm:px-2 md:px-2">
            <label className="flex items-center text-sm text-gray-800">
              <input type="checkbox" className="mr-2 text-stone-900 font-normal md:text-xs" /> Remember me
            </label>
            <a
              href="/forgotpassword"
              className="text-sm text-amber-600 text-xs font-medium font-['Inter'] no-underline hover:underline md:text-xs"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700 w-full mb-6"
          >
            Sign in
          </button>

          <div className="text-center mx-auto text-black text-base">or</div>

          {/* Google Button */}
          <div className="flex justify-center items-center w-full">
            <button
              type="button"
              className="flex items-center justify-center bg-white text-gray-600 font-medium py-2 rounded-lg text-base hover:bg-gray-100 active:bg-gray-200 border border-gray-300 shadow-md gap-2 w-full mt-6 focus:ring-2 focus:ring-blue-500"
              onClick={handleGoogleSignIn}
            >
                          <img className="w-6 h-6" src={googlelogo} alt="Google Logo" />
              <span>Sign in with Google</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Don’t have an account?{' '}
            <a href="/signup" className="text-teal-600 font-medium">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
