
import React from 'react';
import PropTypes from 'prop-types';

const DashboardFeature = ({ imageSrc, title, description }) => {
  const handleClick = () => {
    console.log("Image clicked!");
  };

  return (
    <div className="card-container p-5 bg-white rounded-2xl shadow-[1px_1px_10px_0px_rgba(0,0,0,0.25)] flex-col justify-start items-start gap-2.5 inline-flex hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="self-stretch h-48 flex-col justify-center items-center gap-3 flex" >
        <img 
          className="w-28 h-28 hover:scale-110 transition-all duration-300" 
          src={imageSrc} 
          alt="Image" 
          onClick={handleClick} 
        />
        <div className="self-stretch h-14 flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-black text-xl font-semibold font-['Open Sans']">
            {title}
          </div>
          <div className="self-stretch text-center text-black text-base font-normal font-['Open Sans']">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardFeature.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};



export default DashboardFeature;
