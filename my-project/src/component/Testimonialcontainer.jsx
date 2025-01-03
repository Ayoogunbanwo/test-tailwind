import React from 'react';
import PropTypes from 'prop-types';
import TestimonialCard from '../component/Testimonialcard';

const Testimonials = () => {
  const testimonials = [
    {
      avatar: 'https://avatar.iran.liara.run/public/girl',
      name: 'Jane Cooper',
      company: 'Louis Vuitton',
      testimonial: '“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”',
    },
    {
      avatar: 'https://avatar.iran.liara.run/public/girl',
      name: 'Kathryn Murphy',
      company: 'Starbucks',
      testimonial: '“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”',
    },
    {
      avatar: 'https://avatar.iran.liara.run/public/boy',
      name: 'Cameron Williamson',
      company: 'eBay',
      testimonial: '“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”',
    },
  ];

  return (
    <div className="Group3 relative flex flex-col justify-center text-justify items-center gap-10 px-4 ">
      <div className="TestimonialTitle text-black text-3xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-['open-sans'] text-center z-40  pt-6">
        Hear from Our Users
      </div>
      <div className="Shadow absolute w-[calc(50%+2rem)] h-80 opacity-30 bg-gradient-to-l from-orange-100 to-teal-500 rounded-3xl z-0 transform -translate-x-1/2 left-1/2 shadow-2xl mt-12"></div>
      
      <div className="Frame31 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 z-10 scroll-smooth w-full mx-auto mt-10 lg:px-6 md:px-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index} 
            avatar={testimonial.avatar} 
            name={testimonial.name} 
            company={testimonial.company} 
            testimonial={testimonial.testimonial} 
          />
        ))}
      </div>
      
      <a href="/index.html" className="CheckAllReviews text-center text-black text-base font-semibold font-['Plus Jakarta Sans'] leading-7 z-40 underline mt-4">
        Check all reviews
      </a>
    </div>
  );
};

export default Testimonials;
