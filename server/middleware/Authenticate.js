async function authenticate(request, reply) {
  try {
    await request.jwtVerify();  // Automatically verifies the JWT using fastify-jwt

    // Optionally, check the role or permissions if needed
    if (request.user.role !== "admin") {
      return reply.code(403).send({ message: "Forbidden" });  // Using reply.code() correctly here
    }
  } catch (err) {
    return reply.code(401).send({ message: "Unauthorized" });  // Using reply.code() correctly here
  }
}

export default authenticate;
