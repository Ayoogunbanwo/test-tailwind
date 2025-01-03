import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ children, className }) => (
  <div className={`bg-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${className}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardHeader = ({ children, className }) => (
  <div className={`p-6 border-b border-teal-300 ${className}`}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-2xl font-bold text-black ${className}`}>
    {children}
  </h2>
);

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardContent = ({ children, className }) => (
  <div className={`p-6 text-black ${className}`}>
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};