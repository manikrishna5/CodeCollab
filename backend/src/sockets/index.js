const { Server } = require("socket.io");

const registerWorkspaceEvents = require("./workspace.socket");
const registerEditorEvents = require("./editor.socket");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🟢 User Connected: ${socket.id}`);

    registerWorkspaceEvents(io, socket);
    registerEditorEvents(io, socket);

    socket.on("disconnect", () => {
      console.log(`🔴 User Disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocket;