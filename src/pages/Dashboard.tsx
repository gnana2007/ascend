import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import {
  CheckCircle2,
  Flame,
  Sparkles,
  Trophy,
  Brain,
  Moon,
  Droplets,
  Award,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { ProgressRing } from "@/components/ui/progress-ring";

import { Mascot } from "@/components/Mascot";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/contexts/AuthContext";

const modules = [
  {
    label: "Study",
    score: 82,
    icon: Brain,
  },
  {
    label: "Sleep",
    score: 74,
    icon: Moon,
  },
  {
    label: "Hydration",
    score: 90,
    icon: Droplets,
  },
];

const weeklyFocus = [
  { day: "Mon", study: 2 },
  { day: "Tue", study: 4 },
  { day: "Wed", study: 3 },
  { day: "Thu", study: 5 },
  { day: "Fri", study: 6 },
  { day: "Sat", study: 4 },
  { day: "Sun", study: 7 },
];

export function Dashboard() {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [name, setName] =
    useState("User");

  const [xp, setXp] =
    useState(120);

  const [level, setLevel] =
    useState(2);

  const [missions, setMissions] =
    useState([
      {
        title:
          "Complete study session",
        xp: 25,
        done: false,
      },
      {
        title:
          "Drink 8 glasses water",
        xp: 15,
        done: false,
      },
      {
        title:
          "Sleep before 11 PM",
        xp: 20,
        done: false,
      },
    ]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile =
    async () => {
      try {
        const { data } =
          await supabase
            .from("profiles")
            .select("*")
            .eq("id", user?.id)
            .maybeSingle();

        if (data?.name) {
          setName(data.name);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const transformation =
    useMemo(() => {
      return Math.round(
        modules.reduce(
          (acc, item) =>
            acc + item.score,
          0
        ) / modules.length
      );
    }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HERO */}
      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
        <Card className="relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(157,217,200,0.3),rgba(201,184,255,0.2),rgba(255,158,143,0.18))]" />

          <div className="relative grid gap-6 md:grid-cols-[1fr_210px] md:items-center">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-ink/50 dark:text-white/50">
                Welcome back,
                {name}
              </p>

              <h2 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
                Become the version
                of you that future
                you trusts.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-ink/68 dark:text-white/68">
                Your personalized
                lifestyle operating
                system is active.
              </p>
            </div>

            <div className="justify-self-center text-center">
              <Mascot type="bunny" />

              <p className="mt-2 text-sm font-bold text-ink/60 dark:text-white/60">
                Your AI companion
                is cheering for you
              </p>
            </div>
          </div>
        </Card>

        {/* PROGRESS */}
        <Card className="grid place-items-center p-6">
          <ProgressRing
            value={transformation}
            label="Transformation"
            color="#9dd9c8"
            size={150}
          />

          <div className="mt-4 w-full rounded-2xl bg-white/45 p-4 dark:bg-white/10">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>
                Level {level}
              </span>

              <span>
                {xp} XP
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sage to-lilac"
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "60%",
                }}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* MODULES */}
      <section className="grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <Card
            key={module.label}
            className="p-5"
          >
            <module.icon />

            <p className="mt-3 text-sm font-bold text-ink/55 dark:text-white/55">
              {module.label}
            </p>

            <p className="text-3xl font-black">
              {module.score}
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sage to-lilac"
                style={{
                  width: `${module.score}%`,
                }}
              />
            </div>
          </Card>
        ))}
      </section>

      {/* CHART */}
      <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black">
              Weekly Consistency
            </h3>

            <Flame className="text-coral" />
          </div>

          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={weeklyFocus}
              >
                <XAxis
                  dataKey="day"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="study"
                  stroke="#2dd4bf"
                  fill="#99f6e4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* MISSIONS */}
        <Card className="p-6">
          <h3 className="text-xl font-black">
            Daily Missions
          </h3>

          <div className="mt-4 space-y-3">
            {missions.map(
              (
                mission,
                index
              ) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-2xl bg-white/50 p-3 dark:bg-white/10"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-white/10">
                    <CheckCircle2
                      size={18}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">
                      {
                        mission.title
                      }
                    </p>

                    <p className="text-xs font-semibold text-ink/50 dark:text-white/50">
                      +
                      {
                        mission.xp
                      }{" "}
                      XP
                    </p>
                  </div>

                  <button className="rounded-full bg-black px-4 py-2 text-sm font-black text-white">
                    Start
                  </button>
                </div>
              )
            )}
          </div>
        </Card>
      </section>

      {/* BADGES */}
      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <h3 className="text-xl font-black">
            Achievement Shelf
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "7 Day Streak",
              "Deep Work Master",
              "Hydration Hero",
              "Sleep Warrior",
            ].map((badge) => (
              <div
                key={badge}
                className="rounded-2xl bg-white/50 p-4 dark:bg-white/10"
              >
                <Award className="text-honey" />

                <p className="mt-3 text-sm font-black">
                  {badge}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* BAR CHART */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black">
              Life Scores
            </h3>

            <Trophy className="text-honey" />
          </div>

          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={modules}
              >
                <XAxis
                  dataKey="label"
                />

                <Tooltip />

                <Bar
                  dataKey="score"
                  radius={[
                    14,
                    14,
                    8,
                    8,
                  ]}
                  fill="#c9b8ff"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </div>
  );
}