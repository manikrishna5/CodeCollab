const express = require("express");

const {
  register,
  login,
  getCurrentUser,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getCurrentUser);

router.post("/logout", protect, logout);

router.post("/refresh-token", refreshToken);

module.exports = router;