import bcrypt from "bcrypt";
import User from "../lib/userModel.js"; // Assuming User model is imported correctly

export const loginUser = async (request, reply) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply
        .code(400)
        .send({ message: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.code(401).send({ message: "Invalid credentials" });
    }

    // Generate access token (expires in 20 minutes)
    const accessToken = request.server.jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      { expiresIn: "20m" } // Access token expires in 20 minutes
    );

    // Generate refresh token (expires in 20 minutes)
    const refreshToken = request.server.jwt.sign(
      { username: user.username },
      { expiresIn: "20m" } // Refresh token also expires in 20 minutes
    );

    // Set the refresh token in a cookie (expires in 20 minutes)
    reply.setCookie("jwt", refreshToken, {
      httpsOnly: true, // Makes the cookie accessible only by the web server
      sameSite: "Lax", // You can adjust this as per your requirements
      maxAge: 20 * 60 * 1000, // Cookie expires in 20 minutes (in milliseconds)
    });

    // Send the access token back in the response body
    return reply.send({ token: accessToken });
  } catch (err) {
    console.error("Login error:", err);
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
    console.error("Error creating user:", err);
    reply.code(500).send({ message: "Server error" });
  }
};

// logoutController.js

// logoutController.js
export const logoutUser = async (request, reply) => {
  try {
    // Check if the JWT cookie exists
    if (request.cookies && request.cookies.jwt) {
      // Clear the JWT cookie on the client side
      reply.clearCookie("jwt", {
        httpsOnly: true, // Ensure the cookie is only accessible via HTTP (not JavaScript)
        sameSite: "Lax", // SameSite policy (adjust as needed)
        path: "/api/v1", // Make sure the path is consistent with where the cookie was set
      });

      return reply.send({ message: "Logged out successfully" });
    } else {
      // If there's no JWT cookie, send a message saying the user is not logged in
      return reply.code(400).send({ message: "No active session found" });
    }
  } catch (err) {
    console.error("Logout error:", err);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
};
