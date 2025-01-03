// lib/corsConfig.js

// List of allowed origins (ensure to specify the full URL including the protocol)
const allowedOrigins = [
  'https://yourtrusteddomain.com', // Replace with your production domain
  'http://localhost:3000', // Local development domain
  'http://localhost:5000', // Your backend domain
];

const corsOptions = {
  origin: allowedOrigins, // Use the list of allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies or authorization headers
  maxAge: 86400, // Cache the CORS preflight response for 24 hours
};

export default corsOptions;
