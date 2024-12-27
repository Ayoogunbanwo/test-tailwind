import React from 'react';
import signlogo from "../assets/truckit.svg";
import googlelogo from "../assets/icons8-google-50.png";



const SignUp = () => {
  const handleGoogleSignIn = () => {
    // Placeholder for Google sign-in functionality
    alert("Google Sign-In functionality is not implemented yet.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white overflow-auto">
      <div className="w-full max-w-md px-6">
        {/* Logo */} 
        <div className="flex justify-center mb-4">
          <img src={signlogo} alt="Company Logo" className="max-w-full max-h-full" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Sign up</h1>

        {/* Form */}
        <form id="signupForm" className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              id="email"
              name="email"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Terms and Privacy */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              required
              className="h-4 w-4 border-gray-300"
            />
            <span className="ml-2 text-stone-900 text-base font-normal font-['open-sans'] leading-snug text-gray-700 text-sm">
              I agree to the{' '}
              <a href="#" className="text-stone-900 text-base font-normal font-['open-sans'] underline">
                terms and Privacy
              </a>
            </span>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700 w-full mb-6"
          >
            Sign up
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
              <span>Sign up with Google</span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Already have an account?{' '}
            <a href="/signin" className="text-teal-600 font-medium">
              Sign In
            </a>
          </p>

          {/* Email Prompt */}
          <p className="mt-4 text-center">Please enter your email address to Sign up</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
