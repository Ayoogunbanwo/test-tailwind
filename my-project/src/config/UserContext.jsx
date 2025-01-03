import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Adjust this import to match your Firebase setup

// Create a context for user-related data
export const UserContext = createContext();

// Initialize Firebase auth
const auth = getAuth();

// Default form data structure
const defaultFormData = {
  firstName: "",
  lastName: "",
  email: "",
  address: {
    apartment: "",
    country: "",
    province: "",
    street: "",
  },
  phone: "",
  role: "",
  createdAt: "",
  uid: "",
};

// UserProvider component to manage user state and data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state/ Firebase user object
  const [accessToken, setAccessToken] = useState(null); // Firebase access token
  const [formData, setFormData] = useState(defaultFormData); // User profile data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data from Firestore
  const fetchUserData = useCallback(async (uid) => {
    try {
      const userDoc = doc(db, "users", uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          address: {
            apartment: userData.address?.apartment || "",
            country: userData.address?.country || "",
            province: userData.address?.province || "",
            street: userData.address?.street || "",
          },
          phone: userData.phone || "",
          role: userData.role || "",
          createdAt: userData.createdAt || "",
          uid: userData.uid || "",
        });
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  // Update formData with new data
  const updateFormData = useCallback((newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  }, []);

  // Save move data to Firestore
  const saveMoveDataToFirestore = useCallback(async (moveData, user, moveId = null) => {
    if (!user || !user.uid) throw new Error("Invalid user data");
    if (!moveData || typeof moveData !== "object") throw new Error("Invalid move data");

    const moveRef = moveId ? doc(db, "Movedata", moveId) : doc(collection(db, "Movedata"));
    const newMoveId = moveRef.id;

    const moveDataToSave = {
      moveId: newMoveId,
      userId: user.uid,
      fromLocation: moveData.from,
      toLocation: moveData.to,
      moveDate: moveData.date,
      moveTime: moveData.time,
      typeOfMove: moveData.movetype,
      vehicleRequired: moveData.vehiclereq,
      hoursOfService: moveData.reqhours,
      moverRequired: moveData.moverreq,
      moverHours: moveData.moverreqhours,
      additionalServices: moveData.addservicereq,
      specialInstructions: moveData.specialinst,
      inventoryList: moveData.inventorylist,
      insuranceRequired: moveData.insurancereq,
      timingPreferences: moveData.timingpref,
      accessDetails: moveData.accessdetails,
      packingSupplies: moveData.packingsupplies,
      petOrPlantDetails: moveData.petplantdetails,
      budgetRange: moveData.budgetrange,
      contactName: moveData.contactname,
      contactPhone: moveData.contactphone,
      contactEmail: moveData.contactemail,
      paymentPreferences: moveData.paymentpreferences,
      followUpServices: moveData.followupservices,
      indemnityAgreement: moveData.indemnityagreement,
      timestamp: new Date(),
    };

    try {
      await setDoc(moveRef, moveDataToSave, { merge: true });
      console.log("Move data saved/updated in Firestore:", moveDataToSave);
      return newMoveId;
    } catch (error) {
      console.error("Error saving/updating move data in Firestore:", error);
      throw new Error("Failed to save/update move data in Firestore");
    }
  }, []);

  // Delete move data from Firestore
  const deleteMoveDataFromFirestore = useCallback(async (moveId) => {
    if (!moveId) throw new Error("Invalid moveId");

    try {
      const moveRef = doc(db, "Movedata", moveId);
      await deleteDoc(moveRef);
      console.log("Move data deleted from Firestore for moveId:", moveId);
      return true;
    } catch (error) {
      console.error("Error deleting move data from Firestore:", error);
      throw new Error("Failed to delete move data from Firestore");
    }
  }, []);

  // Listen for authentication state changes
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
          fetchUserData(firebaseUser.uid); // Fetch user data after login
        } catch (error) {
          console.error("Failed to fetch access token:", error);
        }
      } else {
        setUser(null);
        setAccessToken(null);
        setFormData(defaultFormData); // Reset form data on logout
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [fetchUserData]);

  // Memoized context value to optimize performance
  const contextValue = useMemo(
    () => ({
      user,
      accessToken,
      formData,
      loading,
      updateFormData,
      fetchUserData,
      saveMoveDataToFirestore,
      deleteMoveDataFromFirestore,
    }),
    [
      user,
      accessToken,
      formData,
      loading,
      updateFormData,
      fetchUserData,
      saveMoveDataToFirestore,
      deleteMoveDataFromFirestore,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};