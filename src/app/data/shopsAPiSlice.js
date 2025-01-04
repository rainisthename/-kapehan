import apiService from "../services/apiServices";

export const getShops = async () => {
    try {
      // Make the request to the /shops endpoint
      const response = await apiService.get("/shops", {
        headers: {
          "Content-Type": "application/json", // Ensure the request is sent as JSON
        },
      });
  
      // Destructure the response to get the shops data
      const { shops } = response.data;
  
      // Return the shops data
      return shops;
  
    } catch (error) {
      console.error("Error fetching shops:", error);
  
      // Return an empty array or an error message as fallback
      return { error: error.response ? error.response.data.message : error.message };
    }
  };
  