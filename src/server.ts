import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
