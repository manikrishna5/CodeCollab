const express = require("express");

const { register,login,getCurrentUser,logout,refreshToken } = require("../controllers/auth.controller");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getCurrentUser);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

module.exports = router;