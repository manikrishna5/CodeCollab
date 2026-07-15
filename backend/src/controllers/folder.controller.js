const folderService = require("../services/folder.service");
const asyncHandler = require("../utils/asyncHandler");

const createFolder = asyncHandler(async (req, res) => {
  const folder = await folderService.createFolder(
    req.body,
    req.user._id
  );

  res.status(201).json({
    success: true,
    message: "Folder Created Successfully",
    data: folder,
  });
});

module.exports = {
  createFolder,
};