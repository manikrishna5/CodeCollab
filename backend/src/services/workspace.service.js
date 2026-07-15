const workspaceRepository = require("../repositories/workspace.repository");
const folderRepository = require("../repositories/folder.repository");
const fileRepository = require("../repositories/file.repository");
const authRepository = require("../repositories/auth.repository");

const createWorkspace = async (workspaceData, userId) => {
  console.log("User ID:", userId);

  return await workspaceRepository.createWorkspace({
    ...workspaceData,
    owner: userId,
    members: [
      {
        user: userId,
        role: "Owner",
      },
    ],
  });
};

const getUserWorkspaces = async (userId) => {
  return await workspaceRepository.getUserWorkspaces(userId);
};

const getWorkspaceById = async (workspaceId, userId) => {
  const workspace = await workspaceRepository.findWorkspaceById(workspaceId);

  if (!workspace) {
    const error = new Error("Workspace not found");
    error.statusCode = 404;
    throw error;
  }

  const isMember = workspace.members.some(
    (member) => member.user._id.toString() === userId.toString()
  );

  if (!isMember) {
    const error = new Error("Access Denied");
    error.statusCode = 403;
    throw error;
  }

  return workspace;
};
const updateWorkspace = async (
  workspaceId,
  updateData,
  userId
) => {
  const workspace =
    await workspaceRepository.findWorkspaceById(workspaceId);

  if (!workspace) {
    const error = new Error("Workspace not found");
    error.statusCode = 404;
    throw error;
  }

  if (workspace.owner._id.toString() !== userId.toString()) {
    const error = new Error("Only owner can update workspace");
    error.statusCode = 403;
    throw error;
  }

  return await workspaceRepository.updateWorkspace(
    workspaceId,
    updateData
  );
};

const deleteWorkspace = async (workspaceId, userId) => {
  const workspace = await workspaceRepository.findWorkspaceById(workspaceId);

  if (!workspace) {
    const error = new Error("Workspace not found");
    error.statusCode = 404;
    throw error;
  }

  if (workspace.owner._id.toString() !== userId.toString()) {
    const error = new Error("Only owner can delete workspace");
    error.statusCode = 403;
    throw error;
  }

  await workspaceRepository.deleteWorkspace(workspaceId);
};

const getWorkspaceTree = async (workspaceId, userId) => {
  const workspace =
    await workspaceRepository.findWorkspaceById(workspaceId);

  if (!workspace) {
    const error = new Error("Workspace not found");
    error.statusCode = 404;
    throw error;
  }

  const isMember = workspace.members.some(
    (member) => member.user._id.toString() === userId.toString()
  );

  if (!isMember) {
    const error = new Error("Access Denied");
    error.statusCode = 403;
    throw error;
  }

  const folders =
    await folderRepository.getFoldersByWorkspace(workspaceId);

  const files =
    await fileRepository.getFilesByWorkspace(workspaceId);

  return {
    workspace,
    folders,
    files,
  };
};

const inviteMember = async (
  workspaceId,
  email,
  role,
  currentUserId
) => {

  const workspace =
    await workspaceRepository.findWorkspaceById(workspaceId);

  if (!workspace) {
    const error = new Error("Workspace not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    workspace.owner._id.toString() !==
    currentUserId.toString()
  ) {
    const error = new Error("Only owner can invite");
    error.statusCode = 403;
    throw error;
  }

  const user =
    await authRepository.findUserByEmail(email);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const alreadyMember = workspace.members.some(
    (member) =>
      member.user._id.toString() ===
      user._id.toString()
  );

  if (alreadyMember) {
    const error = new Error("User already a member");
    error.statusCode = 409;
    throw error;
  }

  return await workspaceRepository.addMember(
    workspaceId,
    {
      user: user._id,
      role,
    }
  );
};

module.exports = {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  getWorkspaceTree,
  updateWorkspace,
  deleteWorkspace,
};