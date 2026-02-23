import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { initSocket } from "./socket/socketHandler";
import { notificationRouter } from "./routes/notificationRoutes";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

initSocket(io);
app.use("/api/notifications", notificationRouter(io));

const PORT = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
