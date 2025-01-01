import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Adjust this import to match your Firebase setup

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores Firebase user object
    const [accessToken, setAccessToken] = useState(null); // Stores the Firebase access token
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: {
            street: "",
            apartmentNumber: "",
            province: "",
            country: "",
        },
        phoneNumber: "",
        role: "",
    }); // Stores user profile data
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                });
                try {
                    const token = await firebaseUser.getIdToken();
                    setAccessToken(token);
                    // Fetch user's full profile data after login
                    fetchUserData(firebaseUser.uid);
                } catch (error) {
                    console.error("Failed to fetch access token:", error);
                }
            } else {
                setUser(null);
                setAccessToken(null);
                setFormData({
                    firstName: "",
                    lastName: "",
                    address: {
                        street: "",
                        apartmentNumber: "",
                        province: "",
                        country: "",
                    },
                    phoneNumber: "",
                    role: "",
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    // Function to fetch the user's data from Firestore
    const fetchUserData = useCallback(async (uid) => {
    try {
        const userDoc = doc(db, "users", uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "", // Ensure email is in formData
                address: userData.address || {
                    street: "",
                    apartment: "",
                    province: "",
                    country: "",
                },
                phoneNumber: userData.phone || "",
                role: userData.role || "",
            });
        } else {
            console.log("User document not found");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}, []);

    // Function to update formData
    const updateFormData = useCallback((newData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    }, []);

    const contextValue = useMemo(
        () => ({
            user,
            accessToken,
            formData,
            loading,
            updateFormData,
            fetchUserData
        }),
        [user, accessToken, formData, loading, updateFormData, fetchUserData]
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
