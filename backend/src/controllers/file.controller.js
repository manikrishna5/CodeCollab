const fileService = require("../services/file.service");
const asyncHandler = require("../utils/asyncHandler");

const createFile = asyncHandler(async (req, res) => {
  const file = await fileService.createFile(
    req.body,
    req.user._id
  );

  res.status(201).json({
    success: true,
    message: "File Created Successfully",
    data: file,
  });
});

const updateFileContent = asyncHandler(async (req, res) => {
  const file = await fileService.updateFileContent(
    req.params.fileId,
    req.body.content,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "File Updated Successfully",
    data: file,
  });
});

const getFileById = asyncHandler(async (req, res) => {
  const file = await fileService.getFileById(
    req.params.fileId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    data: file,
  });
});

module.exports = {
  createFile,
  updateFileContent,
  getFileById,
};