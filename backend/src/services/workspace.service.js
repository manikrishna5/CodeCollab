const workspaceRepository = require("../repositories/workspace.repository");
const authRepository = require("../repositories/auth.repository");

const generateWorkspaceCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "CC-";

    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
};
const createWorkspace = async (workspaceData, userId) => {
  console.log("User ID:", userId);

 return await workspaceRepository.createWorkspace({
    ...workspaceData,

    workspaceCode: generateWorkspaceCode(),

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

const updateEditor = async (
  workspaceId,
  editorData,
  userId
) => {

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

  return await workspaceRepository.updateEditor(
    workspaceId,
    editorData.code,
    editorData.language
  );
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
const joinWorkspace = async (workspaceCode, userId) => {
  const workspace =
    await workspaceRepository.findWorkspaceByCode(workspaceCode);

  if (!workspace) {
    const error = new Error("Invalid Workspace Code");
    error.statusCode = 404;
    throw error;
  }

  const alreadyMember = workspace.members.some(
    (member) => member.user._id.toString() === userId.toString()
  );

  if (alreadyMember) {
    return workspace;
  }

  return await workspaceRepository.addViewer(
    workspace._id,
    userId
  );
};
const getWorkspaceMembers = async (
  workspaceId,
  currentUser
) => {

  const workspace =
    await workspaceRepository.findWorkspaceById(
      workspaceId
    );

  if (!workspace) {
    const error = new Error("Workspace not found");
    error.statusCode = 404;
    throw error;
  }

  const isMember =
    workspace.members.some(
      member =>
        member.user._id.toString() ===
        currentUser.toString()
    );

  if (!isMember) {
    const error = new Error("Access Denied");
    error.statusCode = 403;
    throw error;
  }

  return await workspaceRepository.getWorkspaceMembers(
    workspaceId
  );

};
const updateMemberRole = async (
  workspaceId,
  memberId,
  role,
  currentUser
) => {

  const workspace =
    await workspaceRepository.findWorkspaceById(
      workspaceId
    );

  if (!workspace) {
    const error = new Error("Workspace not found");
    error.statusCode = 404;
    throw error;
  }

  const currentMember = workspace.members.find(
    member =>
      member.user._id.toString() === currentUser.toString()
  );

  if (!currentMember) {
    const error = new Error("Access Denied");
    error.statusCode = 403;
    throw error;
  }

  if (currentMember.role !== "Owner") {
    const error = new Error("Only Owners can change roles");
    error.statusCode = 403;
    throw error;
  }

  // Original creator can never be modified
  if (workspace.owner._id.toString() === memberId) {
    const error = new Error(
      "Creator role cannot be changed"
    );

    error.statusCode = 403;

    throw error;
  }

  return await workspaceRepository.updateMemberRole(
    workspaceId,
    memberId,
    role
  );
};
module.exports = {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
  updateEditor,
  joinWorkspace,
  getWorkspaceMembers,
  updateMemberRole,
};