import apiService from "../services/apiServices";
import Cookies from "js-cookie"; // For client-side cookie management
import {fetchAuthTokenAndUser} from '../auth/functions/fetchUser'
// Function to handle login action
export const loginUser = async (dispatch, credentials, router) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    // Ensure the credentials are sent as JSON
    const response = await apiService.post(
      "/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json", // Ensure the request is sent as JSON
        },
      }
    );

    // Destructure the response data to get the user and token
    const { user, token } = response.data;

    // Store token in cookies using js-cookie
    Cookies.set("loginToken", token, { expires: 1, secure: true, sameSite: "None" });

    // Dispatch the action with user data and token
    dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });

    // Now that login is successful, call fetchUser to load the full user details
    fetchUser(dispatch, token); // Fetch the user details using the token

    // Redirect to the dashboard after successful login
    router.push("/auth/dashboard");
  } catch (error) {
    console.error("Login Error:", error);

    // Dispatch failure action with error details
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch({ type: "LOGIN_FAILURE", error: errorMessage });
  }
};


export const logoutUser = async (dispatch) => {
  dispatch({ type: "LOGOUT_REQUEST" });

  try {
    // Send a POST request to the /logout endpoint
    const response = await apiService.post(
      "/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Remove the JWT cookie from the client-side
    Cookies.remove("loginToken", { path: "/", sameSite: "None", secure: true });

    // Dispatch the logout action to update the global state
    dispatch({ type: "LOGOUT" });

    console.log(response.data.message); // Optionally log the response message from the backend
  } catch (error) {
    console.error("Logout Error:", error);

    // Dispatch failure action with error details
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: "LOGOUT_FAILURE", error: errorMessage });
  }
};


export const fetchUser = async (dispatch, token) => {
  dispatch({ type: "USER_FETCH_REQUEST" });

  try {
    // If no token is passed, log an error and return
    if (!token) {
      console.log("No token found. User is not authenticated.");
      return;
    }

    // Call the fetchAuthTokenAndUser function to get user data
    const user = await fetchAuthTokenAndUser(token);

    // Dispatch success action with user data
    dispatch({ type: "USER_FETCH_SUCCESS", payload: user });

  } catch (error) {
    console.error("Fetch User Error:", error);

    // Dispatch failure action with error details
    const errorMessage = error.message;
    dispatch({ type: "USER_FETCH_FAILURE", error: errorMessage });

    // Just log the error instead of redirecting
    console.log("Failed to fetch user data:", errorMessage);
  }
};
