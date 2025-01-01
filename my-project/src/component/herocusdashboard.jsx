import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import imgvan from "../assets/Dashboard.jpg";

const HeroSectioncusdashboard = ({ isLoggedIn, firstname, onLogout }) => {
  // Dynamically render the title and description based on `isLoggedIn`
  const dynamicTitle = isLoggedIn
    ? `Hi ${firstname}, Ready for Your Next Move?`
    : "Hi, Ready for Your Next Move?";

  const dynamicDescription = isLoggedIn
    ? "Let's make your next move seamless and stress-free!"
    : "Seamless Moving at Your Fingertips - Plan, Track, and Relax!";

  // Buttons to render (hardcoded as an example)
  const buttons = [
    { to: "#", text: "Request a Move", isPrimary: true },
    { to: "/profile", text: "View Profile", isPrimary: false },
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
    <section className="hero flex flex-col md:flex-row lg:flex-row items-center justify-between bg-white">
      <div className="hero-content flex-1 p-12 lg:w-1/2 text-left">
        <h2 className="text-xl md:text-3xl mb-4 font-bold">{dynamicTitle}</h2>
        <p className="text-gray-600 text-sm md:text-base mb-8 lg:mb-16 text-justify pr-3">
          {dynamicDescription}
        </p>
          <div className="buttons flex flex-row gap-4 justify-start">
            {isLoggedIn ? (
              renderButtons()
            ) : (
              <button
                onClick={onLogout}
                className="mt-4 py-2 px-6 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Plan a Move
              </button>
            )}
          </div>
      </div>

      <div className="hero-image flex-1 lg:w-1/2">
        <img
          src={imgvan}
          alt="Moving van with boxes"
          className="w-full h-auto object-cover"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

HeroSectioncusdashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // Is the user logged in?
  firstname: PropTypes.string.isRequired, // First name of the user
  onLogout: PropTypes.func.isRequired, // Logout function passed down from the parent
};

export default HeroSectioncusdashboard;
