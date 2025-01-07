import React, { useState, useEffect } from 'react';
import { TruckIcon, Clock, MapPin, Package } from 'lucide-react';

const TruckitComingSoon = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: <TruckIcon className="w-6 h-6" />, text: "Reliable Moving Services" },
    { icon: <Clock className="w-6 h-6" />, text: "Real-time Tracking" },
    { icon: <MapPin className="w-6 h-6" />, text: "Smart Route Planning" },
    { icon: <Package className="w-6 h-6" />, text: "Secure Delivery" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-500 p-2 rounded-xl">
              <TruckIcon className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Truckit</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className={`flex-1 space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Your Moving Journey
                <br />
                Made Simple
              </h1>
              <p className="text-lg text-gray-600">
                Start your moving journey effortlessly with Truckit! We're crafting a seamless experience to transform the way you move.
              </p>
            </div>

            {/* Email Notification Form */}
            <div className="max-w-md">
              <div className="flex gap-3">
                <input 
                  type="email"
                  placeholder="Enter your email for early access"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-teal-500">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className={`flex-1 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative mx-auto max-w-[300px]">
              {/* Phone Frame */}
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-gray-900 shadow-2xl">
                <div className="absolute top-0 w-full h-6 bg-gray-900 z-10">
                  <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-full" />
                </div>
                {/* App Screen Content */}
                <div className="bg-white pt-6 pb-8 px-6 h-[600px]">
                  <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <div className="bg-teal-500 p-4 rounded-2xl">
                      <TruckIcon className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-center text-gray-900">
                      Coming Soon
                    </h2>
                    <p className="text-center text-gray-600">
                      Your trusted moving companion
                    </p>
                    <div className="w-full">
                      <button className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckitComingSoon;