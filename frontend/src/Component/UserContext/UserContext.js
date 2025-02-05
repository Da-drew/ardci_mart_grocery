import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const savedSession = Cookies.get("userSession");
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
    setLoading(false); // Once cookie is checked, stop loading
  }, []);

  // Login function to authenticate and set the user
  const login = async (userData) => {
    setUser(userData);
    Cookies.set("userSession", JSON.stringify(userData)); // Set the cookie
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, loading }}>
      {children}
    </UserContext.Provider>
  );
};
