import React from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate from React Router
import { getAuth, signOut } from "firebase/auth"; // import signOut from Firebase
import congratimg from "../assets/welcome.gif";
import imgicon from "../assets/check-circle.svg";

const Congratulations = () => {
  const navigate = useNavigate(); // initialize navigate function

  const handleContinueClick = async () => {
    try {
      // Get Firebase auth instance
      const auth = getAuth();
      
      // Sign out the user
      await signOut(auth);

      // Optionally clear session storage (if you're using it)
      sessionStorage.clear();

      // Navigate to the sign-in page
      navigate("/signin"); // replace "/signin" with your actual sign-in route
    } catch (error) {
      console.error("Error signing out: ", error);
      // You can add error handling logic here (e.g., show an error message to the user)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Container */}
      <div className="relative w-[90%] sm:w-[600px] md:h-[704px] bg-white overflow-hidden rounded-2xl shadow-2xl transform transition-all hover:scale-105">
        {/* Confetti Background */}
        <img
          src={congratimg}
          alt="Confetti Background"
          className="absolute top-0 left-0 w-full h-3/4 object-cover opacity-90"
        />

        {/* Success Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 mb-4 animate-bounce">
          <img
            src={imgicon}
            alt="Success Icon"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 text-center px-8">
          <h1 className="text-3xl font-bold text-gray-800 mt-4 animate-fade-in">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-600 mt-4 mb-8 animate-fade-in delay-100">
            Your email has been successfully verified. Click below to sign in.
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinueClick} // attach the click handler
            className="inline-block w-full bg-teal-600 text-white text-center py-4 rounded-lg hover:bg-teal-700 transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;