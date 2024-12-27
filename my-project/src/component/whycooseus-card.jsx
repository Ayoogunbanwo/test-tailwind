import React from 'react';
import PropTypes from 'prop-types';

function Feature({ imageSrc, title, description }) {
  return (
    <div className="feature p-6 bg-white rounded-lg shadow-lg text-center">
      <img src={imageSrc} alt={title} className="w-full h-auto rounded-lg mb-4" />
      <h4 className="text-sm sm:text-xl mb-2 font-semibold">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-600 hidden md:block">{description}</p>
    </div>
  );
}

Feature.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Feature;