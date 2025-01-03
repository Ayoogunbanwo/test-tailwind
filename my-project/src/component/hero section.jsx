import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const HeroSection = ({ title, description, buttons }) => {
  return (
    <section className="hero min-h-[70vh] flex flex-col items-center justify-center py-8 px-6 lg:px-12 relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={loadSlim}
          options={{
            particles: {
              number: { value: 30 }, // Reduced number of particles
              color: { value: '#0d9488' },
              opacity: { value: 0.3 }, // More subtle opacity
              size: { value: 3 },
              move: { enable: true, speed: 1.5 }, // Slower movement
            },
          }}
        />
      </div>

      {/* Content Section */}
      <motion.div
        className="hero-content text-center z-10 max-w-4xl"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        {title && (
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
            variants={fadeInUp}
          >
            {title}
          </motion.h1>
        )}
        {description && (
          <motion.p
            className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {description}
          </motion.p>
        )}
        <motion.div
          className="buttons flex flex-row gap-4 justify-center"
          variants={staggerChildren}
        >
          {buttons.map((button, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link
                to={button.to}
                className={`py-2.5 px-6 sm:px-8 rounded-full font-semibold transition duration-300 ease-in-out text-center text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center min-w-[150px] ${
                  button.isPrimary
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-600 hover:text-white'
                }`}
              >
                {button.text}
                {button.icon && <span className="text-lg">{button.icon}</span>} {/* Add icons if needed */}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-5 border-2 border-teal-600 rounded-full animate-bounce"></div>
      </motion.div>
    </section>
  );
};

HeroSection.defaultProps = {
  title: (
    <>
      Simplify Your Move with{' '}
      <span className="text-teal-600 font-semibold">Truckit</span>
    </>
  ),
  description:
    'Connecting customers with reliable drivers and movers, the New Mover App simplifies the moving process with transparent pricing, real-time updates, and professional support for a seamless experience.',
  buttons: [
    {
      to: '/register',
      text: 'Register',
      isPrimary: true,
    },
    {
      to: '/learn-more',
      text: 'Learn More',
      isPrimary: false,
    },
  ],
};

HeroSection.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isPrimary: PropTypes.bool.isRequired,
      icon: PropTypes.node, // Optional icon for buttons
    })
  ).isRequired,
};

export default HeroSection;