const registerWorkspaceEvents = (io, socket) => {
  socket.on("join-workspace", (workspaceId) => {
    socket.join(workspaceId);

    console.log(
      `🟢 ${socket.id} joined workspace ${workspaceId}`
    );

    socket.to(workspaceId).emit("user-joined", {
      socketId: socket.id,
    });
  });

  socket.on("leave-workspace", (workspaceId) => {
    socket.leave(workspaceId);

    console.log(
      `🔴 ${socket.id} left workspace ${workspaceId}`
    );

    socket.to(workspaceId).emit("user-left", {
      socketId: socket.id,
    });
  });
};

module.exports = registerWorkspaceEvents;