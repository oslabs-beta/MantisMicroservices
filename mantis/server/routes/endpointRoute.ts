import express from "express";
import { getEnpoints } from "../controllers/endpointsController.ts"; 

const router = express.Router();

router.get("/endpoints", getEnpoints);

export default router;
