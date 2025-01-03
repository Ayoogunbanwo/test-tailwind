import React from 'react';
import { Truck, Shield, Clock, CreditCard } from 'lucide-react';
import img from '../assets/Dashboard.jpg';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-white to-teal-50 mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
          <div className="space-y-8">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent mb-4">
              Moving Made Simple
            </h3>
            
            <p className="text-gray-600 text-lg">
              Your reliable partner for hassle-free moving and delivery
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/signin">
                <button className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  Book a Move
                </button>
              </Link>
              <Link to="/driver">
                <button className="border-2 border-teal-500 text-teal-500 px-8 py-3 rounded-full hover:bg-teal-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  Join as Driver
                </button>
              </Link>
              </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
              <div className="text-center p-4 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <Clock className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <h3 className="text-teal-600 font-semibold mb-2">Instant Booking</h3>
                <p className="text-gray-500 text-sm">Book reliable movers & drivers in minutes</p>
              </div>
              
              <div className="text-center p-4 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <Shield className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <h3 className="text-teal-600 font-semibold mb-2">Verified Drivers and reliable Movers</h3>
                <p className="text-gray-500 text-sm">100% background checked</p>
              </div>
              
              <div className="text-center p-4 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <CreditCard className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <h3 className="text-teal-600 font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-500 text-sm">Pay safely through our secure payment</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={img}
              alt="Moving truck with furniture"
              className="w-full h-auto object-contain opacity-90"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}