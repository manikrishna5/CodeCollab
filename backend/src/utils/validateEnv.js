const requiredEnvVariables = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "CLIENT_URL",
];

const validateEnvironment = () => {
  const missing = requiredEnvVariables.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    console.error("❌ Missing Environment Variables:");
    missing.forEach((variable) => console.error(`- ${variable}`));

    process.exit(1);
  }
};

module.exports = validateEnvironment;