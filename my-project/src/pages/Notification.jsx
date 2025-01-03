import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NotificationHistory = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch notifications for the current user from Firebase Firestore
  const fetchNotifications = async (uid) => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "notifications"));
      const notificationsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((notification) => notification.uid === uid); // Filter notifications by UID
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a notification from Firebase Firestore
  const deleteNotification = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id));
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "notifications", id), { isRead: true });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Fetch notifications when the current user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchNotifications(user.uid);
      } else {
        setCurrentUser(null);
        setNotifications([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Function to format the timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "Invalid Date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <button
            onClick={() => navigate("/CustomerDashboard")} // Navigate back to the dashboard
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-100 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
        {currentUser ? (
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-gray-600">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <p className="text-gray-600">No notifications to display.</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg flex justify-between items-center ${
                    notification.isRead ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-gray-800">{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {formatTime(notification.time)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Mark as read"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete notification"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <p className="text-gray-600">Please sign in to view notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;