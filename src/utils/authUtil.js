import * as jose from 'jose';
import Cookies from 'js-cookie';
import axios from 'axios';

// Set the JWT token in cookies and Axios headers
export const setAuthToken = (token) => {
  try {
    if (token) {
      // Set token in Axios headers for API requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Set token in a cookie (with 'SameSite' set to 'None' for cross-site requests)
      Cookies.set('loginToken', token, { 
        path: '/', 
        sameSite: 'None', 
        secure: true,
        expires: 7 // Set token expiration if needed (e.g., 7 days)
      });
      console.log('JWT token set in cookies and headers', token);
    } else {
      // Remove token from headers and cookie if no token is provided
      delete axios.defaults.headers.common['Authorization'];
      Cookies.remove('loginToken', { path: '/' });
      console.log('JWT token removed from cookies and headers');
    }
  } catch (error) {
    console.error('Error setting JWT token:', error);
  }
};

// Get the JWT token from cookies
export const getAuthToken = () => {
  try {
    const token = Cookies.get('loginToken');
    if (token) {
    } else {
      console.warn('No JWT token found in cookies');
    }
    return token;
  } catch (error) {
    console.error('Error retrieving JWT token from cookies:', error);
    return null;
  }
};

// Check if the token is expired using jose
export const isTokenExpired = (token) => {
  try {
    if (!token) {
      console.warn('Token is null or undefined');
      return true; // Token is expired or invalid
    }

    const { exp } = jose.decodeJwt(token); // Decode the token using jose
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return exp < currentTime; // Return true if the token is expired
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // If token is invalid or unable to decode, return true (expired)
  }
};

// Remove the JWT token (client-side)
export const removeAuthToken = () => {
  try {
    Cookies.remove('loginToken', { path: '/' });
    delete axios.defaults.headers.common['Authorization'];
    console.log('JWT token removed from cookies and headers');
  } catch (error) {
    console.error('Error removing JWT token:', error);
  }
};

// Decode the JWT token using jose
export const decodeToken = (token) => {
  try {
    if (!token) {
      console.warn('Token is null or undefined');
      return null; // Token is invalid or missing
    }
    const decoded = jose.decodeJwt(token); // Decodes the JWT token and returns its payload
    console.log('Decoded token:', decoded);
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null; // If decoding fails, return null
  }
};
