import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  Tooltip,
  Line,
  LineChart,
  XAxis,
  Radar as RadarGraph,
} from "recharts";

import {
  Brain,
  Moon,
  Droplets,
  Sparkles,
  Trophy,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";

const modules = [
  {
    label: "Study",
    score: 82,
    icon: Brain,
    color: "#7dd3fc",
  },

  {
    label: "Sleep",
    score: 74,
    icon: Moon,
    color: "#a5b4fc",
  },

  {
    label: "Hydration",
    score: 90,
    icon: Droplets,
    color: "#67e8f9",
  },

  {
    label: "Wellness",
    score: 78,
    icon: Sparkles,
    color: "#9dd9c8",
  },
];

const moodLog = [
  {
    day: "Mon",
    mood: 5,
  },

  {
    day: "Tue",
    mood: 7,
  },

  {
    day: "Wed",
    mood: 6,
  },

  {
    day: "Thu",
    mood: 8,
  },

  {
    day: "Fri",
    mood: 9,
  },

  {
    day: "Sat",
    mood: 7,
  },

  {
    day: "Sun",
    mood: 10,
  },
];

const weeklyFocus = [
  {
    day: "Mon",
    study: 2,
    sleep: 7,
    wellness: 70,
  },

  {
    day: "Tue",
    study: 4,
    sleep: 8,
    wellness: 82,
  },

  {
    day: "Wed",
    study: 3,
    sleep: 6,
    wellness: 65,
  },

  {
    day: "Thu",
    study: 5,
    sleep: 7.5,
    wellness: 90,
  },

  {
    day: "Fri",
    study: 6,
    sleep: 8,
    wellness: 94,
  },

  {
    day: "Sat",
    study: 4,
    sleep: 9,
    wellness: 88,
  },

  {
    day: "Sun",
    study: 7,
    sleep: 8,
    wellness: 96,
  },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-ink/50 dark:text-white/50">
            Productivity Insights
          </p>

          <h1 className="text-5xl font-black">
            Analytics
          </h1>

          <p className="mt-3 text-lg text-ink/60 dark:text-white/60">
            Visualize your progress,
            focus, recovery, and
            consistency.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-black px-5 py-3 text-sm font-black text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/planner"
            className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-black shadow-glass dark:bg-white/10"
          >
            Planner
          </Link>
        </div>
      </div>

      {/* RADAR */}
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black">
                Progress Analytics
              </h2>

              <p className="mt-2 text-ink/60 dark:text-white/60">
                Track discipline,
                recovery, and
                wellness patterns.
              </p>
            </div>

            <Trophy className="text-honey" />
          </div>

          <div className="mt-5 h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <RadarChart
                data={modules}
              >
                <PolarGrid />

                <PolarAngleAxis
                  dataKey="label"
                />

                <Tooltip
                  contentStyle={{
                    border: 0,
                    borderRadius: 16,
                  }}
                />

                <RadarGraph
                  dataKey="score"
                  stroke="#2dd4bf"
                  fill="#99f6e4"
                  fillOpacity={0.55}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* MOOD */}
        <Card className="p-6">
          <h3 className="text-2xl font-black">
            Burnout Watch
          </h3>

          <p className="mt-2 text-ink/60 dark:text-white/60">
            Monitor emotional
            energy throughout the
            week.
          </p>

          <div className="mt-5 h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={moodLog}
              >
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    border: 0,
                    borderRadius: 16,
                  }}
                />

                <Line
                  dataKey="mood"
                  stroke="#ff9e8f"
                  strokeWidth={4}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* MODULES */}
      <section className="grid gap-4 md:grid-cols-4">
        {modules.map((module) => (
          <Card
            key={module.label}
            className="p-5"
          >
            <module.icon
              style={{
                color:
                  module.color,
              }}
            />

            <p className="mt-3 text-sm font-bold text-ink/55 dark:text-white/55">
              {module.label}
            </p>

            <p className="text-3xl font-black">
              {module.score}
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${module.score}%`,
                  background:
                    module.color,
                }}
              />
            </div>
          </Card>
        ))}
      </section>

      {/* REFLECTION */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black">
              Weekly Reflection
            </h3>

            <p className="mt-2 text-ink/60 dark:text-white/60">
              Understand how your
              study and recovery
              patterns evolve.
            </p>
          </div>

          <Link
            to="/planner"
            className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-black text-white"
          >
            Open Planner

            <ArrowRight
              size={16}
            />
          </Link>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {weeklyFocus.map(
            (day) => (
              <div
                key={day.day}
                className="rounded-2xl bg-white/50 p-4 dark:bg-white/10"
              >
                <p className="text-sm font-bold text-ink/55 dark:text-white/55">
                  {day.day}
                </p>

                <p className="text-2xl font-black">
                  {day.study}h
                  studied
                </p>

                <p className="mt-2 text-sm font-semibold text-ink/55 dark:text-white/55">
                  {day.sleep}h
                  sleep —{" "}
                  {
                    day.wellness
                  }
                  % wellness
                </p>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
}