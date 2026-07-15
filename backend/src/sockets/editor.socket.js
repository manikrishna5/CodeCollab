const registerEditorEvents = (io, socket) => {

  socket.on("code-change", ({ workspaceId, fileId, code }) => {

    socket.to(workspaceId).emit("code-updated", {
      fileId,
      code,
    });

  });

  socket.on("sync-code", ({ targetSocketId, code, fileId }) => {

    io.to(targetSocketId).emit("code-updated", {
      fileId,
      code,
    });

  });

  socket.on("auto-save", ({ fileId, code }) => {

    console.log("Saving:", fileId);

});

};

module.exports = registerEditorEvents;