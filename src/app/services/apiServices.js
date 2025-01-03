import axios from 'axios';
import { getAuthToken } from '../../utils/authUtil';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/', // Replace with your API URL
  withCredentials: true,  // Ensures cookies are sent with the request
});

// Add an interceptor to include the token in each request header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Get token from cookies
    console.log("Token being sent:", token); // Log token for verification
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
