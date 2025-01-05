import React from 'react';
import { Link } from 'react-router-dom';

const ArtDesign = ({
  title = (
    <>
      <span className="text-primary text-teal-600 font-semibold">DRIVE</span> YOUR WAY TO EXTRA INCOME!
    </>
  ),
  description = 'Turn your driving skills into a steady source of income. With the New Mover App, connect with customers who need reliable transportation for their moves. Enjoy flexible work hours, fair pay, and easy-to-use navigation features to get the job done efficiently. Drive with purpose and earn on your schedule!',
  imageSrc = '/template/images/Vanimage 2.png',
  button = {
    text: 'Start Driving',
    to: '/signin',
    isPrimary: false
  }
}) => {
  return (
    <section className="flex min-h-screen flex-col lg:flex-row items-center justify-between bg-background p-6 lg:p-12 xl:p-16 space-y-8 lg:space-y-0 mt-16 lg:mt-20">
      {/* Content Section */}
      <div className="flex-1 text-left flex flex-col justify-center max-w-3xl mx-auto lg:mx-0 p-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-dark mb-6 ">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm md:text-sm mb-8 lg:mb-10 lg:text-lg text-justify leading-relaxed ">
          {description}
        </p>
        <div className="flex flex-wrap gap-6">
          <Link
            to={button.to}
            className="inline-flex items-center justify-center rounded-lg px-8 py-4 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 bg-teal-600 text-white hover:bg-primary/90"
          >
            {button.text}
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 w-full lg:h-screen relative">
        <img
          src={imageSrc}
          alt="Moving van"
          className="w-full h-full object-cover rounded-lg shadow-lg"
          onError={(e) => {
            console.error('Failed to load image:', imageSrc);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>
    </section>
  );
};

export default ArtDesign;