import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
import registerOtpRoutes from "./routes/registerOtp.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/register", registerOtpRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API is working 🚀" });
});

export default app;
