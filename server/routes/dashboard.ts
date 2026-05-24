import { Router } from "express";
import { z } from "zod";
import { Log } from "../models/Log";
import { User } from "../models/User";
import type { AuthRequest } from "../middleware/auth";

export const dashboardRouter = Router();

const logSchema = z.object({
  category: z.enum(["study", "sleep", "skincare", "haircare", "hydration", "wellness", "mood", "career"]),
  value: z.number().default(1),
  note: z.string().optional(),
  meta: z.record(z.unknown()).optional()
});

// Calculate metrics from actual logs
function calculateMetrics(logs: any[]) {
  const categories = ["study", "sleep", "skincare", "haircare", "hydration", "wellness", "mood", "career"];
  const moduleScores: Record<string, number> = {};
  
  // Map logs to module scores
  for (const category of categories) {
    const categoryLogs = logs.filter(l => l.category === category);
    if (categoryLogs.length === 0) {
      moduleScores[category] = 0;
    } else {
      // Score based on frequency and value
      const avgValue = categoryLogs.reduce((sum, l) => sum + (l.value ?? 1), 0) / categoryLogs.length;
      const frequency = Math.min(categoryLogs.length * 10, 100);
      moduleScores[category] = Math.round((avgValue + frequency) / 2);
    }
  }
  
  return moduleScores;
}

// Calculate weekly data
function calculateWeeklyData(logs: any[]) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  
  const weeklyData = days.map((day, idx) => {
    const dayStart = new Date(weekStart);
    dayStart.setDate(dayStart.getDate() + idx);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    
    const dayLogs = logs.filter(l => {
      const logDate = new Date(l.loggedAt);
      return logDate >= dayStart && logDate < dayEnd;
    });
    
    return {
      day,
      study: dayLogs.filter(l => l.category === "study").reduce((sum, l) => sum + (l.value ?? 0), 0) / 2,
      sleep: dayLogs.filter(l => l.category === "sleep").reduce((sum, l) => sum + (l.value ?? 0), 0) * 1.5,
      wellness: dayLogs.filter(l => ["wellness", "skincare", "hydration"].includes(l.category)).length * 15
    };
  });
  
  return weeklyData;
}

// Calculate mood log
function calculateMoodLog(logs: any[]) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  
  return days.map((day, idx) => {
    const dayStart = new Date(weekStart);
    dayStart.setDate(dayStart.getDate() + idx);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    
    const dayMoods = logs
      .filter(l => l.category === "mood" && new Date(l.loggedAt) >= dayStart && new Date(l.loggedAt) < dayEnd)
      .map(l => l.value ?? 0);
    
    const avgMood = dayMoods.length > 0 
      ? Math.round(dayMoods.reduce((a, b) => a + b, 0) / dayMoods.length) 
      : 70;
    
    return { day, mood: Math.max(0, Math.min(100, avgMood)) };
  });
}

dashboardRouter.get("/", async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch user data
    const user = await User.findById(userId);
    const logs = await Log.find({ userId }).sort({ loggedAt: -1 }).limit(200);

    // Calculate metrics from actual data
    const totals = logs.reduce<Record<string, number>>((acc, log) => {
      acc[log.category] = (acc[log.category] ?? 0) + (log.value ?? 1);
      return acc;
    }, {});

    const modules = calculateMetrics(logs);
    const weeklyFocus = calculateWeeklyData(logs);
    const moodLog = calculateMoodLog(logs);

    res.json({
      user: {
        name: user?.name || "User",
        rank: calculateRank(user?.xp ?? 0),
        quote: "Tiny consistent rituals become visible confidence."
      },
      transformation: user?.transformation ?? 12,
      level: user?.level ?? 1,
      xp: user?.xp ?? 0,
      nextLevel: user ? (user.level + 1) * 1000 : 1000,
      totals,
      modules,
      weeklyFocus,
      moodLog,
      missions: generateMissionsFromLogs(logs),
      logs,
      badges: generateBadgesFromLogs(logs)
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function calculateRank(xp: number): string {
  const ranks = ["Spark", "Ember", "Flame", "Radiant", "Luminous Builder"];
  const rankIndex = Math.floor(xp / 2000);
  return ranks[Math.min(rankIndex, ranks.length - 1)];
}

function generateMissionsFromLogs(logs: any[]) {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  
  const todayLogs = logs.filter(l => {
    const logDate = new Date(l.loggedAt);
    return logDate >= todayStart && logDate < todayEnd;
  });

  return [
    { title: "Study session", done: todayLogs.some(l => l.category === "study"), xp: 120 },
    { title: "Skincare routine", done: todayLogs.some(l => ["skincare", "haircare"].includes(l.category)), xp: 40 },
    { title: "Hydration check", done: todayLogs.some(l => l.category === "hydration"), xp: 60 },
    { title: "Sleep tracker", done: todayLogs.some(l => l.category === "sleep"), xp: 80 }
  ];
}

function generateBadgesFromLogs(logs: any[]) {
  const badges = [];
  const totals = logs.reduce<Record<string, number>>((acc, log) => {
    acc[log.category] = (acc[log.category] ?? 0) + 1;
    return acc;
  }, {});

  if (totals.study >= 7) badges.push("7-Day Study Streak");
  if (totals.hydration >= 10) badges.push("Hydration Master");
  if (totals.career >= 5) badges.push("Career Builder");
  if (totals.skincare >= 10) badges.push("Glow-Up Champion");
  if (totals.wellness >= 8) badges.push("Wellness Warrior");

  return badges.slice(0, 5);
}

dashboardRouter.post("/logs", async (req: AuthRequest, res) => {
  const parsed = logSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid log" });

  const log = await Log.create({ ...parsed.data, userId: req.user?.id });
  res.status(201).json(log);
});

dashboardRouter.post("/coach", async (req, res) => {
  const message = String(req.body?.message ?? "");
  res.json({
    reply: `Based on "${message.slice(0, 80)}", protect your sleep, pick one career task, one body-care task, and one recovery task. Keep the plan repeatable.`
  });
});
