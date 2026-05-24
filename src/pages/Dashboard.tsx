import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { CheckCircle2, Flame, Play, Sparkles, Trophy, Brain, BriefcaseBusiness, Flower2, Moon, Droplets, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Mascot } from "@/components/Mascot";
import { useData } from "@/contexts/DataContext";
import { apiClient } from "@/lib/api";

const moduleIcons: Record<string, any> = {
  study: Brain,
  career: BriefcaseBusiness,
  wellness: Flower2,
  "glow-up": Sparkles,
  sleep: Moon,
  hydration: Droplets
};

const moduleColors: Record<string, string> = {
  study: "#7dd3fc",
  career: "#c9b8ff",
  wellness: "#9dd9c8",
  "glow-up": "#ff9e8f",
  sleep: "#a5b4fc",
  hydration: "#67e8f9"
};

type DashboardProps = {
  mascot: { name: string; type: string; line: string };
};

export function Dashboard({ mascot }: DashboardProps) {
  const { dashboardData, loading } = useData();

  if (loading || !dashboardData) {
    return <div className="flex items-center justify-center py-20">Loading your data...</div>;
  }

  const user = dashboardData.user || { name: "User", quote: "Keep going." };
  const modules = dashboardData.modules
    ? Object.entries(dashboardData.modules).map(([key, score]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        score: score as number,
        color: moduleColors[key] || "#7dd3fc",
        icon: moduleIcons[key] || Brain
      }))
    : [];

  const missions = dashboardData.missions || [];
  const weeklyFocus = dashboardData.weeklyFocus || [];
  const badges = dashboardData.badges || [];

  const handleLogMission = async (category: string) => {
    try {
      await apiClient.createLog(category as any, 1);
      // Trigger refresh after logging
      window.location.reload();
    } catch (error) {
      console.error("Failed to log mission:", error);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
        <Card className="relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(157,217,200,0.3),rgba(201,184,255,0.2),rgba(255,158,143,0.18))]" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_210px] md:items-center">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-ink/50 dark:text-white/50">Welcome back, {user.name}</p>
              <h2 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">Become the version of you that future you trusts.</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink/68 dark:text-white/68">{user.quote}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button>
                  <Play size={17} /> Start Focus Mode
                </Button>
                <Button variant="soft">
                  <Sparkles size={17} /> Generate Today
                </Button>
              </div>
            </div>
            <div className="justify-self-center text-center">
              <Mascot type={mascot.type} />
              <p className="mt-2 text-sm font-bold text-ink/60 dark:text-white/60">{mascot.name} is cheering quietly</p>
            </div>
          </div>
        </Card>
        <Card className="grid place-items-center">
          <ProgressRing value={dashboardData.transformation} label="Transformation" color="#9dd9c8" size={150} />
          <div className="mt-4 w-full rounded-2xl bg-white/45 p-4 dark:bg-white/10">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Level {dashboardData.level}</span>
              <span>{dashboardData.xp} XP</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-sage to-lilac" initial={{ width: 0 }} animate={{ width: `${(dashboardData.xp / dashboardData.nextLevel) * 100}%` }} />
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {modules.map((module) => (
          <Card key={module.label} className="p-4">
            <module.icon style={{ color: module.color }} />
            <p className="mt-3 text-sm font-bold text-ink/55 dark:text-white/55">{module.label}</p>
            <p className="text-3xl font-black">{module.score}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${module.score}%`, background: module.color }} />
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black">Weekly Consistency</h3>
            <Flame className="text-coral" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyFocus}>
                <defs>
                  <linearGradient id="study" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#9dd9c8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#9dd9c8" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "0", boxShadow: "0 15px 50px rgba(0,0,0,0.12)" }} />
                <Area type="monotone" dataKey="study" stroke="#2dd4bf" fill="url(#study)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-black">Daily Missions</h3>
          <div className="mt-4 space-y-3">
            {missions.map((mission: any) => (
              <div key={mission.title} className="flex items-center gap-3 rounded-2xl bg-white/50 p-3 dark:bg-white/10">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-white/10">
                  <CheckCircle2 size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{mission.title}</p>
                  <p className="text-xs font-semibold text-ink/50 dark:text-white/50">+{mission.xp} XP</p>
                </div>
                {mission.done ? <CheckCircle2 className="text-emerald-500" /> : <Button size="sm" variant="outline" onClick={() => handleLogMission(mission.title.toLowerCase())}>Log</Button>}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h3 className="text-xl font-black">Achievement Shelf</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {badges.slice(0, 4).map((badge: string) => (
              <div key={badge} className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
                <Award className="text-honey" />
                <p className="mt-3 text-sm font-black">{badge}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black">Life Scores</h3>
            <Trophy className="text-honey" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modules}>
                <XAxis dataKey="label" axisLine={false} tickLine={false} interval={0} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "0" }} />
                <Bar dataKey="score" radius={[14, 14, 8, 8]} fill="#c9b8ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </div>
  );
}
