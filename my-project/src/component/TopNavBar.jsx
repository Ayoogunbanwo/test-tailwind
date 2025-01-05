import React, { useState, useEffect, useMemo } from 'react';
import { Bell, ChevronDown, Truck, LogOut, User } from 'lucide-react';
import { useUser } from '../config/useUser';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import {  db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const TopNavBar = () => {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { uid, profile, logout } = useUser();
  const navigate = useNavigate();
  

  const userDetails = useMemo(() => ({
    firstName: profile?.firstName || 'Guest',
    email: profile?.email || '',
    profileImage: profile?.profileImage || "https://avatar.iran.liara.run/public/boy"
  }), [profile]);

  useEffect(() => {
    if (!uid) return;

    const notificationsRef = collection(db, 'notifications');
    const q = query(notificationsRef, where('uid', '==', uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );

    return () => unsubscribe();
  }, [uid]);

  const unreadNotificationsCount = useMemo(() => 
    notifications.filter((notification) => !notification.isRead).length,
  [notifications]);

   const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken"); 
    navigate("/customer");
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container') && !event.target.closest('.notifications-container')) {
        setShowUserMenu(false);
        setIsNotificationsPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b sticky top-0 z-40 w-full h-16">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="#" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl transition-transform group-hover:rotate-12">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent text-xl">
                Truckit
              </span>
            </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative notifications-container">
            <button
              onClick={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)}
              aria-expanded={isNotificationsPanelOpen}
              aria-label="Toggle Notifications"
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <Bell className="h-6 w-6 text-gray-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            {isNotificationsPanelOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100">
                {/* You can implement your notifications panel here */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 text-sm mt-2">No notifications</p>
                  ) : (
                    notifications.map(notification => (
                      <div key={notification.id} className="py-2">
                        {/* Render your notification content here */}
                        <p className="text-sm">{notification.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative user-menu-container">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-expanded={showUserMenu}
              aria-label="Toggle User Menu"
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2"
            >
              <img
                src={userDetails.profileImage}
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
              <span className="font-medium text-gray-800">{userDetails.firstName}</span>
              <ChevronDown 
                className={`h-4 w-4 text-gray-700 ${showUserMenu ? 'rotate-180' : ''} transition-transform`}
              />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-100">
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-900">{userDetails.firstName}</p>
                  <p className="text-sm text-gray-500">{userDetails.email}</p>
                </div>
                
                <div className="p-1">
                  <Link 
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;