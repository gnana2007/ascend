import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Bot, Brain, Clock3, ShieldOff, TimerReset } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heatmap } from "@/components/Heatmap";
import { studyTracks, weeklyFocus } from "@/data/mock";

export function Study() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-ink/45 dark:text-white/45">Study Dashboard</p>
            <h2 className="mt-2 text-3xl font-black">Deep work, career skill, revision rhythm.</h2>
          </div>
          <Button><TimerReset size={18} /> 25:00 Pomodoro</Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Hours Today", "4.2", Clock3],
            ["Study Streak", "12 days", Brain],
            ["Focus Shield", "On", ShieldOff]
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
              <Icon size={20} />
              <p className="mt-3 text-sm font-bold text-ink/55 dark:text-white/55">{label as string}</p>
              <p className="text-2xl font-black">{value as string}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyFocus}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: 0, borderRadius: 16 }} />
              <Area type="monotone" dataKey="study" stroke="#2dd4bf" fill="#ccfbf1" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="space-y-5">
        <Card>
          <h3 className="text-xl font-black">Roadmap Trackers</h3>
          <div className="mt-4 space-y-4">
            {studyTracks.map((track) => (
              <div key={track.name}>
                <div className="flex justify-between text-sm font-bold">
                  <span>{track.name}</span>
                  <span>{track.complete}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-sage to-lilac" style={{ width: `${track.complete}%` }} />
                </div>
                <p className="mt-1 text-xs font-semibold text-ink/50 dark:text-white/50">{track.note}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <Bot size={19} />
            <h3 className="text-xl font-black">AI Study Suggestion</h3>
          </div>
          <p className="leading-7 text-ink/68 dark:text-white/68">Do one graph problem, revise REST auth notes, then spend 20 minutes on mock interview storytelling. Your weak area is not ability; it is spaced recall.</p>
        </Card>
        <Card>
          <h3 className="mb-4 text-xl font-black">Focus Heatmap</h3>
          <Heatmap />
        </Card>
      </div>
    </div>
  );
}
