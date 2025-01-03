import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TruckIcon, BellIcon, ChevronDown, SearchIcon } from 'lucide-react';

const NavBar = ({ isLoggedIn, avatar, onLogout }) => {
  // States and refs remain the same
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Effects remain the same
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { href: '/', text: 'Home' },
    { href: '/FAQ', text: 'FAQ' },
    { href: '/about-us', text: 'About' },
    { href: '/driver', text: 'Drivers' },
    { href: '/movers', text: 'Movers' },
  ];

  const buttons = isLoggedIn
    ? [{ text: 'Logout', isPrimary: true, onClick: onLogout }]
    : [
        { href: '/signup', text: 'Get Started', isPrimary: true },
        { href: '/signin', text: 'Login', isPrimary: false },
      ];

  // Components remain the same
  const NavLink = ({ href, text, className, onClick }) => (
    <Link
      to={href}
      className={`relative text-base font-medium text-gray-600 hover:text-teal-600 transition-colors duration-300
        after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-teal-600
        after:transition-all after:duration-300 hover:after:w-full ${className}`}
      onClick={onClick}
    >
      {text}
    </Link>
  );

  const Button = ({ href, text, isPrimary, onClick }) => {
    const baseStyles = "relative overflow-hidden py-2.5 px-6 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500";
    const primaryStyles = "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg";
    const secondaryStyles = "bg-white text-teal-600 border-2 border-teal-500 hover:bg-teal-50";
    
    const Component = href ? Link : 'button';
    const props = href ? { to: href } : { onClick };

    return (
      <Component
        {...props}
        className={`${baseStyles} ${isPrimary ? primaryStyles : secondaryStyles}`}
      >
        {text}
      </Component>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24
      ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'}
    `}>
      <div className="container mx-auto px-4">
        <div className="h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="#" className="flex items-center gap-3 group shrink-0">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl transform transition-transform group-hover:rotate-12">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent text-xl">
              Truckit
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          {!isLoggedIn && (
            <ul className="hidden xl:flex gap-8">
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink {...link} />
                </li>
              ))}
            </ul>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Auth Buttons */}
            <div className="hidden xl:flex items-center gap-3">
              {buttons.map((button, index) => (
                <Button key={index} {...button} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            {!isLoggedIn && (
              <button
                className="xl:hidden p-2 hover:bg-gray-100 rounded-xl focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-gray-600 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-gray-600 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-gray-600 transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !isLoggedIn && (
        <div className="xl:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full">
          <div className="container mx-auto p-4 space-y-3">
            {links.map((link, index) => (
              <NavLink
                key={index}
                {...link}
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
            <div className="flex flex-col gap-3">
              {buttons.map((button, index) => (
                <Button key={index} {...button} />
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;