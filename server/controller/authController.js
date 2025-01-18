import bcrypt from "bcrypt";
import User from "../lib/userModel.js"; // Assuming User model is imported correctly
import { verifyJWT, decodeJWT } from "../middleware/Authenticate.js";

export const loginUser = async (request, reply) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply
        .code(400)
        .send({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return reply.code(401).send({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.code(401).send({ message: "Invalid username or password" });
    }

    const accessToken = request.server.jwt.sign(
      { userId: user._id.toString(), role: user.role }, // Store userId as a string
      { expiresIn: "1d" }
    );

    const refreshToken = request.server.jwt.sign(
      { username: user.username },
      { expiresIn: "7d" }
    );

    reply.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None", // SameSite policy (adjust as needed)
      path: "/", // Make the cookie available to all routes
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    return reply.send({ token: accessToken });
  } catch (err) {
    console.log("Login error:", err);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
};

// Controller to handle user registration
export const registerUser = async (request, reply) => {
  const { username, password, email } = request.body;

  // Basic validation
  if (!username || !password || !email) {
    return reply.code(400).send({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return reply
        .code(409)
        .send({ message: "Username or Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    // Respond with a success message (don't return the password)
    reply.code(201).send({ message: "User created successfully" });
  } catch (err) {
    console.log("Error creating user:", err);
    reply.code(500).send({ message: "Server error" });
  }
};

// logoutController.js

// logoutController.js
export const logoutUser = async (request, reply) => {
  try {
    // Check if the JWT and refreshToken cookies exist
    if (
      request.cookies &&
      (request.cookies.loginToken || request.cookies.refreshToken)
    ) {
      // Clear the JWT cookie on the client side
      reply.clearCookie("jwt", {
        httpOnly: true, // Ensure the cookie is only accessible via HTTP (not JavaScript)
        sameSite: "None", // Allow cross-site cookies
        secure: true, // Required for SameSite: None
        path: "/", // Make sure the path is consistent with where the cookie was set
      });

      // Clear the refreshToken cookie on the client side
      reply.clearCookie("refreshToken", {
        httpOnly: true, // Ensure the cookie is only accessible via HTTP (not JavaScript)
        sameSite: "None", // Allow cross-site cookies
        secure: true, // Required for SameSite: None
        path: "/", // Make sure the path is consistent with where the cookie was set
      });

      return reply.send({ message: "Logged out successfully" });
    } else {
      // If there's no JWT or refreshToken cookie, send a message saying the user is not logged in
      return reply.code(400).send({ message: "No active session found" });
    }
  } catch (err) {
    console.log("Logout error:", err);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
};

export const fetchUser = async (request, reply) => {
  try {
    // Extract the loginToken from the Authorization header or cookies
    const loginToken =
      request.headers["authorization"]?.split(" ")[1] ||
      request.cookies?.loginToken;

    if (!loginToken) {
      return reply.status(400).send({
        success: false,
        message: "No token provided",
      });
    }

    // Verify and decode the token
    const decodedToken = decodeJWT(request.server, loginToken);
    if (!decodedToken) {
      console.log(
        "Token verification failed, decodedToken is null or undefined"
      );
      return reply.status(401).send({
        success: false,
        message: "Invalid or expired token",
      });
    }
    if (!decodedToken.userId) {
      console.log("Decoded token does not contain userId:", decodedToken);
      return reply.status(401).send({
        success: false,
        message: "Invalid token structure: Missing userId",
      });
    }

    console.log("Decoded userId:", decodedToken.userId); // Log the userId from the decoded token

    // Find the user based on the userId from the decoded token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      console.log("User not found with ID:", decodedToken.userId);
      return reply.status(404).send({
        success: false,
        message: "User not found",
        id: decodedToken.userId,
      });
    }

    // Send the user details in the response
    return reply.send({
      success: true,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error occurred:", error); // Log the full error message
    return reply.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};
