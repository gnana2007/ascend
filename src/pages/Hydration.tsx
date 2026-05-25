import {
  useMemo,
  useState,
} from "react";

import {
  Apple,
  Droplets,
  Flame,
  Trophy,
  ArrowRight,
  Moon,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { HydrationBottle } from "@/components/HydrationBottle";

export function Hydration() {
  // =========================
  // STATE
  // =========================

  const [water, setWater] =
    useState(1500);

  const dailyGoal = 3000;

  // =========================
  // PROGRESS
  // =========================

  const progress = useMemo(
    () => {
      return Math.min(
        100,
        Math.round(
          (water /
            dailyGoal) *
            100
        )
      );
    },
    [water]
  );

  const logWater = (
    amount: number
  ) => {
    setWater(
      (prev) => prev + amount
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-ink/50 dark:text-white/50">
            Wellness System
          </p>

          <h1 className="text-5xl font-black">
            Hydration
          </h1>

          <p className="mt-3 text-lg text-ink/60 dark:text-white/60">
            Track water intake,
            recovery, energy, and
            physical wellness.
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
            to="/analytics"
            className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-black shadow-glass dark:bg-white/10"
          >
            Analytics
          </Link>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        {/* LEFT */}
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <Droplets
              size={28}
            />

            <h2 className="text-3xl font-black">
              Hydration Tracker
            </h2>
          </div>

          {/* BOTTLE */}
          <div className="mt-6">
            <HydrationBottle />
          </div>

          {/* STATS */}
          <div className="mt-6 rounded-3xl bg-white/50 p-5 dark:bg-white/10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-ink/55 dark:text-white/55">
                Daily Progress
              </p>

              <p className="text-sm font-black">
                {progress}%
              </p>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-black">
                {water} ml
              </p>

              <p className="text-sm font-semibold text-ink/55 dark:text-white/55">
                Goal: {dailyGoal} ml
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-5 grid gap-3">
            <Button
              onClick={() =>
                logWater(250)
              }
              className="w-full"
            >
              <Droplets
                size={18}
              />
              Log 250 ml
            </Button>

            <Button
              variant="soft"
              onClick={() =>
                logWater(500)
              }
              className="w-full"
            >
              <Droplets
                size={18}
              />
              Log 500 ml
            </Button>
          </div>
        </Card>

        {/* RIGHT */}
        <div className="grid gap-5">
          {/* NUTRITION */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">
                Nutrition & Energy
              </h3>

              <Flame className="text-coral" />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {[
                [
                  "Breakfast",
                  "Protein oats",
                  Apple,
                ],

                [
                  "Energy",
                  "Steady",
                  Flame,
                ],

                [
                  "Hydration",
                  `${progress}%`,
                  Droplets,
                ],

                [
                  "Recovery",
                  "Good",
                  Moon,
                ],
              ].map(
                (
                  [
                    label,
                    value,
                    Icon,
                  ]
                ) => (
                  <div
                    key={
                      label as string
                    }
                    className="rounded-3xl bg-white/50 p-5 dark:bg-white/10"
                  >
                    <Icon
                      size={22}
                    />

                    <p className="mt-3 text-sm font-bold text-ink/55 dark:text-white/55">
                      {
                        label as string
                      }
                    </p>

                    <p className="text-xl font-black">
                      {
                        value as string
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* STREAK */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black">
                  Hydration Streak
                </h3>

                <p className="mt-2 text-ink/60 dark:text-white/60">
                  Stay consistent
                  every day.
                </p>
              </div>

              <Trophy className="text-honey" />
            </div>

            <div className="mt-5 grid grid-cols-7 gap-3">
              {Array.from({
                length: 28,
              }).map(
                (_, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-full transition ${
                      index <
                      22
                        ? "bg-cyan-300 shadow-lg"
                        : "bg-white/20"
                    }`}
                  />
                )
              )}
            </div>

            <div className="mt-5 rounded-2xl bg-cyan-100/60 p-5 dark:bg-cyan-500/10">
              <p className="text-lg font-black">
                22 Day Hydration
                Streak 🔥
              </p>

              <p className="mt-2 text-sm font-semibold text-ink/60 dark:text-white/60">
                Your consistency
                is improving your
                recovery and focus.
              </p>
            </div>
          </Card>

          {/* QUICK NAVIGATION */}
          <Card className="p-6">
            <h3 className="text-2xl font-black">
              Quick Navigation
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/planner"
                className="flex items-center justify-between rounded-2xl bg-black p-4 text-sm font-black text-white"
              >
                Open Planner

                <ArrowRight
                  size={18}
                />
              </Link>

              <Link
                to="/coach"
                className="flex items-center justify-between rounded-2xl bg-white/70 p-4 text-sm font-black dark:bg-white/10"
              >
                AI Coach

                <ArrowRight
                  size={18}
                />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}