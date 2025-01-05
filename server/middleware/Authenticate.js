export const verifyJWT = async (request, reply) => {
  try {
    // Check if headers and authorization exist
    const authorizationHeader = request.headers?.authorization;


    // Try to get the token from the cookies or from the authorization header
    const token = request.cookies?.loginToken || (authorizationHeader ? authorizationHeader.split(" ")[1] : null);

    if (!token) {
      return reply.code(401).send({ message: "Token is required" });
    }

    // Verify and decode the token using the Fastify JWT plugin
    try {
      const decoded = await request.server.jwt.verify(token); // Decode the token
      request.user = decoded; // Attach the decoded user info to the request object
    } catch (err) {
      console.error("JWT verification failed:", err);
      return reply.code(401).send({ message: "Invalid or expired token" });
    }
  } catch (err) {
    console.error("Error verifying token:", err);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
};

// Function to decode the token without verifying
export const decodeJWT = (server, token) => {
  try {
    // Decode the token using Fastify JWT plugin's decode method
    const decoded = server.jwt.decode(token); // Use decode instead of verify for no verification

    return decoded; // Return the decoded token
  } catch (err) {
    console.error("Error decoding token:", err); // Log any errors that occur during decoding
    throw new Error("Token decoding failed"); // Throw a custom error if decoding fails
  }
};
