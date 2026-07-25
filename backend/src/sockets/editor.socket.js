const registerEditorEvents = (io, socket) => {

  // Real-time code changes
  socket.on("code-change", ({ workspaceId, code }) => {
    socket.to(workspaceId).emit("code-updated", {
      code,
    });
  });

  // Sync code when a new user joins
  socket.on("sync-code", ({ targetSocketId, code }) => {
    io.to(targetSocketId).emit("code-updated", {
      code,
    });
  });

  // Language change
  socket.on("language-change", ({ workspaceId, language }) => {
    socket.to(workspaceId).emit("language-updated", {
      language,
    });
  });

};

module.exports = registerEditorEvents;