import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { BellIcon, ChevronDown, TruckIcon } from 'lucide-react';
import {useUser} from "../config/hooks/useUser";
import NotificationsPanel from '../component/NotificationPanel';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';


const UserMenu = React.lazy(() => import('../component/ProfileUserMenu'));

const TopNavBar = () => {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { uid, formData } = useUser();

  const userDetails = useMemo(() => {
    if (uid && formData && formData[uid]) {
      const user = formData[uid];
      return {
        firstName: user.firstName || 'Guest',
        email: user.email || '',
        profileImage: user.profileImage || "https://avatar.iran.liara.run/public/boy",
      };
    }
    return {
      firstName: 'Guest',
      email: '',
      profileImage: "https://avatar.iran.liara.run/public/boy",
    };
  }, [uid, formData]);

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

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications]
  );

  return (
    <div className="bg-white border-b sticky top-0 z-40 w-full">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="#" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl transform transition-transform group-hover:rotate-12">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent text-xl">
              Truckit
            </span>
          </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsPanelOpen((prev) => !prev)}
              aria-expanded={isNotificationsPanelOpen}
              aria-label="Toggle Notifications"
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <BellIcon className="h-6 w-6 text-gray-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            {isNotificationsPanelOpen && (
              <NotificationsPanel
                notifications={notifications}
                onClose={() => setIsNotificationsPanelOpen(false)}
              />
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
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
              <ChevronDown className={`h-4 w-4 text-gray-700 ${showUserMenu ? 'rotate-180' : ''} transition-transform`} />
            </button>
            {showUserMenu && (
              <Suspense fallback={<div className="p-4">Loading...</div>}>
                <UserMenu />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
