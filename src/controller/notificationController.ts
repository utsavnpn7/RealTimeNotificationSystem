import { Request, Response } from "express";
import { Server } from "socket.io";
import * as notificationService from "../services/notificationServices";
import { emitNotification } from "../socket/socketHandler";
import { CreateNotificationDTO } from "../types";

export const sendNotification =
  (io: Server) =>
  (req: Request, res: Response): void => {
    const dto: CreateNotificationDTO = req.body;

    if (!dto.userId || !dto.message || !dto.type) {
      res.status(400).json({ error: "userId, message, and type are required" });
      return;
    }

    const notification = notificationService.createNotification(dto);
    emitNotification(io, dto.userId, notification); // real-time push

    res.status(201).json(notification);
  };

export const getUserNotifications = (req: Request, res: Response): void => {
  const userId = String(req.params["userId"]);
  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }
  const notifications = notificationService.getNotifications(userId);
  res.json(notifications);
};

export const readNotification = (req: Request, res: Response): void => {
  const userId = String(req.params["userId"]);
  const notifId = String(req.params["notifId"]);
  const updated = notificationService.markAsRead(userId, notifId);
  if (!updated) {
    res.status(404).json({ error: "Notification not found" });
    return;
  }
  res.json(updated);
};
