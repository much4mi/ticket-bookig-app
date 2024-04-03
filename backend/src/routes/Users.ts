import express, { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken'; // Correct import statement for jsonwebtoken
import { check, validationResult } from 'express-validator';

const router = express.Router();

// api/users/register
router.post("/register", [
  check("firstName", "firstname is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "Email must be valid").isEmail(),
  check("password", "password with 6 or more character is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });

    res.cookie("auth-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 });

    return res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;


