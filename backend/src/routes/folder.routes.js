const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createFolder,
} = require("../controllers/folder.controller");

router.post("/", protect, createFolder);

module.exports = router;