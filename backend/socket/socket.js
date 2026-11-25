import { Server } from "socket.io";

const MAX_ROOM_LENGTH = 64;

export const setupSocketServer = (httpServer) => {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("join-room", (roomName) => {
      const room = typeof roomName === "string" ? roomName.trim() : "";
      if (!room || room.length > MAX_ROOM_LENGTH) {
        socket.emit("room-error", "Enter a room name up to 64 characters.");
        return;
      }

      socket.join(room);
      socket.emit("room-joined", room);
    });

    socket.on("leave-room", (roomName) => {
      const room = typeof roomName === "string" ? roomName.trim() : "";
      if (!room || !socket.rooms.has(room)) {
        return;
      }

      socket.leave(room);
      socket.emit("room-left", room);
    });

    socket.on("message", (data) => {
      const room = typeof data?.room === "string" ? data.room.trim() : "";
      const message = typeof data?.message === "string" ? data.message.trim() : "";

      if (!room || !message || message.length > 2000 || !socket.rooms.has(room)) {
        socket.emit("room-error", "Join a room and enter a message before sending.");
        return;
      }

      io.to(room).emit("message", {
        room,
        message,
        sender: socket.id,
        timestamp: Date.now(),
      });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: " + socket.id);
    });
  });

  return io;
};
