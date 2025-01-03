import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const iconBounce = {
  hover: { y: [0, -5, 0], transition: { duration: 0.5, repeat: Infinity } },
};

const ServicesSection = () => {
  const services = [
    {
      title: 'Reliable Drivers',
      description: 'Connect with trusted & experienced drivers for your moving needs',
      icon: '🚚',
    },
    {
      title: 'Transparent Pricing',
      description: 'Get upfront and clear pricing with no hidden fees',
      icon: '💵',
    },
    {
      title: 'Real-Time Updates',
      description: 'Stay informed with real-time tracking and updates on your move',
      icon: '📱',
    },
    {
      title: 'Dependable Haulers',
      description: 'Professional, timely, and safe movers for all your hauling needs',
      icon: '🛠️',
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Half-colored background */}
      <div className="absolute inset-0 z-0">
        <div className="h-1/2 bg-teal-50"></div>
        <div className="h-1/2 bg-white"></div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            variants={fadeInUp}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            We offer a range of services to make your moving experience seamless.
          </motion.p>
        </motion.div>

        {/* Display Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerChildren}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-teal-100 cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl mb-4"
                variants={iconBounce}
                whileHover="hover"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;