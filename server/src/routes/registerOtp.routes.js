import express from "express";
import { sendRegisterOtp, verifyRegisterOtp } from "../controllers/registerOtp.controller.js";

const router = express.Router();

router.post("/send-otp", sendRegisterOtp);
router.post("/verify-otp", verifyRegisterOtp);

export default router;
