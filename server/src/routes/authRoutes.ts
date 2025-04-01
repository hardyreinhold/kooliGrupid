import express from "express";
import { googleLogin } from "../controller/authController";

const router = express.Router();

router.post("/googleLogin", googleLogin);

export default router;
