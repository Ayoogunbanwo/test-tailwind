import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import imgvan from "../assets/Dashboard.jpg";

const HeroSectiondashboard = ({ isLoggedIn, firstname, onLogout }) => {
  // Dynamically render the title and description based on `isLoggedIn`
  const dynamicTitle = isLoggedIn ? (
    <>
      Welcome <span className="text-teal-700 font-bold">{firstname}</span> 
    </>
  ) : (
    "Welcome, Ready for Your Next Move?"
  );

  const dynamicDescription = isLoggedIn
    ? "Let's make your next move seamless and stress-free!"
    : "Seamless Moving at Your Fingertips - Plan, Track, and Relax!";

  // Buttons to render (hardcoded as an example)
  const buttons = [
    // Add your button objects here if needed
  ];

  // Render the buttons dynamically
  const renderButtons = () =>
    buttons.map((button, index) => (
      <Link
        key={index}
        to={button.to}
        className={`py-2 px-4 sm:px-6 sm:py-3 rounded-lg font-semibold transition duration-300 ease-in-out text-center text-xs sm:text-sm ${
          button.isPrimary
            ? "bg-teal-600 text-white hover:bg-teal-700"
            : "bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-600 hover:text-white"
        }`}
        aria-label={button.text}
      >
        {button.text}
      </Link>
    ));

  return (
    <section className="hero flex flex-col items-center justify-between w-full h-[400px] md:h-[500px]">
      {/* Text Section (Left Half) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 text-center md:text-left bg-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {dynamicTitle}
        </h2>
        <h2>Ready for Your Next Move?</h2>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-md">
          {dynamicDescription}
        </p>
        
        <div className="buttons flex flex-row gap-4">
          {isLoggedIn ? (
            renderButtons()
          ) : (
            <button
              onClick={onLogout}
              className="py-2 px-6 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Plan a Move
            </button>
          )}
        </div>
      </div>

      {/* Image Section (Right Half) */}
      <div className="flex-1 w-full ">
        <img
          src={imgvan}
          alt="Moving van with boxes"
          className="w-full h-full object-cover"
          aria-hidden="true"
          loading="lazy"
        />
      </div>
    </section>
  );
};

HeroSectiondashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // Is the user logged in?
  firstname: PropTypes.string.isRequired, // First name of the user
  onLogout: PropTypes.func.isRequired, // Logout function passed down from the parent
};

export default HeroSectiondashboard;