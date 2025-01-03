import React from 'react';
import PropTypes from 'prop-types';
import { TruckIcon, BellIcon, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-gradient-to-r from-orange-50 to-orange-100 w-full mt-4 p-6 border-t border-orange-200 shadow-sm">
  <div className="container mx-auto flex flex-col lg:flex-row gap-8 p-4">
    {/* Company Description */}
    <div className="flex flex-col items-start space-y-6 lg:w-1/3">
       <Link to="#" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl transform transition-transform group-hover:rotate-12">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent text-xl">
              Truckit
            </span>
          </Link>
      <p className="text-base text-gray-700 font-normal font-['Open Sans'] text-justify leading-relaxed">
        Connecting customers with reliable drivers and movers, the New Mover App simplifies the moving process with transparent pricing, real-time updates, and professional support for a seamless experience.
      </p>
    </div>

    {/* Footer Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:w-2/3">
      {/* Quick Links */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-teal-600 text-base font-bold font-['Open Sans']">Quick Links</h3>
        <ul className="text-black text-base font-normal font-['Open Sans'] space-y-2">
          <li><a href="#" className="hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2"><i className="fas fa-home text-sm"></i> Home</a></li>
          <li><a href="#" className="hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2"><i className="fas fa-cogs text-sm"></i> How It Works</a></li>
          <li><a href="#" className="hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2"><i className="fas fa-comments text-sm"></i> Testimonials</a></li>
          <li><a href="#" className="hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2"><i className="fas fa-headset text-sm"></i> Chat us</a></li>
        </ul>
      </div>

      {/* Email Us */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-teal-600 text-base font-semibold font-['Open Sans']">Email us</h3>
        <p className="text-black text-base font-normal font-['Open Sans']">emailaddress@gmail.com</p>
      </div>

      {/* Follow Us */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-teal-600 text-base font-semibold font-['Open Sans']">Follow us</h3>
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-2xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-2xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-2xl">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-2xl">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Get Started */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-teal-600 text-base font-semibold font-['Open Sans']">Get Started</h3>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:teal-100 transition-colors duration-200">
          Contact Us
        </button>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="w-full text-center text-black font-normal text-sm mt-8">
    <p>Copyright <span className="footer-year">{currentYear}</span> All rights reserved</p>
    <a href="/" className="text-teal-600 hover:underline mt-2 inline-block">Back to Top</a>
  </div>
</section>
  );
};

Footer.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string
  })
};

export default Footer;