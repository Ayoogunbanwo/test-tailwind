import React, { useEffect, useRef, useState } from 'react';
import DriveIncome from '../component/DriveIncome';
import Movers from '../component/movers';
import moverimg from '../assets/Moversng.jpg';
import Driveimg from '../assets/Untitled design.png';

// Button configurations
const Moverbuttons = [
  { to: '/signup', text: 'Get Started as a Mover', isPrimary: true },
];

const Drivebuttons = [
  { to: '/signup', text: 'Register as a Driver', isPrimary: true },
];

const ScrollContainer = () => {
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const container = containerRef.current;
    const totalPages = 2; // Number of pages

    const autoScroll = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages); // Move to the next page
      container.scrollTo({
        left: container.clientWidth * ((currentPage + 1) % totalPages),
        behavior: 'smooth', // Smooth scrolling
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(autoScroll); // Cleanup on unmount
  }, [currentPage]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-y-hidden h-screen snap-x snap-mandatory"
    >
      {/* Page 1: DriveIncome */}
      <div className="flex-none w-screen h-screen snap-start">
        <DriveIncome
          imageSrc={Driveimg} // Pass the image source
          buttons={Drivebuttons} // Pass the buttons
        />
      </div>

      {/* Page 2: Movers */}
      <div className="flex-none w-screen h-screen snap-start">
        <Movers
          imageSrc={moverimg} // Pass the image source
          buttons={Moverbuttons} // Pass the buttons
        />
      </div>
    </div>
  );
};

export default ScrollContainer;