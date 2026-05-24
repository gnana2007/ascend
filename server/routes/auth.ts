import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User";

export const authRouter = Router();

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = signupSchema.omit({ name: true });

function sign(user: { _id: unknown; email: string }) {
  return jwt.sign({ id: String(user._id), email: user.email }, process.env.JWT_SECRET ?? "dev-secret", {
    expiresIn: "7d"
  });
}

authRouter.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid signup details" });

  const existing = await User.findOne({ email: parsed.data.email });
  if (existing) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await User.create({ ...parsed.data, passwordHash, password: undefined });

  res.status(201).json({
    token: sign(user),
    user: { id: user._id, name: user.name, email: user.email, level: user.level, xp: user.xp }
  });
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid login details" });

  const user = await User.findOne({ email: parsed.data.email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: sign(user),
    user: { id: user._id, name: user.name, email: user.email, level: user.level, xp: user.xp }
  });
});
