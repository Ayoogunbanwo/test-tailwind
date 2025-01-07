import React from 'react';
import { MapPin, Search, ChevronRight } from 'lucide-react';

const ProvinceSelector = () => {
  const provinces = [
    { name: 'Alberta', count: 234 },
    { name: 'British Columbia', count: 456 },
    { name: 'Manitoba', count: 123 },
    { name: 'New Brunswick', count: 89 },
    { name: 'Newfoundland and Labrador', count: 67 },
    { name: 'Nova Scotia', count: 145 },
    { name: 'Ontario', count: 789 },
    { name: 'Prince Edward Island', count: 34 },
    { name: 'Quebec', count: 567 },
    { name: 'Saskatchewan', count: 112 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Find Drivers/Movers Across Canada
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city or postal code"
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Provinces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {provinces.map((province) => (
          <div
            key={province.name}
            className="group relative bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-teal-500" />
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                    {province.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {province.count} Drivers/Movers available
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transform group-hover:translate-x-1 transition-all" />
            </div>
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-500 rounded-xl transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 text-center text-gray-600">
        <p className="text-sm">
          Can't find your location? <span className="text-teal-500 hover:underline cursor-pointer">Let us know</span>
        </p>
      </div>
    </div>
  );
};

export default ProvinceSelector;