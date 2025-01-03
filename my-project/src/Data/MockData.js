import { useId } from "react";

export const userData = {
  name: 'Sarah Johnson',
  email: 'sarah.j@example.com',
  profileImage: '/api/placeholder/40/40',
};

export const notificationsData = [
  { uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",  message: 'New message from John', isRead: false, time: '2025-01-01T08:00:00Z' },
  { uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",  message: 'Your order has shipped', isRead: true, time: '2024-12-31T16:00:00Z' },
  { uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",  message: 'Reminder: Meeting at 3 PM', isRead: false, time: '2024-12-31T12:00:00Z' },
  { uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",  message: 'New comment on your post', isRead: true, time: '2024-12-30T09:00:00Z' },
  { uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",  message: 'Package delivered!', isRead: false, time: '2024-12-30T14:00:00Z' },
];

export const moveHistory = [
  { uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",  from: 'New York, NY', to: 'Los Angeles, CA', date: '2023-10-01', price: 1200, status: 'Completed' },
  { uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",  from: 'Chicago, IL', to: 'Houston, TX', date: '2023-09-15', price: 800 , status: 'Completed' },
];

export const upcomingMove = {
  uid: "GuVDUDeEZIXc0PLfb6C8e4o13wO2",
  from: 'San Francisco, CA',
  to: 'Seattle, WA',
  date: '2023-11-01',
  status: 'Scheduled',
  price: 1500,
};
