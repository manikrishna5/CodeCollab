import api from "./axios";

export const saveEditor = (workspaceId, data) =>
  api.put(
    `/workspaces/${workspaceId}/editor`,
    data
  );