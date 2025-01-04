import { useContext } from "react";
import { UserContext } from '../UserContext';  // Going up one level to config folder

const UseUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default UseUser;