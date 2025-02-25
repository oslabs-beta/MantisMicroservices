import express, { ErrorRequestHandler, NextFunction, Response } from "express";
import { ServerError, UserPrometheus } from "./types/types.js";
import {
  rpsController,
  trafficEndpoint,
} from "./controllers/trafficController.ts";
import { error4xx } from "./controllers/errorsController.ts";
import {
  p50Latency,
  p90Latency,
  p99Latency,
} from "./controllers/latencyController.ts";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import { createNewUser, loginUser } from "./controllers/userController.ts";
import { getEnpoints } from "./controllers/endpointsController.ts";
import * as client from "prom-client";
import connectDB from "./mongoConnection.ts";
import cors from "cors";
const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
connectDB();

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2], // Define the bucket intervals
});

app.use((req: UserPrometheus, res: Response, next: NextFunction) => {
  const stopTimer = httpRequestDuration.startTimer();
  res.on("finish", () => {
    stopTimer({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status: res.statusCode,
      // user: req.user?.username || "anonymous",
    });
  });
  next();
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});



app.get("/rps", authMiddleware, rpsController);
app.get("/trafficEndpoint", authMiddleware, trafficEndpoint);
app.get("/error4xx", authMiddleware, error4xx);
// app.get("/error5xx", authMiddleware, error5xx);
app.get("/latencyp50", authMiddleware, p50Latency);
app.get("/latencyp90", authMiddleware, p90Latency);
app.get("/latencyp99", authMiddleware, p99Latency);

app.get("/endpoints", authMiddleware, getEnpoints);

app.post("/create-user", createNewUser);
app.post("/login", loginUser);

//Global error handler

const errorHandler: ErrorRequestHandler = (
  err: ServerError,
  _req,
  res,
  _next
) => {
  const defaultErr: ServerError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj: ServerError = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
