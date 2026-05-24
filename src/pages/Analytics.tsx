import { Radar, RadarChart, PolarAngleAxis, PolarGrid, ResponsiveContainer, Tooltip, Line, LineChart, XAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { Brain, BriefcaseBusiness, Flower2, Moon, Droplets } from "lucide-react";

const moduleIcons: Record<string, any> = {
  study: Brain,
  career: BriefcaseBusiness,
  wellness: Flower2,
  "glow-up": Brain,
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

export function Analytics() {
  const { dashboardData, loading } = useData();

  if (loading || !dashboardData) {
    return <div className="flex items-center justify-center py-20">Loading analytics...</div>;
  }

  const modules = dashboardData.modules
    ? Object.entries(dashboardData.modules).map(([key, score]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        score: score as number,
        color: moduleColors[key] || "#7dd3fc",
        icon: moduleIcons[key] || Brain
      }))
    : [];

  const moodLog = dashboardData.moodLog || [];
  const weeklyFocus = dashboardData.weeklyFocus || [];

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Card>
        <h2 className="text-3xl font-black">Progress Analytics</h2>
        <p className="mt-2 text-ink/60 dark:text-white/60">Spot patterns across discipline, sleep, wellness, glow-up, and mood.</p>
        <div className="mt-5 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={modules}>
              <PolarGrid />
              <PolarAngleAxis dataKey="label" />
              <Tooltip contentStyle={{ border: 0, borderRadius: 16 }} />
              <Radar dataKey="score" stroke="#2dd4bf" fill="#99f6e4" fillOpacity={0.55} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <h3 className="text-xl font-black">Burnout Watch</h3>
        <div className="mt-5 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodLog}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: 0, borderRadius: 16 }} />
              <Line dataKey="mood" stroke="#ff9e8f" strokeWidth={4} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="xl:col-span-2">
        <h3 className="text-xl font-black">Weekly Reflection</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {weeklyFocus.slice(4).map((day: any) => (
            <div key={day.day} className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
              <p className="text-sm font-bold text-ink/55 dark:text-white/55">{day.day}</p>
              <p className="text-2xl font-black">{day.study.toFixed(1)}h studied</p>
              <p className="text-sm font-semibold text-ink/55 dark:text-white/55">{day.sleep.toFixed(1)}h sleep - {day.wellness.toFixed(0)}% wellness</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
