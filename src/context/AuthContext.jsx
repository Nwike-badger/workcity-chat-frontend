// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);
  const [user, setUser] = useState(() => {
    try {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : null;
    } catch {
        return null;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [token]);

  const login = (newToken, newUser) => {
    localStorage.setItem("jwtToken", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  const authValue = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);