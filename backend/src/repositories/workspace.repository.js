const Workspace = require("../models/workspace.model");

const createWorkspace = async (workspaceData) => {
  return await Workspace.create(workspaceData);
};

const getUserWorkspaces = async (userId) => {
  return await Workspace.find({
    "members.user": userId,
  })
    .populate("owner", "fullName username email")
    .populate("members.user", "fullName username email");
};

const findWorkspaceById = async (workspaceId) => {
  return await Workspace.findById(workspaceId)
    .populate("owner", "fullName username email")
    .populate("members.user", "fullName username email");
};

const updateWorkspace = async (workspaceId, updateData) => {
  return await Workspace.findByIdAndUpdate(
    workspaceId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("owner", "fullName username email")
    .populate("members.user", "fullName username email");
};

const deleteWorkspace = async (workspaceId) => {
  return await Workspace.findByIdAndDelete(workspaceId);
};

const isWorkspaceMember = async (workspaceId, userId) => {
  return await Workspace.findOne({
    _id: workspaceId,
    "members.user": userId,
  });
};

module.exports = {
  createWorkspace,
  getUserWorkspaces,
  findWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  isWorkspaceMember,
};