const authRepository = require("../repositories/auth.repository");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const { fullName, username, email, password } = userData;

  const existingEmail = await authRepository.findUserByEmail(email);

  if (existingEmail) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const existingUsername = await authRepository.findUserByUsername(
    username
  );

  if (existingUsername) {
    const error = new Error("Username already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = await authRepository.createUser({
    fullName,
    username,
    email,
    password,
  });

  const createdUser = await authRepository.findUserById(user._id);

    createdUser.password = undefined;
    createdUser.refreshToken = undefined;

    return createdUser;
};

const loginUser = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await authRepository.saveUser(user);

  user.password = undefined;
  user.refreshToken = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const logoutUser = async (userId) => {
  await authRepository.clearRefreshToken(userId);
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh Token Missing");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
  );

  const user = await authRepository.findUserById(decoded.userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  if (user.refreshToken !== refreshToken) {
    const error = new Error("Invalid Refresh Token");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = user.generateAccessToken();

  return accessToken;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};