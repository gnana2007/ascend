import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Bell, Moon, Sunrise } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { sleepPlan, weeklyFocus } from "@/data/mock";

export function Sleep() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="grid place-items-center p-8">
        <ProgressRing value={82} label="Energy Score" color="#a5b4fc" size={170} />
        <p className="mt-4 max-w-sm text-center leading-7 text-ink/65 dark:text-white/65">Your split sleep plan is stable. Keep caffeine before 3 PM and begin wind-down 45 minutes earlier on coding-heavy days.</p>
      </Card>
      <Card>
        <h2 className="text-3xl font-black">Sleep Tracker</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {sleepPlan.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
              <Moon size={19} />
              <p className="mt-3 font-black">{item.label}</p>
              <p className="text-sm font-semibold text-ink/55 dark:text-white/55">{item.time}</p>
              <p className="mt-2 text-2xl font-black">{item.quality}%</p>
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
