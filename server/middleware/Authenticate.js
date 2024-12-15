// verifyJWT.js

export const verifyJWT = async (request, reply) => {
  try {
    // Try to get the token from the request
    const token = request.cookies.jwt || request.headers.authorization?.split(" ")[1];
    console.log("token", token)
    if (!token) {
      return reply.code(401).send({ message: "Token is required" });
    }

    // Verify and decode the token using the Fastify JWT plugin
    try {
      const decoded = await request.server.jwt.verify(token);
      request.user = decoded; // Attach the decoded user info to the request object
      return true;
    } catch (err) {
      console.error("JWT verification failed:", err);
      return reply.code(401).send({ message: "Invalid or expired token" });
    }
  } catch (err) {
    console.error("Error verifying token:", err);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
};
