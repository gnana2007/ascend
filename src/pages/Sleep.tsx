import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Bell, Moon, Sunrise } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useData } from "@/contexts/DataContext";

export function Sleep() {
  const { dashboardData, loading } = useData();

  if (loading || !dashboardData) {
    return <div className="flex items-center justify-center py-20">Loading sleep data...</div>;
  }

  const weeklyFocus = dashboardData.weeklyFocus || [];
  const totals = dashboardData.totals || {};
  const avgSleep = totals.sleep ? (totals.sleep / 7).toFixed(1) : "0";
  const sleepQuality = Math.min(totals.sleep ? (totals.sleep * 10) : 60, 95);

  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="grid place-items-center p-8">
        <ProgressRing value={sleepQuality} label="Sleep Score" color="#a5b4fc" size={170} />
        <p className="mt-4 max-w-sm text-center leading-7 text-ink/65 dark:text-white/65">Your sleep patterns show consistency. Keep maintaining your sleep routine for better focus and wellness.</p>
      </Card>
      <Card>
        <h2 className="text-3xl font-black">Sleep Tracker</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { label: "Avg Sleep", value: avgSleep + "h" },
            { label: "This Week", value: (totals.sleep || 0) + " logs" },
            { label: "Sleep Quality", value: Math.round(sleepQuality) + "%" }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
              <Moon size={19} />
              <p className="mt-3 font-black">{item.label}</p>
              <p className="mt-2 text-2xl font-black">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyFocus}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: 0, borderRadius: 16 }} />
              <Line dataKey="sleep" type="monotone" stroke="#818cf8" strokeWidth={4} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="xl:col-span-2">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Sleep Reminder", "10:30 PM", Bell],
            ["Wake Window", "5:45 - 6:15 AM", Sunrise],
            ["Recovery Tip", "Yoga nidra after lunch", Moon]
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-2xl bg-white/45 p-4 dark:bg-white/10">
              <Icon size={20} />
              <p className="mt-3 text-sm font-bold text-ink/55 dark:text-white/55">{label as string}</p>
              <p className="text-xl font-black">{value as string}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
