const fileRepository = require("../repositories/file.repository");
const workspaceRepository = require("../repositories/workspace.repository");

const createFile = async (fileData, userId) => {
  const {
    workspaceId,
    folder,
    name,
    language,
    content,
  } = fileData;

  const workspace = await workspaceRepository.isWorkspaceMember(
    workspaceId,
    userId
  );

  if (!workspace) {
    const error = new Error("You are not a member of this workspace");
    error.statusCode = 403;
    throw error;
  }

  const existingFile = await fileRepository.findFileByName(
    workspaceId,
    folder,
    name
  );

  if (existingFile) {
    const error = new Error("File already exists");
    error.statusCode = 409;
    throw error;
  }

  return await fileRepository.createFile({
    name,
    workspace: workspaceId,
    folder,
    language,
    content,
    createdBy: userId,
  });
};

const updateFileContent = async (
  fileId,
  content,
  userId
) => {
  const file = await fileRepository.findFileById(fileId);

  if (!file) {
    const error = new Error("File not found");
    error.statusCode = 404;
    throw error;
  }

  const workspace = await workspaceRepository.isWorkspaceMember(
    file.workspace,
    userId
  );

  if (!workspace) {
    const error = new Error("Access Denied");
    error.statusCode = 403;
    throw error;
  }

  return await fileRepository.updateFileContent(
    fileId,
    content
  );
};

const findFileById = async (fileId) => {
  return await File.findById(fileId);
};

module.exports = {
  createFile,
  updateFileContent,
  findFileById,
};