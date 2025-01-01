import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); // New state to track email verification status
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      currentUser.reload().then(() => {
        setUser(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          setEmailVerified(true);
        } else {
          startVerificationPolling(auth.currentUser);
        }
      });
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const resendVerificationEmail = async () => {
    if (!user || user.emailVerified || cooldown) return;

    setIsLoading(true);
    setEmailSent(false);

    try {
      await sendEmailVerification(user);
      setEmailSent(true);

      // Start cooldown period
      setCooldown(true);
      setTimeout(() => setCooldown(false), 60000); // 1-minute cooldown
    } catch (error) {
      console.error("Error resending email verification:", error);
      if (error.code === "auth/too-many-requests") {
        alert("Too many requests. Please try again later.");
      } else {
        alert("Failed to resend verification email. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startVerificationPolling = (currentUser) => {
    const interval = setInterval(async () => {
      await currentUser.reload();
      if (currentUser.emailVerified) {
        clearInterval(interval);
        setEmailVerified(true); // Update state
        setUser(getAuth().currentUser);
      }
    }, 5000); // Check every 5 seconds
  };

  const handleAccountCreation = () => {
    if (user?.emailVerified) {
      navigate("/createaccount");
    } else {
      alert("Please verify your email before creating an account.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white overflow-auto">
      <div className="w-full max-w-md px-6">
        <h1 className="text-2xl font-bold text-center mb-10">Verify Your Email</h1>
        <p className="text-center text-gray-600 mb-10">
          Please check your inbox for a verification email. If you did not receive it, Please click the resend verification button.
        </p>

        <div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            If you have already verified your email, click here to{" "}
            <button
              onClick={handleAccountCreation}
              className="text-teal-600 font-bold mb-8 hover:underline"
            >
              Proceed to Create an account
            </button>
          </p>
        </div>

        <button
          onClick={resendVerificationEmail}
          className="bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700 w-full mb-4"
          disabled={isLoading || cooldown}
        >
          {isLoading ? "Resending..." : "Resend Verification Email"}
        </button>

        {emailSent && (
          <p className="text-center text-green-600 mt-2">
            New Email verification link sent
          </p>
        )}

        {emailVerified && (
          <p className="text-center text-green-600 mt-4">
            Email verified! You can now procced to create your account.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
