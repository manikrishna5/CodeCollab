const Folder = require("../models/folder.model");

const createFolder = async (folderData) => {
  return await Folder.create(folderData);
};

const findFolderByName = async (workspaceId, parentFolder, name) => {
  return await Folder.findOne({
    workspace: workspaceId,
    parentFolder,
    name,
  });
};

const getFoldersByWorkspace = async (workspaceId) => {
  return await Folder.find({
    workspace: workspaceId,
  }).lean();
};

module.exports = {
  createFolder,
  findFolderByName,
    getFoldersByWorkspace,
};