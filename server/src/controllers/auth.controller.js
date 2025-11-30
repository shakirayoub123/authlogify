import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

        res.status(201).json({
            message: "User registered successfully",
            user: safeUser,
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body);
        res.status(200).json({
            message: "Login successful",
            token,
            user
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
