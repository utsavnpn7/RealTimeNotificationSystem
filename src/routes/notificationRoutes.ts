import { Router } from "express";
import { Server } from "socket.io";
import * as controller from "../controller/notificationController";

export const notificationRouter = (io: Server): Router => {
  const router = Router();

  router.post("/", controller.sendNotification(io));
  router.get("/:userId", controller.getUserNotifications);
  router.patch("/:userId/:notifId/read", controller.readNotification);

  return router;
};
