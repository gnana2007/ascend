import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";
import { dashboardRouter } from "./routes/dashboard";
import { authenticate } from "./middleware/auth";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json({ limit: "5mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, name: "Ascend API" });
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", authenticate, dashboardRouter);

async function start() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } else {
    console.log("MONGODB_URI not set; API running without database connection");
  }

  app.listen(port, () => {
    console.log(`Ascend API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
