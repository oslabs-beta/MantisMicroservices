import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import { rpsController } from "../controllers/trafficController.ts";
import { trafficEndpoint } from "../controllers/trafficController.ts";
import { error4xx } from "../controllers/errorsController.ts";
import { p50Latency, p90Latency, p99Latency } from "../controllers/latencyController.ts";

const router = express.Router();

// Secure routes with authMiddleware
router.get("/rps", authMiddleware, rpsController);
router.get("/trafficEndpoint", authMiddleware, trafficEndpoint);
router.get("/error4xx", authMiddleware, error4xx);
router.get("/latencyp50", authMiddleware, p50Latency);
router.get("/latencyp90", authMiddleware, p90Latency);
router.get("/latencyp99", authMiddleware, p99Latency);

export default router;
