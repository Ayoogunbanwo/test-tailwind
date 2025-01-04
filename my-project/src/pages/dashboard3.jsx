import React from 'react';
import TopNavBar from '../component/TopNavBar';
import QuickActions from '../component/QuickAction';
import RecentActivity from '../component/RecentActivity';
import Footer from '../component/footer';
import HeroSectiondashboard from '../component/Dash3hero';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../config/useUser';
import useAuth from "../config/hooks/useAuth";
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { profile, loading, formData } = useUser();
  const { signout } = useAuth();

  const isLoggedIn = !!profile;




console.log('Profile data:', profile);

  const handleLogout = () => {
    signout();
    localStorage.removeItem("authToken"); // or relevant storage mechanism
    navigate("/signin");
  };

  return (
    <div className='flex flex-col min-h-screen'   >
      <header>
        <TopNavBar />
      </header>

        <main className="Min-h-screen mx-auto p-8">  
        <HeroSectiondashboard className=" "
          isLoggedIn={isLoggedIn}
          firstname={profile?.firstName || "Guest"}
          onLogout={handleLogout}
            />
            <hr className="border-t-2 border-gray-300" />
            <QuickActions />
            <p className='text-center'>Request can only be cancelled or changed 48hrs before the move</p>
            <hr className="border-t-2 border-gray-300 my-6" />
            <RecentActivity />
            <hr className="border-t-2 border-gray-300 my-6 " />
            <section className="bg-gray-50 py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center font-['Open Sans'] font-bold">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* View Payment History */}
                        <Link
                            to="/view-payments" // Replace with your actual route
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 block"
                        >
                            <div className="text-teal-500 text-2xl mb-4">💳</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">View Payment History</h3>
                            <p className="text-sm text-gray-600 mb-4">Check your past transactions and receipts.</p>
                            <span className="text-teal-500 hover:text-teal-600 text-sm font-medium transition-colors duration-200">
                            [View Payments]
                            </span>
                        </Link>

                        {/* Contact Support */}
                        <Link
                            to="/contact-support" // Replace with your actual route
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 block"
                        >
                            <div className="text-teal-500 text-2xl mb-4">📞</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Support</h3>
                            <p className="text-sm text-gray-600 mb-4">Need help? Our team is here for you.</p>
                            <span className="text-teal-500 hover:text-teal-600 text-sm font-medium transition-colors duration-200">
                            [Chat Now]
                            </span>
                        </Link>

                        {/* Manage Your Account */}
                        <Link
                            to="/profile" // Replace with your actual route
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 block"
                        >
                            <div className="text-teal-500 text-2xl mb-4">👤</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Manage Your Account</h3>
                            <p className="text-sm text-gray-600 mb-4">Update your personal details.</p>
                            <span className="text-teal-500 hover:text-teal-600 text-sm font-medium transition-colors duration-200">
                            [Edit Profile]
                            </span>
                        </Link>

                        {/* Security */}
                        <Link
                            to="/verifyemail" // Replace with your actual route
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 block"
                        >
                            <div className="text-teal-500 text-2xl mb-4">🔒</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Security</h3>
                            <p className="text-sm text-gray-600 mb-4">Change your password.</p>
                            <span className="text-teal-500 hover:text-teal-600 text-sm font-medium transition-colors duration-200">
                            [Update Security Settings]
                            </span>
                        </Link>
                        </div>
                    </div>
            </section>

            <section className="bg-white py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Professional Drivers */}
                <div className="text-center">
                    <div className="text-teal-500 text-2xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Drivers</h3>
                    <p className="text-sm text-gray-600">Experienced and certified drivers for a safe journey.</p>
                </div>

                {/* Reliable Movers */}
                <div className="text-center">
                    <div className="text-teal-500 text-2xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Reliable Movers</h3>
                    <p className="text-sm text-gray-600">Trustworthy and efficient moving services.</p>
                </div>

                {/* Transparent Pricing */}
                <div className="text-center">
                    <div className="text-teal-500 text-2xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Transparent Pricing</h3>
                    <p className="text-sm text-gray-600">No hidden fees, clear and upfront pricing.</p>
                </div>

                {/* 24/7 Customer Support */}
                <div className="text-center">
                    <div className="text-teal-500 text-2xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Customer Support</h3>
                    <p className="text-sm text-gray-600">We’re here for you anytime you need assistance.</p>
                </div>
                </div>
            </div>
            </section>





        </main>

       <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CustomerDashboard;
