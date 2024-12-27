import React from 'react';
import logo from '../assets/Vector.png';

const VerifyEmail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Verify your email</h1>

        {/* Form */}
        <form className="space-y-4">
          {/* Verification Code Input */}
          <div>
            <input
              type="text"
              placeholder="Enter verification code"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700"
          >
            Verify
          </button>

          {/* Resend Link */}
          <p className="text-center text-gray-500 text-sm mt-4">
              Didnot receive the code?{' '}
            <a href="#" className="text-teal-600 hover:underline">
              Resend
            </a>
          </p>
        </form>
        <div className="text-center text-slate-600 text-sm font-normal font-['Open Sans'] leading-tight mt-4">
          A link will be sent to your email to verify your email address.
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
