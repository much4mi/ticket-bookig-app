import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import verifyToken from '../middleware/Auth';

const router = express.Router();

// Login route
router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate a JWT token with an expiry time
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });

        // Add the token as a cookie in the response
        res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 });

        // Send the token and user info in the response
        return res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Validate token route
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({ userId: req.userId });
});

// Logout route
router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.status(200).send();
});

export default router;
