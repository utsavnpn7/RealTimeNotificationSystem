export type NotificationType = "info" | "warning" | "success" | "error";
export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
}
export interface CreateNotificationDTO {
  userId: string;
  message: string;
  type: NotificationType;
}
