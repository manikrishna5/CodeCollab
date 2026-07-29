export const createWorkspace = (data) =>
  api.post("/workspaces", data);

export const getWorkspaces = () =>
  api.get("/workspaces");

export const deleteWorkspace = (id) =>
  api.delete(`/workspaces/${id}`);