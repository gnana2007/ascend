import mongoose from "mongoose";
var routineSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    streak: { type: Number, default: 0 }
}, { _id: false });
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    transformation: { type: Number, default: 12 },
    routines: { type: [routineSchema], default: [] }
}, { timestamps: true });
export var User = mongoose.models.User || mongoose.model("User", userSchema);
