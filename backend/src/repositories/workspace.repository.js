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

const addMember = async (workspaceId, member) => {
  return await Workspace.findByIdAndUpdate(
    workspaceId,
    {
      $push: {
        members: member,
      },
    },
    {
      new: true,
    }
  )
    .populate("owner", "fullName username email")
    .populate("members.user", "fullName username email");
};

const updateEditor = async (workspaceId, code, language) => {
  return await Workspace.findByIdAndUpdate(
    workspaceId,
    {
      code,
      language,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};
const findWorkspaceByCode = async (workspaceCode) => {
  return await Workspace.findOne({ workspaceCode })
    .populate("owner", "fullName username email")
    .populate("members.user", "fullName username email");
};

const addViewer = async (workspaceId, userId) => {
  return await Workspace.findByIdAndUpdate(
    workspaceId,
    {
      $push: {
        members: {
          user: userId,
          role: "Viewer",
        },
      },
    },
    {
      new: true,
    }
  )
    .populate("owner", "fullName username email")
    .populate("members.user", "fullName username email");
};
const updateMemberRole = async (
  workspaceId,
  memberId,
  role
) => {

  return await Workspace.findOneAndUpdate(
    {
      _id: workspaceId,
      "members.user": memberId,
    },
    {
      $set: {
        "members.$.role": role,
      },
    },
    {
      new: true,
    }
  )
    .populate("owner", "fullName username email")
    .populate("members.user", "fullName username email");

};
const getWorkspaceMembers = async (workspaceId) => {

  const workspace = await Workspace.findById(workspaceId)
    .populate("members.user", "fullName username email");

  return workspace.members;

};
module.exports = {
  createWorkspace,
  getUserWorkspaces,
  findWorkspaceById,
  findWorkspaceByCode,
  addViewer,
  updateWorkspace,
  updateEditor,
  deleteWorkspace,
  isWorkspaceMember,
  addMember,
  updateMemberRole,
  getWorkspaceMembers,
};