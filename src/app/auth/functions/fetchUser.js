import apiService from '../../services/apiServices';

export const fetchAuthTokenAndUser = async (token) => {
    try {
      // Set the token in the request headers
      apiService.defaults.headers["Authorization"] = `Bearer ${token}`;
  
      // Make the API request to fetch user data
      const response = await apiService.post("/user");
  
      // Destructure the response data to get the user data
      return response.data.user; // Return the user data
  
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data.");
    }
  };
  