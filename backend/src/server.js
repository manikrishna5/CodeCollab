require("dotenv").config();

const http = require("http");

const app = require("./app");
const connectDatabase = require("./config/database");
const validateEnvironment = require("./utils/validateEnv");
const initializeSocket = require("./sockets");

validateEnvironment();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect MongoDB
  await connectDatabase();

  // Create HTTP Server
  const server = http.createServer(app);

  // Initialize Socket.IO
  initializeSocket(server);

  // Start Server
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("❌ Failed to start server");
  console.error(error);
  process.exit(1);
});