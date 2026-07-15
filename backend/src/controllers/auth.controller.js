const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } =
    await authService.loginUser(req.body);

  const options = {
    httpOnly: true,
    secure: false,
  };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      message: "Login Successful",
      accessToken,
      user,
    });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user._id);

  res
    .clearCookie("refreshToken")
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  const accessToken =
    await authService.refreshAccessToken(token);

  res.status(200).json({
    success: true,
    accessToken,
  });
});

module.exports = {
  register,
    login,
    getCurrentUser,
    logout,
    refreshToken,
};