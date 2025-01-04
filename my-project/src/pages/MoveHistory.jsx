import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import {useUser} from "../config/hooks/useUser";
import { collection, query, where, getDocs } from 'firebase/firestore';

const MoveDetailsPage = () => {
    const user = useUser();
    const [moveDetails, setMoveDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.user && user.user.uid) {
            const fetchMoveDetails = async () => {
                try {
                    const movesCollection = collection(db, 'Movedata');
                    const q = query(movesCollection, where('uid', '==', user.user.uid));
                    const querySnapshot = await getDocs(q);

                    const uniqueMoves = new Set();
                    const details = [];

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        const key = `${data.uid}_${data.date}_${data.price}`;
                        if (!uniqueMoves.has(key)) {
                            uniqueMoves.add(key);
                            details.push(data);
                        }
                    });

                    setMoveDetails(details);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };

            fetchMoveDetails();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return <p className="text-center text-gray-600">Loading user data...</p>;
    }

    if (loading) {
        return <p className="text-center text-gray-600">Loading move details...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                {/* Link back to Dashboard */}
                <a href="/CustomerDashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    &larr; Back to Dashboard
                </a>

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Move Details</h1>
                {moveDetails.length === 0 ? (
                    <p className="text-center text-gray-600">No move details found.</p>
                ) : (
                    <div className="space-y-4">
                        {moveDetails.map((move, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-blue-600">Move Details</h3>
                                <p className="text-gray-700"><strong>Date:</strong> {move.date}</p>
                                <p className="text-gray-700"><strong>Price:</strong> ${move.price}</p>
                                <p className="text-gray-700"><strong>From:</strong> {move.from}</p>
                                <p className="text-gray-700"><strong>To:</strong> {move.to}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoveDetailsPage;