import React, { memo, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../component/ui/card';
import { Clock, BellIcon } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const RecentActivity = memo(() => {
  const [userUid, setUserUid] = useState(null);
  const [userMoves, setUserMoves] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserUid(user.uid);
      fetchData(user.uid);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const fetchData = async (uid) => {
    setLoading(true);
    try {
      const movesQuery = query(
        collection(db, 'Movedata'),
        where('uid', '==', uid),
        orderBy('date', 'desc'),
        limit(5)
      );
      const movesSnapshot = await getDocs(movesQuery);
      const moves = movesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserMoves(moves);

      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('uid', '==', uid),
        orderBy('time', 'desc'),
        limit(5)
      );
      const notificationsSnapshot = await getDocs(notificationsQuery);
      const notifications = notificationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserNotifications(notifications);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate();
      return format(date, 'MMMM d, yyyy');
    }
    return 'Unknown time';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recent Moves Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" aria-label="Recent Moves" />
            Recent Moves
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userMoves.length === 0 ? (
              <p className="text-gray-500">No recent moves available.</p>
            ) : (
              userMoves.map((move) => (
                <div
                  key={move.id}
                  className="flex justify-between items-center border-b pb-2 last:border-0 hover:bg-gray-50 transition-colors duration-300"
                >
                  <div>
                    <p className="font-medium">
                      {move.from} → {move.to}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(move.date)}</p>
                    {move.status && (
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded ${
                          move.status === 'Completed'
                            ? 'bg-green-100 text-green-600'
                            : move.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {move.status}
                      </span>
                    )}
                  </div>
                  <span className="text-green-600 font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(move.price || 0)}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Latest Updates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-5 w-5" aria-label="Latest Updates" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userNotifications.length === 0 ? (
              <p className="text-gray-500">No recent notifications available.</p>
            ) : (
              userNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 border-b pb-2 last:border-0 hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex-1">
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-sm text-gray-500">{formatDate(notification.time)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

RecentActivity.displayName = 'RecentActivity';

export default RecentActivity;
