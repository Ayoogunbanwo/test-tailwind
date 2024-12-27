import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ logo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="container flex flex-col bg-orange-100 max-w-full mt-4 p-6 ">
      <div className="container max-width-full flex flex-col lg:flex-row p-2 ">
        {/* Company Description */}
            <div className="flex flex-col items-start p-0 md:p-4 lg:p-4 mb-6">
            <img src={logo.src} alt={logo.alt} className="h-8 block m-0 mb-12" />
            <p className="text-base text-black font-normal font-['Open Sans'] text-justify">
    Connecting customers with reliable drivers and movers, the New Mover App simplifies the moving process with transparent pricing, real-time updates, and professional support for a seamless experience.
</p>

            </div>

            {/* Footer Sections */}
            <div className="container p-4 flex flex-row md:flex-row lg:flex-row sm:p-0">
            {/* Services */}
                <div className="w-full md:w-1/2 lg:w-48 flex flex-col gap-2 mt-6 md:p-6 sm:p-2 sm:items-between text-left">
                            <div className="text-teal-600 text-base font-bold font-['Open Sans'] sm:text-sm">Quick Links</div>
                            <ul className="text-black text-base font-normal font-['Open Sans'] leading-9">
                                <li><a href="#" className="hover:underline">Home</a></li>
                                <li><a href="#" className="hover:underline">How It Works</a></li>
                                <li><a href="#" className="hover:underline">Testimonials</a></li>
                                <li><a href="#" className="hover:underline">Chat us</a></li>
                            </ul>
                </div>

                  {/* Contact Us */}
                <div className='hidden md:block'>
                 <FooterSection title="Email us" >
                 <p className="text-black text-base font-normal font-['Open Sans']">emailaddress@gmail.com</p>
                </FooterSection>
                </div>
        </div>
        
        {/* Follow Us */}
<div className="w-full md:w-1/2 lg:w-48 flex flex-col gap-2 mt-6 md:p-6 text-left">
    <div className="text-teal-600 text-base font-semibold font-['Open Sans']">Follow us</div>
    <div className="flex gap-4 mt-2">
        <a href="#" className="text-black hover:text-teal-600 text-xl">
            <i className="fab fa-facebook"></i> {/* FontAwesome Facebook Icon */}
        </a>
        <a href="#" className="text-black hover:text-teal-600 text-xl">
            <i className="fab fa-twitter"></i> {/* FontAwesome Twitter Icon */}
        </a>
        <a href="#" className="text-black hover:text-teal-600 text-xl">
            <i className="fab fa-instagram"></i> {/* FontAwesome Instagram Icon */}
        </a>
        <a href="#" className="text-black hover:text-teal-600 text-xl">
            <i className="fab fa-linkedin"></i> {/* FontAwesome LinkedIn Icon */}
        </a>
    </div>
</div>

      </div>

      {/* Footer Bottom */}
      <div className="w-full text-center text-black font-normal text-sm mt-4">
        <p>
          Copyright <span className="footer-year">{currentYear}</span> All rights reserved
        </p>
      </div>
    </section>
  );
};

const FooterSection = ({ title, children }) => (
  <div className="w-full md:w-1/2 lg:w-48 flex flex-col gap-2 mt-6 md:p-6 ">
    <div className="text-teal-600 text-base font-semibold font-['Open Sans'] hidden md:block">{title}</div>
    <div className="text-black text-base font-normal font-['Open Sans'] leading-9 hidden md:block">{children}</div>
  </div>
);

const FooterLink = ({ href, children }) => (
  <a href={href} className="hover:underline">
    {children}
  </a>
);

Footer.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Footer;
