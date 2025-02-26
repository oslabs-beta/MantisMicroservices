import express from "express";
import { createNewUser, loginUser } from "../controllers/userController.ts";

const router = express.Router();

router.post("/create-user", createNewUser);
router.post("/login", loginUser);

export default router;
