const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createFile,
} = require("../controllers/file.controller");

router.post("/", protect, createFile);

module.exports = router;