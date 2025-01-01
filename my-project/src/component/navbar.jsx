import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logoimage from "../assets/Vector.png";

const NavBar = ({ isLoggedIn, avatar, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const links = isLoggedIn
    ? []
    : [
        { href: '/', text: 'Home', isActive: true },
        { href: '/faq', text: 'FAQ', isActive: false },
        { href: '/about-us', text: 'About', isActive: false },
        { href: '/contact-us', text: 'Contact', isActive: false },
        { href: '/driver', text: 'Drivers', isActive: false },
        { href: '/movers', text: 'Movers', isActive: false },
      ];

  const buttons = isLoggedIn
    ? [{ text: 'Logout', isPrimary: true, onClick: onLogout }]
    : [
        { href: '/signup', text: 'Get Started', isPrimary: true },
        { href: '/signin', text: 'Login', isPrimary: false },
      ];

  return (
    <nav className="navbar bg-white shadow-md z-50 p-6" style={{ position: 'sticky', top: 0 }}>
      <div className="flex flex-row justify-between items-center">
        {/* Logo */}
       <div className="logo max-w-full max-h-full">
          <img
            src={logoimage}
            alt="Company Logo"
            className="h-8 sm:h-12 block m-0"
          />
      </div>


        {/* Nav Links */}
        <ul className="ref-list hidden sm:flex gap-3">
          {links.map((link, index) => (
            <li key={index} className="my-2 sm:my-0 sm:px-1">
              <Link
                to={link.href}
                className={`nav-link text-base font-semibold transition-colors duration-300 ${link.isActive ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Nav Container */}
        <div className="nav-container flex items-center justify-between gap-4">
          {/* Nav Buttons */}
          <div className="buttons flex gap-2">
            {buttons.map((button, index) =>
              button.href ? (
                <Link
                  key={index}
                  to={button.href}
                  className={`py-1 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm border-2 rounded-md transition-all duration-300 ${
                    button.isPrimary
                      ? 'bg-teal-600 text-white hover:bg-teal-700'
                      : 'bg-white text-teal-600 hover:bg-teal-600 hover:text-white'
                  }`}
                >
                  {button.text}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={button.onClick}
                  className="py-1 px-3 sm:py-2 sm:px-4 bg-teal-600 text-white hover:bg-teal-700 rounded-md"
                >
                  {button.text}
                </button>
              )
            )}
          </div>

          {/* Avatar */}
          {isLoggedIn && avatar && (
            <div className="avatar">
              <Link to="/profile">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
              </Link>
            </div>
          )}

          {/* Hamburger Menu */}
          {/* Conditionally render the hamburger only when not logged in */}
          {!isLoggedIn && (
            <div className="sm:hidden flex items-center mt-1 order-last">
              <button
                className="hamburger-menu"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen ? 'true' : 'false'}
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="teal"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !isLoggedIn && (
        <ul className="sm:hidden flex flex-col items-start p-4 font-open text-sm bg-white shadow-lg mt-2">
          {links.map((link, index) => (
            <li key={index} className="my-2">
              <Link
                to={link.href}
                onClick={toggleMenu}
                className={`nav-link text-base font-semibold transition-colors duration-300 ${link.isActive ? 'text-teal-500' : 'text-black hover:text-teal-600'}`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  onLogout: PropTypes.func.isRequired, // Parent-defined logout function
};

export default NavBar;
