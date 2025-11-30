import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

let pendingUsers = {}; // temporary store

export const sendRegisterOtp = async (req, res) => {
    const { name, email, password } = req.body;

    // ⛔ STEP 1: Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
    }

    // STEP 2: Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // STEP 3: Store data temporarily
    pendingUsers[email] = { name, email, password, otp };

    // STEP 4: Send Email
    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

    return res.json({ message: "OTP sent to email" });
};

export const verifyRegisterOtp = async (req, res) => {
    const { email, otp } = req.body;

    const userData = pendingUsers[email];

    if (!userData || userData.otp != otp) {
        return res.status(400).json({ error: "Invalid OTP" });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
    });

    delete pendingUsers[email];

    return res.json({
        message: "Account created successfully",
        user,
    });
};
