import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    category: {
      type: String,
      enum: ["study", "sleep", "skincare", "haircare", "hydration", "wellness", "mood", "career"],
      required: true
    },
    value: { type: Number, default: 1 },
    note: { type: String, default: "" },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    loggedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Log = mongoose.models.Log || mongoose.model("Log", logSchema);
