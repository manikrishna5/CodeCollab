const folderRepository = require("../repositories/folder.repository");
const workspaceRepository = require("../repositories/workspace.repository");

const createFolder = async (folderData, userId) => {
  const { workspaceId, parentFolder, name } = folderData;

  const existingFolder = await folderRepository.findFolderByName(
    workspaceId,
    parentFolder,
    name
  );
  const workspace = await workspaceRepository.isWorkspaceMember(
  workspaceId,
  userId
);

if (!workspace) {
  const error = new Error("You are not a member of this workspace");
  error.statusCode = 403;
  throw error;
}

  if (existingFolder) {
    const error = new Error("Folder already exists");
    error.statusCode = 409;
    throw error;
  }

  return await folderRepository.createFolder({
    name,
    workspace: workspaceId,
    parentFolder,
    createdBy: userId,
  });
};



module.exports = {
  createFolder,
};