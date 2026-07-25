import api from "./axios";

export const getWorkspaces = () =>
  api.get("/workspaces");

export const getWorkspace = (id) =>
  api.get(`/workspaces/${id}`);

export const createWorkspace = (data) =>
  api.post("/workspaces", data);

export const updateWorkspace = (id, data) =>
  api.put(`/workspaces/${id}`, data);

export const deleteWorkspace = (id) =>
  api.delete(`/workspaces/${id}`);

export const inviteMember = (id, data) =>
  api.post(`/workspaces/${id}/invite`, data);