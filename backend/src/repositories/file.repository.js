const File = require("../models/file.model");

const createFile = async (fileData) => {
  return await File.create(fileData);
};

const findFileByName = async (workspaceId, folder, name) => {
  return await File.findOne({
    workspace: workspaceId,
    folder,
    name,
  });
};

const getFilesByWorkspace = async (workspaceId) => {
  return await File.find({
    workspace: workspaceId,
  }).lean();
};

module.exports = {
  createFile,
  findFileByName,
    getFilesByWorkspace,
};