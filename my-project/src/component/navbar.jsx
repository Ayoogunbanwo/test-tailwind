import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TruckIcon, BellIcon, ChevronDown, SearchIcon } from 'lucide-react';

const NavBar = ({ isLoggedIn, avatar, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for mobile search
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handlers
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
    { href: '/contact-us', text: 'Contact' },
    { href: '/driver', text: 'Drivers' },
    { href: '/movers', text: 'Movers' },
  ];

  const buttons = isLoggedIn
    ? [{ text: 'Logout', isPrimary: true, onClick: onLogout }]
    : [
        { href: '/signup', text: 'Get Started', isPrimary: true },
        { href: '/signin', text: 'Login', isPrimary: false },
      ];

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl transform transition-transform group-hover:rotate-12">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent text-xl">
              Truckit
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          {!isLoggedIn && (
            <ul className="hidden md:flex gap-8">
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink {...link} />
                </li>
              ))}
            </ul>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-6">
           
            {/* Notifications */}
            {isLoggedIn && (
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full relative focus:outline-none group"
                >
                  <BellIcon className="h-6 w-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 text-xs text-white flex items-center justify-center animate-pulse">
                    3
                  </span>
                </button>
                {isNotificationsPanelOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 animate-fadeIn">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <p className="text-sm text-gray-600">No new notifications</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {buttons.map((button, index) => (
                <Button key={index} {...button} />
              ))}
            </div>

            {/* Avatar Menu */}
            {isLoggedIn && avatar && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 rounded-full px-3 py-2 focus:outline-none group"
                >
                  <div className="relative">
                    <img
                      src={avatar}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ring-teal-500"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-600">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800">user@example.com</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            {!isLoggedIn && (
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-xl focus:outline-none group"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-5 flex flex-col justify-between transform transition-transform duration-300">
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
        <div className="md:hidden border-t border-gray-100 animate-fadeIn">
          <div className="p-4 bg-white space-y-3">
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