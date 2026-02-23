import { Server } from "socket.io";
import { Notification } from "../types";

const userSocketMap = new Map<string, string>();
export const initSocket = (io: Server): void => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("register", (userId: string) => {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      userSocketMap.forEach((socketId, userId) => {
        if (socketId === socket.id) userSocketMap.delete(userId);
      });
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export const emitNotification = (
  io: Server,
  userId: string,
  notification: Notification,
): void => {
  const socketId = userSocketMap.get(userId);
  if (socketId) {
    io.to(socketId).emit("new_notification", notification);
  }
};
