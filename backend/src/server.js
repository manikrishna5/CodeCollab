require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");
const validateEnvironment = require("./utils/validateEnv");

validateEnvironment();


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🚀 Server Running`);
    console.log(`🌍 http://localhost:${PORT}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  });
};

startServer().catch((error) => {
  console.error("❌ Failed to start server");
  console.error(error);
  process.exit(1);
});