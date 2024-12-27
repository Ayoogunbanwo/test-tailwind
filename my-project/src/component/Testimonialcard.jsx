import React from 'react';
import PropTypes from 'prop-types';
import stars from '../assets/favourite-31.svg';

const TestimonialCard = ({ avatar, name, company, testimonial }) => {
  return (
    <div className="Frame28 flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-[100%] p-6 bg-teal-500 rounded-2xl flex flex-col justify-start items-start gap-4 shadow-lg snap-start">
      <div className="Frame27 flex items-center gap-4">
        <img className="Oval w-11 h-11 rounded-full shadow" src={avatar} alt={`${name} Profile`} />
        <div>
          <div className="text-white text-lg font-bold">{name}</div>
          <div className="text-zinc-100 text-sm">{company}</div>
        </div>
      </div>
      <p className="text-white text-sm leading-7">{testimonial}</p>
      <img src= {stars} alt="star" className="w-12" />
    </div>
  );
};

TestimonialCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  testimonial: PropTypes.string.isRequired,
};


export default TestimonialCard;
