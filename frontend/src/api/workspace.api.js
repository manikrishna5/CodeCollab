import api from "./axios";

export const getUserWorkspaces = async () => {
  const res = await api.get("/workspaces");
  return res.data;
};

export const createWorkspace = async (data) => {
  const res = await api.post("/workspaces", data);
  return res.data;
};

export const deleteWorkspace = async (workspaceId) => {
  const res = await api.delete(`/workspaces/${workspaceId}`);
  return res.data;
};

export const getWorkspaceTree = async (workspaceId) => {
  const res = await api.get(`/workspaces/${workspaceId}/tree`);
  return res.data;
};