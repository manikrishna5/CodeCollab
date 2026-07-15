const workspaceService = require("../services/workspace.service");
const asyncHandler = require("../utils/asyncHandler");

const createWorkspace = asyncHandler(async (req, res) => {
  console.log(req.user);
  const workspace = await workspaceService.createWorkspace(
    req.body,
    req.user._id
  );

  res.status(201).json({
    success: true,
    message: "Workspace Created Successfully",
    data: workspace,
  });
});

const getUserWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await workspaceService.getUserWorkspaces(
    req.user._id
  );

  res.status(200).json({
    success: true,
    count: workspaces.length,
    data: workspaces,
  });
});
const getWorkspaceById = asyncHandler(async (req, res) => {
  const workspace = await workspaceService.getWorkspaceById(
    req.params.workspaceId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    data: workspace,
  });
});

const updateWorkspace = asyncHandler(async (req, res) => {
  const workspace =
    await workspaceService.updateWorkspace(
      req.params.workspaceId,
      req.body,
      req.user._id
    );

  res.status(200).json({
    success: true,
    message: "Workspace Updated Successfully",
    data: workspace,
  });
});

const deleteWorkspace = asyncHandler(async (req, res) => {
  await workspaceService.deleteWorkspace(
    req.params.workspaceId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Workspace Deleted Successfully",
  });
});

const getWorkspaceTree = asyncHandler(async (req, res) => {
  const data = await workspaceService.getWorkspaceTree(
    req.params.workspaceId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    data,
  });
});

module.exports = {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceTree,
};