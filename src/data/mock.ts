import {
  Award,
  Brain,
  BriefcaseBusiness,
  Droplets,
  Flame,
  Flower2,
  Moon,
  Sparkles,
  Sprout,
  Timer,
  Trophy
} from "lucide-react";

export const user = {
  name: "Aarohi",
  rank: "Luminous Builder",
  level: 14,
  xp: 8420,
  nextLevel: 9000,
  transformation: 68,
  quote: "Tiny consistent rituals become visible confidence."
};

export const mascots = [
  { name: "Miso", type: "bunny", line: "One focused block. One softer evening. We ascend." },
  { name: "Nori", type: "panda", line: "Your pace counts. Your rest counts too." },
  { name: "Kiko", type: "fox", line: "Today is a small brave upgrade." },
  { name: "Luma", type: "kitten", line: "Drink water, breathe deeply, keep going." }
];

export const missions = [
  { title: "90 minutes DSA", icon: Timer, done: true, xp: 120 },
  { title: "Sunscreen and lip care", icon: Sparkles, done: true, xp: 40 },
  { title: "2.4L water", icon: Droplets, done: false, xp: 60 },
  { title: "Sleep by 11:15 PM", icon: Moon, done: false, xp: 80 }
];

export const modules = [
  { label: "Study", score: 78, color: "#7dd3fc", icon: Brain },
  { label: "Career", score: 64, color: "#c9b8ff", icon: BriefcaseBusiness },
  { label: "Wellness", score: 82, color: "#9dd9c8", icon: Flower2 },
  { label: "Glow-Up", score: 71, color: "#ff9e8f", icon: Sparkles },
  { label: "Sleep", score: 74, color: "#a5b4fc", icon: Moon },
  { label: "Hydration", score: 88, color: "#67e8f9", icon: Droplets }
];

export const weeklyFocus = [
  { day: "Mon", study: 4.2, sleep: 7.3, wellness: 72 },
  { day: "Tue", study: 3.6, sleep: 6.4, wellness: 68 },
  { day: "Wed", study: 5.1, sleep: 7.8, wellness: 81 },
  { day: "Thu", study: 2.8, sleep: 6.9, wellness: 63 },
  { day: "Fri", study: 4.7, sleep: 7.1, wellness: 77 },
  { day: "Sat", study: 6.0, sleep: 8.2, wellness: 90 },
  { day: "Sun", study: 3.9, sleep: 7.6, wellness: 84 }
];

export const studyTracks = [
  { name: "DSA", complete: 67, note: "Graphs and DP need revision" },
  { name: "Backend Roadmap", complete: 54, note: "Auth, caching, queues next" },
  { name: "Interview Prep", complete: 42, note: "Mock HR round pending" },
  { name: "Revision Logs", complete: 76, note: "Strong SQL and OS recall" }
];

export const sleepPlan = [
  { label: "Core Sleep", time: "11:15 PM - 5:45 AM", quality: 86 },
  { label: "Recovery Nap", time: "2:15 PM - 2:45 PM", quality: 72 },
  { label: "Wind Down", time: "10:30 PM", quality: 91 }
];

export const glowHabits = [
  "Cleanser",
  "Moisturizer",
  "Sunscreen",
  "Lip care",
  "Hair oiling",
  "Scalp massage",
  "Silk pillowcase"
];

export const routines = [
  { name: "Morning Mobility", length: "12 min", focus: "Posture and neck release" },
  { name: "Exam Calm Flow", length: "18 min", focus: "Breath, hips, hamstrings" },
  { name: "Desk Reset", length: "7 min", focus: "Wrists, shoulders, spine" },
  { name: "Sleepy Stretch", length: "10 min", focus: "Slow exhale and recovery" }
];

export const badges = [
  { title: "7-Day Discipline Streak", icon: Flame },
  { title: "Hydration Master", icon: Droplets },
  { title: "Backend Warrior", icon: Trophy },
  { title: "Glow-Up Champion", icon: Award },
  { title: "Gentle Reset", icon: Sprout }
];

export const moodLog = [
  { day: "Mon", mood: 66 },
  { day: "Tue", mood: 58 },
  { day: "Wed", mood: 76 },
  { day: "Thu", mood: 62 },
  { day: "Fri", mood: 73 },
  { day: "Sat", mood: 88 },
  { day: "Sun", mood: 82 }
];
