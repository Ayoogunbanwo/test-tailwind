import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import useAuth from "../config/hooks/useAuth";
import logo from "../assets/Vector.png";


const VerifyEmail = () => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const userQuery = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        // Generic message to prevent information leaks
        setMessage("If this email is registered, you will receive a verification email.");
      } else {
        await resetPassword(email, navigate);
        setMessage("Reset email sent successfully. Please check your inbox.");
        setEmail("");
        setTimeout(() => navigate("/signin"), 3000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">Reset your email</h1>

        <form className="space-y-4" onSubmit={handleResetPassword}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600"} 
              text-white font-semibold py-3 rounded-lg hover:bg-teal-700`}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        <p className="text-center text-slate-600 text-sm mt-4">
          A link will be sent to your email to reset your password.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
