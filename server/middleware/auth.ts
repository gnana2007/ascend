import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AuthRequest = Request & {
  user?: { id: string; email: string };
};

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret") as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
