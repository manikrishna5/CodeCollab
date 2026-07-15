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

module.exports = {
  createFile,
};