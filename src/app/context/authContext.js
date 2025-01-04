"use client"; // Marking this as a client-side component

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { setAuthToken, isTokenExpired, removeAuthToken } from '../../utils/authUtil';
import { loginUser, logoutUser, fetchUser } from './authAction';
import apiService from '../services/apiServices';
import authReducer from './authReducer';

// Create and export AuthContext
export const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const cookies = parseCookies(); // Parse cookies
    const token = cookies.loginToken; // Get token named 'jwt'

    if (token) {
      // Token exists, check if it is expired
      if (isTokenExpired(token)) {
        console.log("Token expired");
        logoutUser(dispatch); // Logout if token is expired
      } else {
        // Token is valid, fetch user data
        fetchUser(dispatch); // Fetch the user only once here
      }
    } else {
      console.log("Token not found");
      // If no token is found, don't trigger logout here; just avoid fetching user
    }
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        dispatch,
        login: loginUser,
        fetchUser: fetchUser,
        logout: () => {
          logoutUser(dispatch); // Only manually logout when needed
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
