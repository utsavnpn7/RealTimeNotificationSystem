import { v4 as uuidv4 } from "uuid";
import { Notification, CreateNotificationDTO } from "../types";

const notifications: Map<string, Notification[]> = new Map();

export const createNotification = (
  dto: CreateNotificationDTO,
): Notification => {
  const notification: Notification = {
    id: uuidv4(),
    ...dto,
    read: false,
    createdAt: new Date(),
  };

  const userNotifs = notifications.get(dto.userId) ?? [];
  notifications.set(dto.userId, [...userNotifs, notification]);
  return notification;
};

export const getNotifications = (userId: string): Notification[] => {
  return notifications.get(userId) ?? [];
};
export const markAsRead = (
  userId: string,
  notifId: string,
): Notification | null => {
  const userNotifs = notifications.get(userId) ?? [];
  const notif = userNotifs.find((n) => n.id === notifId);
  if (!notif) return null;
  notif.read = true;
  return notif;
};
