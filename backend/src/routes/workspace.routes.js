const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
  updateEditor,
} = require("../controllers/workspace.controller");

router.post("/", protect, createWorkspace);
router.get("/", protect, getUserWorkspaces);
router.get("/:workspaceId", protect, getWorkspaceById);
router.put("/:workspaceId", protect, updateWorkspace);
router.delete("/:workspaceId", protect, deleteWorkspace);
router.post(
  "/:workspaceId/invite",
  protect,
  inviteMember
);
router.put(
  "/:workspaceId/editor",
  protect,
  updateEditor
);

module.exports = router;