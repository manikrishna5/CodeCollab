import api from "./axios";

// Get all workspaces
export const getWorkspaces = () => {
  return api.get("/workspaces");
};

// Get single workspace
export const getWorkspace = (workspaceId) => {
  return api.get(`/workspaces/${workspaceId}`);
};

// Create workspace
export const createWorkspace = (data) => {
  return api.post("/workspaces", data);
};

// Update workspace
export const updateWorkspace = (workspaceId, data) => {
  return api.put(`/workspaces/${workspaceId}`, data);
};

// Delete workspace
export const deleteWorkspace = (workspaceId) => {
  return api.delete(`/workspaces/${workspaceId}`);
};

// Invite member
export const inviteMember = (workspaceId, data) => {
  return api.post(`/workspaces/${workspaceId}/invite`, data);
};

export const joinWorkspace = (workspaceCode) => {
  return api.post("/workspaces/join", {
    workspaceCode,
  });
};

export const getWorkspaceMembers = (workspaceId) => {
  return api.get(`/workspaces/${workspaceId}/members`);
};

export const updateMemberRole = (
  workspaceId,
  memberId,
  role
) => {
  return api.put(
    `/workspaces/${workspaceId}/member/${memberId}`,
    { role }
  );
};