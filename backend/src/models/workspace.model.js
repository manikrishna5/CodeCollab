const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
    type: String,
    enum: ["Owner", "Editor", "Viewer"],
    default: "Viewer",
  },
  },
  { _id: false }
);

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      default: "javascript",
      enum: [
        "javascript",
        "typescript",
        "java",
        "python",
        "cpp",
        "c",
        "go",
        "rust",
      ],
    },

    code: {
      type: String,
      default: "",
    },
    
    workspaceCode: {
    type: String,
    unique: true,
    required: true,
    index: true,
   },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workspace", workspaceSchema);