import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../component/ui/card';
import { MapPin, TruckIcon } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';

// ActionCard component for quick actions
const ActionCard = ({ icon, title, description, to }) => (
  <Link to={to} className="block hover:scale-105 transform transition-transform duration-300 ease-in-out">
    <Card
      className="rounded-lg overflow-hidden transition-all duration-300 w-full h-48 sm:h-56 bg-white shadow-lg hover:shadow-xl"
      style={{
        boxShadow: '0 4px 6px -1px rgba(94, 234, 212, 0.3), 0 2px 4px -1px rgba(94, 234, 212, 0.2)'
      }}
    >
      <CardContent className="p-6 sm:p-8 flex items-center gap-4 sm:gap-6 h-full">
        <div className="p-3 sm:p-4 bg-blue-100 rounded-xl text-blue-600">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

// UpcomingMoveCard component to display the user's upcoming moves
const UpcomingMoveCard = () => {
  const [uid, setUid] = useState(null);
  const [scheduledMoves, setScheduledMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the current user's UID when the component mounts
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid);
      fetchScheduledMoves(user.uid);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  // Fetch scheduled moves from the Movedata collection
  const fetchScheduledMoves = async (uid) => {
    try {
      const db = getFirestore();
      const movesCollection = collection(db, 'Movedata');
      const q = query(
        movesCollection,
        where('uid', '==', uid),
        where('status', '==', 'Scheduled')
      );
      const querySnapshot = await getDocs(q);
      const moves = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScheduledMoves(moves);
    } catch (error) {
      console.error('Error fetching moves:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format Firestore Timestamp to a readable date and time
  const formatDate = (timestamp) => {
    try {
      if (timestamp && typeof timestamp.toDate === 'function') {
        const date = timestamp.toDate();
        return format(date, 'PPpp'); // Example: "Jan 1, 2023 at 10:30 AM"
      }
      return 'Invalid Date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Error';
    }
  };

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // No scheduled moves
  if (scheduledMoves.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TruckIcon className="h-5 w-5" />
            Upcoming Moves
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-teal-500">No upcoming moves scheduled</p>
        </CardContent>
      </Card>
    );
  }

  // Render scheduled moves
  return (
    <div className="space-y-4">
      {scheduledMoves.map((move) => (
        <Card key={move.id} className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TruckIcon className="h-5 w-5" />
              Upcoming Move
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{formatDate(move.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">{move.from}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium">{move.to}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// QuickActions component to display various actions and upcoming moves
const QuickActions = () => (
  <main className="flex flex-col mx-auto mt-16 mb-16">
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full my-6">
        <ActionCard
          icon={<MapPin className="h-6 w-6 text-teal-600" />}
          title="Request a Move"
          description="Start a new moving request."
          to="/MoveRequestForm"
        />
        <ActionCard
          icon={<TruckIcon className="h-6 w-6 text-teal-600" />}
          title="Book a Mover"
          description="Contact customer service"
          to="#"
        />
        <ActionCard
          icon={<TruckIcon className="h-6 w-6 text-teal-600" />}
          title="Move History"
          description="View past moves and payments"
          to="/MoveHistory"
        />
        <ActionCard
          icon={<MapPin className="h-6 w-6 text-teal-600" />}
          title="Notifications"
          description="Access updates or reminders"
          to="/Notification"
        />
      </div>
    </section>
    <section>
      <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-bold text-center my-6 mb-8 mt-8 p-12">
        Upcoming Moves
      </h2>
    </section>
    <section>
      <div>
        <UpcomingMoveCard className="mt-8" />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">Need to make changes?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xs mx-auto">
            <Link
              to="/edit-move-request"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm font-medium"
            >
              Edit Move Request
            </Link>
            <Link
              to="/cancel-move"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm font-medium"
            >
              Cancel Move
            </Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default QuickActions;
