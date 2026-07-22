const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createFile,
  updateFileContent.
  getFileById,
} = require("../controllers/file.controller");

router.post("/", protect, createFile);
router.put(
  "/:fileId/content",
  protect,
  updateFileContent
);
router.get(
  "/:fileId",
  protect,
  getFileById
);

module.exports = router;