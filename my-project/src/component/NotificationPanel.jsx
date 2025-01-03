import React from 'react';
import PropTypes from 'prop-types';
import { format, isValid } from 'date-fns';

const NotificationsPanel = ({ notifications = [], onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
      <header className="p-4 border-b">
        <h3 className="font-bold mb-2">Notifications</h3>
      </header>
      <section className="p-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            let formattedDate = 'Unknown date';

            try {
              if (notification.time?.toDate) {
                const date = notification.time.toDate(); // Convert Firestore timestamp
                if (isValid(date)) {
                  formattedDate = format(date, 'MM/dd/yyyy hh:mm a');
                }
              }
            } catch (error) {
              console.error('Error processing notification time:', error);
            }

            return (
              <div key={notification.id} className="mb-4 p-2 bg-gray-50 rounded-lg">
                <p className="text-sm">{notification.message}</p>
                <small className="text-xs text-gray-500">{formattedDate}</small>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No new notifications.</p>
        )}
      </section>
      <button
        onClick={onClose}
        className="w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-b-lg text-sm font-medium"
        aria-label="Close notifications panel"
      >
        Close
      </button>
    </div>
  );
};

NotificationsPanel.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.object, // Firestore timestamp
      isRead: PropTypes.bool,
    })
  ),
  onClose: PropTypes.func.isRequired,
};

NotificationsPanel.defaultProps = {
  notifications: [],
};

export default NotificationsPanel;
