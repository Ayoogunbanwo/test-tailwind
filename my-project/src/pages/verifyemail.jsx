import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import useAuth from "../config/hooks/useAuth";
import { TruckIcon } from "lucide-react"; // Import TruckIcon
import { Link } from "react-router-dom";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50">
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

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Reset Your Password</h1>

        <form className="space-y-6" onSubmit={handleResetPassword}>
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
            className={`w-full ${
              loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            } text-white font-semibold py-3 rounded-lg transition duration-300`}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        <p className="text-center text-gray-600 text-sm mt-4">
          A link will be sent to your email to reset your password.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;