"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(!!storedAuth);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isAuthenticated) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        localStorage.removeItem("isAuthenticated");
      }
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider.");

  return context;
}

export { AuthProvider, useAuth };
