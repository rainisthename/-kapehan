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

  export const createShop = async (shopData) => {
    try {
      // Make the POST request with the shop data (FormData object)
      const response = await apiService.post("/shops/create", shopData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the request is sent as FormData
        },
      });
  
      // Extract shop data safely
      const shop = response.data?.shop || null;
  
      // Return the shop data or confirmation
      return shop;
    } catch (error) {
      console.error("Error creating shop:", error);
  
      // Throw an error with a meaningful message
      throw new Error(
        error.response?.data?.message || "An error occurred while creating the shop."
      );
    }
  };
  