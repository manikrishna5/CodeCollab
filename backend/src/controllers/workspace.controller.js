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

const updateEditor = asyncHandler(async (req, res) => {

  const workspace =
    await workspaceService.updateEditor(
      req.params.workspaceId,
      req.body,
      req.user._id
    );

  res.status(200).json({
    success: true,
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


const inviteMember = asyncHandler(async (req, res) => {

  const { email, role } = req.body;

  const workspace =
    await workspaceService.inviteMember(
      req.params.workspaceId,
      email,
      role,
      req.user._id
    );

  res.status(200).json({
    success: true,
    message: "Member Invited Successfully",
    data: workspace,
  });

});

const joinWorkspace = asyncHandler(async (req, res) => {

  const { workspaceCode } = req.body;

  const workspace =
    await workspaceService.joinWorkspace(
      workspaceCode,
      req.user._id
    );

  res.status(200).json({
    success: true,
    message: "Workspace Joined Successfully",
    data: workspace,
  });

});

const getWorkspaceMembers = asyncHandler(
async (req,res)=>{

const members =
await workspaceService.getWorkspaceMembers(
req.params.workspaceId,
req.user._id
);

res.status(200).json({
success:true,
data:members
});

});
const updateMemberRole = asyncHandler(
async (req,res)=>{

const workspace =
await workspaceService.updateMemberRole(

req.params.workspaceId,

req.params.memberId,

req.body.role,

req.user._id

);

res.status(200).json({
success:true,
message:"Role Updated",
data:workspace
});

});

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