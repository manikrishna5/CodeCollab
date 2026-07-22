import api from "./axios";

export const getFileById = async (fileId) => {
  const response = await api.get(`/files/${fileId}`);
  return response.data;
};

export const updateFileContent = async (fileId, content) => {
  const response = await api.put(`/files/${fileId}/content`, {
    content,
  });

  return response.data;
};