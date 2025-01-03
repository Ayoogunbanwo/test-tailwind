import React from 'react';

const AdorablePupsBanner = () => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-teal-800 mb-4">Save 30%</h1>
      <p className="text-gray-700 mb-4">
        Since newly abandoned pups are competing with each other for human heartstrings, evolution suggests they should be most adorable around six to eleven weeks.
      </p>
      <p className="text-sm text-gray-500 italic">
        Image from Freepik
      </p>
    </div>
  );
};

export default AdorablePupsBanner;