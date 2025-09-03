'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AUTH_STATE_KEY = 'arogya_care_auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage on initial load
    const storedAuthState = sessionStorage.getItem(AUTH_STATE_KEY);
    if (storedAuthState === 'true') {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    sessionStorage.setItem(AUTH_STATE_KEY, 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_STATE_KEY);
    setIsLoggedIn(false);
  };

  // Prevent rendering children until the auth state has been determined from session storage
  // to avoid a flicker of the login/logout button.
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
