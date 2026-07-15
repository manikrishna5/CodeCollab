const User = require("../models/user.model");

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const findUserById = async (id) => {
    return await User.findById(id).select("-password");
};

const updateRefreshToken = async (id, refreshToken) => {
  return await User.findByIdAndUpdate(
    id,
    { refreshToken },
    { new: true }
  );
};

const saveUser = async (user) => {
  return await user.save({ validateBeforeSave: false });
};

const clearRefreshToken = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    {
      refreshToken: "",
    },
    {
      new: true,
    }
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  updateRefreshToken,
  saveUser,
  clearRefreshToken,
};