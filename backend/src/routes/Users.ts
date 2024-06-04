import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken'; // Correct import statement for jsonwebtoken
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import verifyToken from '../middleware/Auth';

const router = express.Router();

// api/users/register
router.post("/register", [
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "Email must be valid").isEmail(),
  check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ firstName, lastName, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });

    res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 });

    return res.status(200).json({ message: "User registered successfully", user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// api/users/login
router.post("/login", [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });

    res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 });

    return res.status(200).json({ token, user: { id: user._id, email: user.email } });
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

