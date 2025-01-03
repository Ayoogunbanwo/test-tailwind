import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for routing

const DriveIncome = ({
  title = (
    <>
      <span className="text-teal-600 font-bold">DRIVE</span> YOUR WAY TO EXTRA INCOME!
    </>
  ),
  description = 'Turn your driving skills into a steady source of income. With the New Mover App, connect with customers who need reliable transportation for their moves. Enjoy flexible work hours, fair pay, and easy-to-use navigation features to get the job done efficiently. Drive with purpose and earn on your schedule!',
  imageSrc = '/template/images/Vanimage 2.png', // Default image
  buttons = [], // Default buttons
}) => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between bg-white w-screen h-screen">
      {/* Content Section */}
      <div className="flex-1 lg:p-8 text-left flex flex-col justify-center">
        {title && <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-bold">{title}</h2>}
        {description && (
          <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-6 lg:mb-8 text-justify">
            {description}
          </p>
        )}
        <div className="flex flex-row gap-4 justify-start">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.to}
              className={`py-2 px-4 sm:px-6 sm:py-3 rounded-lg font-semibold transition duration-300 ease-in-out text-center text-xs sm:text-sm ${
                button.isPrimary
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-600 hover:text-white'
              }`}
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 w-screen h-screen">
        <img
          src={imageSrc}
          alt="Moving van with boxes"
          className="w-screen h-screen"
        />
      </div>
    </section>
  );
};

export default DriveIncome;