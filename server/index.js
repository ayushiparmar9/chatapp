import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import UserRouter from "./src/routers/userRouter.js";
import http from "http";
import { Server } from "socket.io";
import WebSocket from "./src/config/websocket.js";

dotenv.config();

const app = express();

/* ✅ CORS — this alone is enough */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ✅ Parsers */
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/* ✅ Routes */
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});

/* ✅ Error handler */
app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal server error";
  const StatusCode = err.statusCode || 500;
  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;

// app.listen(port, async () => {
//   console.log("server started at Port:", port);
//   connectDB();
// });
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

WebSocket(io);

httpServer.listen(port, async () => {
  await connectDB();
  console.log("🔗 Server Started at : ", port);
});